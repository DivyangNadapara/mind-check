// ========================================================
// MINDCHECK CLINICAL APP: STATE, INTERACTIONS & PERSISTENCE
// ========================================================

const STORAGE_PROFILES = 'mindcheck_board_profiles';
const STORAGE_ACTIVE = 'mindcheck_board_active_profile';

let profiles = {};
let activeProfileId = null;
let currentQuestionIndex = 0;
let clinicalQuestions = [];

// ========================================================
// 1. PROFILE & SESSION PERSISTENCE
// ========================================================
function loadProfiles() {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILES);
    profiles = raw ? JSON.parse(raw) : {};
  } catch (e) {
    profiles = {};
  }
  activeProfileId = localStorage.getItem(STORAGE_ACTIVE) || null;
}

function saveProfiles() {
  localStorage.setItem(STORAGE_PROFILES, JSON.stringify(profiles));
  if (activeProfileId) {
    localStorage.setItem(STORAGE_ACTIVE, activeProfileId);
  }
  flashAutoSaveIndicator();
}

function flashAutoSaveIndicator() {
  const badge = document.getElementById('header-autosave');
  if (badge) {
    badge.style.opacity = '1';
    badge.textContent = '● Saved';
    setTimeout(() => {
      badge.style.opacity = '0.6';
    }, 1200);
  }
}

function createProfile(name, age, gender, complaint) {
  const id = 'pt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  profiles[id] = {
    id,
    name: name.trim(),
    age: parseInt(age) || null,
    gender: gender || 'prefer-not-to-say',
    complaint: complaint ? complaint.trim() : '',
    createdAt: new Date().toISOString(),
    answers: {},
    currentIndex: 0,
    completed: false,
    results: null,
    shuffleSeed: Math.floor(Math.random() * 100000)
  };
  activeProfileId = id;
  saveProfiles();
  return id;
}

function deleteProfile(id) {
  delete profiles[id];
  if (activeProfileId === id) {
    activeProfileId = null;
    localStorage.removeItem(STORAGE_ACTIVE);
  }
  saveProfiles();
}

function getActiveProfile() {
  if (!activeProfileId || !profiles[activeProfileId]) return null;
  return profiles[activeProfileId];
}

function switchProfile(id) {
  if (profiles[id]) {
    activeProfileId = id;
    localStorage.setItem(STORAGE_ACTIVE, id);
  }
}

// ========================================================
// 2. QUIZ FLOW MANAGEMENT
// ========================================================
function initQuiz() {
  const profile = getActiveProfile();
  if (!profile) return;

  clinicalQuestions = getPreparedQuestions(profile.shuffleSeed);
  currentQuestionIndex = profile.currentIndex || 0;
}

function getCurrentQuestion() {
  if (currentQuestionIndex >= clinicalQuestions.length) return null;
  return clinicalQuestions[currentQuestionIndex];
}

function saveCurrentAnswer(value) {
  const profile = getActiveProfile();
  const q = getCurrentQuestion();
  if (!profile || !q) return;

  profile.answers[q.id] = value;
  saveProfiles();
}

function goToNextQuestion() {
  currentQuestionIndex++;
  const profile = getActiveProfile();
  if (profile) {
    profile.currentIndex = currentQuestionIndex;
    saveProfiles();
  }
}

function goToPrevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    const profile = getActiveProfile();
    if (profile) {
      profile.currentIndex = currentQuestionIndex;
      saveProfiles();
    }
  }
}

function completeAssessment() {
  const profile = getActiveProfile();
  if (!profile) return null;

  const results = calculateClinicalResults(profile.answers, clinicalQuestions);
  profile.completed = true;
  profile.results = results;
  profile.completedAt = new Date().toISOString();
  saveProfiles();
  return results;
}

// ========================================================
// 3. UI SCREEN MANAGEMENT
// ========================================================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- PROFILE SCREEN ---
function renderProfileScreen() {
  loadProfiles();
  const container = document.getElementById('profile-list');
  const profileIds = Object.keys(profiles);

  if (profileIds.length === 0) {
    container.innerHTML = `
      <div class="profile-card" style="justify-content: center; text-align: center; padding: 36px 20px;">
        <div>
          <div style="font-size: 36px; margin-bottom: 10px;">📋</div>
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">No Patient Records Found</div>
          <div style="color: var(--text-dim); font-size: 13px; max-width: 400px; margin: 0 auto 16px;">
            Create a patient profile to begin your in-depth clinical consultation with the MindCheck Board.
          </div>
          <button class="btn btn-primary" onclick="renderCreateProfile()">Start First Consultation</button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = profileIds.map(id => {
      const p = profiles[id];
      const answeredCount = Object.keys(p.answers || {}).length;
      const totalCount = QUESTIONS.length;
      const statusClass = p.completed ? 'completed' : 'in-progress';
      const statusText = p.completed 
        ? '✅ Evaluation Complete · Dossier Ready' 
        : `⏳ In Progress (${answeredCount} of ${totalCount} items completed)`;
      const dateStr = new Date(p.createdAt).toLocaleDateString();

      return `
        <div class="profile-card" data-id="${id}">
          <div class="profile-avatar">${p.name.charAt(0).toUpperCase()}</div>
          <div class="profile-info">
            <div class="profile-name">${escapeHTML(p.name)}</div>
            <div class="profile-meta">
              ${p.age ? p.age + ' yrs' : ''} ${p.gender !== 'prefer-not-to-say' ? '· ' + p.gender : ''} · Registered ${dateStr}
              ${p.complaint ? `<br><em style="color: var(--text-secondary)">"${escapeHTML(p.complaint)}"</em>` : ''}
            </div>
            <div class="profile-status ${statusClass}">${statusText}</div>
          </div>
          <div class="profile-actions">
            <button class="btn-sm btn-primary" onclick="onSelectProfile('${id}')">
              ${p.completed ? 'View Clinical Dossier' : 'Resume Consultation'}
            </button>
            <button class="btn-sm btn-danger" onclick="onDeleteProfile('${id}')" title="Delete Profile">🗑️</button>
          </div>
        </div>
      `;
    }).join('');
  }

  showScreen('screen-profiles');
}

// --- CREATE PROFILE ---
function renderCreateProfile() {
  showScreen('screen-create-profile');
  document.getElementById('input-name').value = '';
  document.getElementById('input-age').value = '';
  document.getElementById('select-gender').value = 'prefer-not-to-say';
  const complaintInput = document.getElementById('input-chief-complaint');
  if (complaintInput) complaintInput.value = '';
  document.getElementById('input-name').focus();
}

// --- CONSULTATION ROOM (QUESTION RENDERER) ---
function renderQuestion() {
  const q = getCurrentQuestion();
  if (!q) {
    const results = completeAssessment();
    renderResults(results);
    return;
  }

  const profile = getActiveProfile();
  const total = clinicalQuestions.length;
  const progress = (currentQuestionIndex / total) * 100;
  const savedAnswer = profile.answers[q.id];

  // Update Progress
  document.getElementById('quiz-patient-name').textContent = `Patient: ${profile.name}`;
  document.getElementById('progress-bar-fill').style.width = progress + '%';
  document.getElementById('progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
  document.getElementById('progress-percent').textContent = `${Math.round(progress)}% Completed`;

  // Update Consultant Doctor Details
  const doc = DOCTORS[q.doctor] || DOCTORS.jenkins;
  document.getElementById('consultant-avatar').textContent = doc.avatar;
  document.getElementById('consultant-name').textContent = doc.name;
  document.getElementById('consultant-title').textContent = `${doc.title} · ${doc.specialty}`;

  // Doctor's conversational note
  document.getElementById('doctor-note-text').textContent = q.doctorNote || "Please consider your typical experience over recent months:";
  document.getElementById('question-text').textContent = q.text;

  // Render question inputs by type
  const container = document.getElementById('options-container');
  const btnNext = document.getElementById('btn-next');

  if (q.type === 'single') {
    renderSingleChoice(q, savedAnswer, container, btnNext);
  } else if (q.type === 'multi') {
    renderMultiChoice(q, savedAnswer, container, btnNext);
  } else if (q.type === 'scenario') {
    renderScenarioChoice(q, savedAnswer, container, btnNext);
  } else if (q.type === 'scale') {
    renderScaleChoice(q, savedAnswer, container, btnNext);
  }

  // Previous button visibility
  document.getElementById('btn-prev').style.visibility = currentQuestionIndex > 0 ? 'visible' : 'hidden';

  showScreen('screen-quiz');
}

// RENDER: SINGLE CHOICE
function renderSingleChoice(q, savedAnswer, container, btnNext) {
  container.innerHTML = q.options.map((opt, idx) => {
    const isSelected = savedAnswer !== undefined && savedAnswer === opt.value;
    return `
      <button class="option-btn ${isSelected ? 'selected' : ''}" onclick="onSelectSingle(${opt.value}, this)">
        <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="option-text">${opt.text}</span>
        <span class="option-check">✓</span>
      </button>
    `;
  }).join('');

  if (savedAnswer !== undefined && savedAnswer !== null) {
    btnNext.disabled = false;
    btnNext.textContent = currentQuestionIndex === clinicalQuestions.length - 1 ? 'Generate Clinical Dossier →' : 'Continue →';
  } else {
    btnNext.disabled = true;
    btnNext.textContent = 'Select an option';
  }
}

// RENDER: MULTI-SELECT
function renderMultiChoice(q, savedAnswer, container, btnNext) {
  const currentSelections = Array.isArray(savedAnswer) ? savedAnswer : [];

  let html = q.options.map(opt => {
    const isChecked = currentSelections.includes(opt.text);
    return `
      <div class="multi-option-card ${isChecked ? 'checked' : ''}" onclick="onToggleMulti('${escapeQuotes(opt.text)}', this)">
        <div class="custom-checkbox">${isChecked ? '✓' : ''}</div>
        <div class="multi-option-text">${opt.text}</div>
      </div>
    `;
  }).join('');

  // Add a clear "None of these apply" option
  const isNoneChecked = currentSelections.includes('NONE');
  html += `
    <div class="multi-option-card ${isNoneChecked ? 'checked' : ''}" onclick="onToggleMulti('NONE', this)" style="border-style: dashed;">
      <div class="custom-checkbox">${isNoneChecked ? '✓' : ''}</div>
      <div class="multi-option-text" style="color: var(--text-dim); font-style: italic;">None of these apply to my experience</div>
    </div>
  `;

  container.innerHTML = html;

  // Multi allows continue if at least one choice is made or None is selected
  btnNext.disabled = currentSelections.length === 0;
  btnNext.textContent = currentQuestionIndex === clinicalQuestions.length - 1 ? 'Generate Clinical Dossier →' : 'Continue →';
}

// RENDER: SCENARIO CHOICE
function renderScenarioChoice(q, savedAnswer, container, btnNext) {
  container.innerHTML = q.options.map((opt, idx) => {
    const isSelected = savedAnswer !== undefined && savedAnswer === opt.value;
    return `
      <div class="scenario-card ${isSelected ? 'selected' : ''}" onclick="onSelectScenario(${opt.value}, this)">
        <div class="scenario-header">
          <span class="scenario-label">${opt.label}</span>
          <span class="option-check" style="${isSelected ? 'opacity: 1' : ''}">✓</span>
        </div>
        <div class="scenario-body">${opt.text}</div>
      </div>
    `;
  }).join('');

  if (savedAnswer !== undefined && savedAnswer !== null) {
    btnNext.disabled = false;
    btnNext.textContent = currentQuestionIndex === clinicalQuestions.length - 1 ? 'Generate Clinical Dossier →' : 'Continue →';
  } else {
    btnNext.disabled = true;
    btnNext.textContent = 'Select a scenario';
  }
}

// RENDER: RANGE SLIDER SCALE
function renderScaleChoice(q, savedAnswer, container, btnNext) {
  const currentVal = savedAnswer !== undefined && savedAnswer !== null ? savedAnswer : 5;
  saveCurrentAnswer(currentVal);

  container.innerHTML = `
    <div class="scale-container">
      <div class="scale-readout" id="scale-value-display">${currentVal} / 10</div>
      <div class="scale-input-wrapper">
        <input type="range" class="scale-slider" id="scale-slider-input" min="${q.min || 0}" max="${q.max || 10}" value="${currentVal}" oninput="onScaleChange(this.value)">
      </div>
      <div class="scale-labels">
        <span>${q.minLabel || '0 — Minimal'}</span>
        <span>${q.maxLabel || '10 — Severe'}</span>
      </div>
    </div>
  `;

  btnNext.disabled = false;
  btnNext.textContent = currentQuestionIndex === clinicalQuestions.length - 1 ? 'Generate Clinical Dossier →' : 'Continue →';
}

// ========================================================
// 4. EVENT HANDLERS & SELECTIONS
// ========================================================
function onSelectSingle(value, btnEl) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');

  saveCurrentAnswer(value);

  const btnNext = document.getElementById('btn-next');
  btnNext.disabled = false;
  btnNext.textContent = currentQuestionIndex === clinicalQuestions.length - 1 ? 'Generate Clinical Dossier →' : 'Continue →';

  // Smooth auto-advance
  setTimeout(() => {
    goToNextQuestion();
    renderQuestion();
  }, 280);
}

function onToggleMulti(itemText, cardEl) {
  const profile = getActiveProfile();
  const q = getCurrentQuestion();
  if (!profile || !q) return;

  let current = Array.isArray(profile.answers[q.id]) ? [...profile.answers[q.id]] : [];

  if (itemText === 'NONE') {
    if (current.includes('NONE')) {
      current = [];
    } else {
      current = ['NONE'];
    }
  } else {
    // Remove 'NONE' if other items picked
    current = current.filter(x => x !== 'NONE');
    if (current.includes(itemText)) {
      current = current.filter(x => x !== itemText);
    } else {
      current.push(itemText);
    }
  }

  saveCurrentAnswer(current);
  renderMultiChoice(q, current, document.getElementById('options-container'), document.getElementById('btn-next'));
}

function onSelectScenario(value, cardEl) {
  document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');

  saveCurrentAnswer(value);

  const btnNext = document.getElementById('btn-next');
  btnNext.disabled = false;
  btnNext.textContent = currentQuestionIndex === clinicalQuestions.length - 1 ? 'Generate Clinical Dossier →' : 'Continue →';

  setTimeout(() => {
    goToNextQuestion();
    renderQuestion();
  }, 320);
}

function onScaleChange(val) {
  const display = document.getElementById('scale-value-display');
  if (display) display.textContent = `${val} / 10`;
  saveCurrentAnswer(parseInt(val));
}

function onPrevQuestion() {
  goToPrevQuestion();
  renderQuestion();
}

function onNextQuestion() {
  const q = getCurrentQuestion();
  const profile = getActiveProfile();
  if (!q || !profile || profile.answers[q.id] === undefined) return;

  goToNextQuestion();
  renderQuestion();
}

function onSelectProfile(id) {
  switchProfile(id);
  const profile = getActiveProfile();
  if (profile.completed && profile.results) {
    renderResults(profile.results);
  } else {
    initQuiz();
    renderQuestion();
  }
}

function onDeleteProfile(id) {
  const p = profiles[id];
  const name = p ? p.name : 'this record';
  if (confirm(`Permanently remove patient record for "${name}"? This cannot be undone.`)) {
    deleteProfile(id);
    renderProfileScreen();
  }
}

function onCreateProfile() {
  const nameInput = document.getElementById('input-name');
  const name = nameInput.value.trim();
  const age = document.getElementById('input-age').value;
  const gender = document.getElementById('select-gender').value;
  const complaintInput = document.getElementById('input-chief-complaint');
  const complaint = complaintInput ? complaintInput.value : '';

  if (!name) {
    nameInput.focus();
    nameInput.style.borderColor = 'var(--rose)';
    setTimeout(() => nameInput.style.borderColor = 'var(--border)', 1500);
    return;
  }

  createProfile(name, age, gender, complaint);
  initQuiz();
  renderQuestion();
}

function onBackToProfiles() {
  renderProfileScreen();
}

function onRetakeAssessment() {
  const profile = getActiveProfile();
  if (!profile) return;

  if (confirm(`Retake full assessment for ${profile.name}? Previous answers will be cleared.`)) {
    profile.answers = {};
    profile.currentIndex = 0;
    profile.completed = false;
    profile.results = null;
    profile.shuffleSeed = Math.floor(Math.random() * 100000);
    saveProfiles();

    initQuiz();
    renderQuestion();
  }
}

// ========================================================
// 5. CLINICAL DOSSIER RENDERING (MULTI-PAGE RESULTS)
// ========================================================
function renderResults(results) {
  const profile = getActiveProfile();
  if (!results) {
    if (profile && profile.results) {
      results = profile.results;
    } else {
      renderProfileScreen();
      return;
    }
  }

  const report = results.report;

  // Header & Patient Strip
  document.getElementById('dossier-patient-name').textContent = profile.name;
  document.getElementById('dossier-date').textContent = report.dateStr;
  document.getElementById('dossier-coverage').textContent = `${results.totalAnswered} of ${results.totalQuestions} items analyzed`;

  // TAB 1: EXECUTIVE CONSENSUS
  const summaryBox = document.getElementById('dossier-executive-summary');
  summaryBox.innerHTML = report.executiveSummary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const priorityGrid = document.getElementById('dossier-priority-grid');
  priorityGrid.innerHTML = results.clinicalDisorders.slice(0, 4).map(item => {
    return `
      <div class="priority-card" style="border-left-color: ${item.badgeStyle}">
        <div class="priority-header">
          <span class="priority-title">${item.condition.icon} ${item.condition.name}</span>
          <span class="priority-badge" style="background: ${item.badgeStyle}">${item.label} (${item.percentage}%)</span>
        </div>
        <div class="priority-desc">${item.condition.shortDesc}</div>
      </div>
    `;
  }).join('');

  // TAB 2: BOARD DELIBERATIONS
  const transcriptsContainer = document.getElementById('dossier-transcripts');
  transcriptsContainer.innerHTML = report.boardNotes.map(n => {
    return `
      <div class="transcript-card">
        <div class="transcript-avatar">${n.doctor.avatar}</div>
        <div class="transcript-content">
          <div class="transcript-doctor">${n.doctor.name}</div>
          <div class="transcript-specialty">${n.doctor.title} · ${n.doctor.specialty}</div>
          <div class="transcript-quote">"${n.statement}"</div>
        </div>
      </div>
    `;
  }).join('');

  // TAB 3: DIFFERENTIALS
  const differentialsContainer = document.getElementById('dossier-differentials');
  if (report.differentials.length === 0) {
    differentialsContainer.innerHTML = `
      <div class="differential-card">
        <div class="diff-title">Normative Diagnostic Baseline</div>
        <div class="diff-text">No conflicting or synergistic cross-condition patterns were identified in this screening. Symptoms remain within isolated baseline parameters.</div>
      </div>
    `;
  } else {
    differentialsContainer.innerHTML = report.differentials.map(d => {
      return `
        <div class="differential-card">
          <div class="diff-header">
            <span class="diff-title">🔍 ${d.title}</span>
            <span class="diff-specialist">${d.specialist}</span>
          </div>
          <div class="diff-text">${d.text}</div>
        </div>
      `;
    }).join('');
  }

  // TAB 4: CLINICAL INDICES GRID (ALL 15 CONDITIONS)
  const indicesContainer = document.getElementById('dossier-indices-grid');
  indicesContainer.innerHTML = results.all.map(item => {
    return `
      <div class="index-card">
        <div class="index-header">
          <span class="index-icon">${item.condition.icon}</span>
          <span class="index-name">${item.condition.name}</span>
          <span class="index-badge" style="background: ${item.badgeStyle}">${item.label}</span>
        </div>
        <div class="index-meter">
          <div class="index-meter-fill" style="width: ${Math.max(item.percentage, 2)}%; background: ${item.badgeStyle};"></div>
        </div>
        <div class="index-score-row">
          <span>Index: ${item.percentage}%</span>
          <span>Raw: ${item.rawScore} / ${item.maxScore}</span>
        </div>
        <div class="index-desc">${item.condition.clinicalOverview}</div>
      </div>
    `;
  }).join('');

  // TAB 5: ACTION ROADMAP
  const immediateList = document.getElementById('dossier-immediate-actions');
  immediateList.innerHTML = report.actionPlan.immediate.map(act => `<li>${act}</li>`).join('');

  const therapyList = document.getElementById('dossier-therapies');
  therapyList.innerHTML = report.actionPlan.therapeuticModalities.map(t => `<li>${t}</li>`).join('');

  const questionsList = document.getElementById('dossier-doctor-questions');
  questionsList.innerHTML = report.actionPlan.doctorDiscussionQuestions.map(q => `<li><strong>${q}</strong></li>`).join('');

  // Default to Tab 1
  switchDossierTab('tab-consensus');

  showScreen('screen-results');
}

// TAB SWITCHER
function switchDossierTab(tabId) {
  document.querySelectorAll('.dossier-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.dossier-tab-content').forEach(c => c.classList.remove('active'));

  const activeBtn = Array.from(document.querySelectorAll('.dossier-tab')).find(b => b.getAttribute('onclick')?.includes(tabId));
  if (activeBtn) activeBtn.classList.add('active');

  const content = document.getElementById(tabId);
  if (content) content.classList.add('active');
}

// ========================================================
// 6. UTILITIES & KEYBOARD SHORTCUTS
// ========================================================
function escapeHTML(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

document.addEventListener('keydown', (e) => {
  const quizScreen = document.getElementById('screen-quiz');
  if (!quizScreen || !quizScreen.classList.contains('active')) return;

  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1;
    const btns = document.querySelectorAll('.option-btn');
    if (btns[idx]) btns[idx].click();
    const scenarioCards = document.querySelectorAll('.scenario-card');
    if (scenarioCards[idx]) scenarioCards[idx].click();
  }
  if (e.key === 'ArrowLeft') onPrevQuestion();
  if (e.key === 'ArrowRight' || e.key === 'Enter') onNextQuestion();
});

// ========================================================
// 7. INITIALIZATION ON LOAD
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  loadProfiles();

  const profile = getActiveProfile();
  if (profile && !profile.completed && Object.keys(profile.answers || {}).length > 0) {
    initQuiz();
    renderQuestion();
  } else if (profile && profile.completed && profile.results) {
    renderResults(profile.results);
  } else {
    renderProfileScreen();
  }
});
