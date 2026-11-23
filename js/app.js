// ========================================================
// MAIN APPLICATION: Profile Management, Quiz Flow, Storage
// ========================================================

// --- STORAGE KEYS ---
const STORAGE_PROFILES = 'mindcheck_profiles';
const STORAGE_ACTIVE = 'mindcheck_active_profile';

// --- STATE ---
let profiles = {};
let activeProfileId = null;
let currentQuestionIndex = 0;
let shuffledQuestions = [];

// ========================================================
// 1. PROFILE MANAGEMENT
// ========================================================
function loadProfiles() {
  try {
    const saved = localStorage.getItem(STORAGE_PROFILES);
    profiles = saved ? JSON.parse(saved) : {};
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
}

function createProfile(name, age, gender) {
  const id = 'profile_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  profiles[id] = {
    id,
    name: name.trim(),
    age: parseInt(age) || null,
    gender: gender || 'prefer-not-to-say',
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
// 2. QUIZ FLOW
// ========================================================
function initQuiz() {
  const profile = getActiveProfile();
  if (!profile) return;

  shuffledQuestions = shuffleQuestions(QUESTIONS, profile.shuffleSeed);
  currentQuestionIndex = profile.currentIndex || 0;
}

function getCurrentQuestion() {
  if (currentQuestionIndex >= shuffledQuestions.length) return null;
  return shuffledQuestions[currentQuestionIndex];
}

function saveAnswer(questionId, value) {
  const profile = getActiveProfile();
  if (!profile) return;

  profile.answers[questionId] = value;
  profile.currentIndex = currentQuestionIndex + 1;
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

function isQuizComplete() {
  return currentQuestionIndex >= shuffledQuestions.length;
}

function completeQuiz() {
  const profile = getActiveProfile();
  if (!profile) return null;

  const results = calculateResults(profile.answers, QUESTIONS);
  profile.completed = true;
  profile.results = results;
  profile.completedAt = new Date().toISOString();
  saveProfiles();
  return results;
}

// ========================================================
// 3. UI RENDERING
// ========================================================

// Show a specific screen, hide all others
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
}

// --- PROFILE SCREEN ---
function renderProfileScreen() {
  loadProfiles();
  const container = document.getElementById('profile-list');
  const profileIds = Object.keys(profiles);

  if (profileIds.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">👤</div>
        <p>No profiles yet. Create one to begin your assessment.</p>
      </div>
    `;
  } else {
    container.innerHTML = profileIds.map(id => {
      const p = profiles[id];
      const statusClass = p.completed ? 'completed' : 'in-progress';
      const statusText = p.completed ? '✅ Completed' : `📝 ${Object.keys(p.answers).length} / ${QUESTIONS.length} answered`;
      const dateStr = new Date(p.createdAt).toLocaleDateString();

      return `
        <div class="profile-card ${statusClass}" data-id="${id}">
          <div class="profile-avatar">${p.name.charAt(0).toUpperCase()}</div>
          <div class="profile-info">
            <div class="profile-name">${escapeHTML(p.name)}</div>
            <div class="profile-meta">${p.age ? p.age + ' yrs' : ''} ${p.gender !== 'prefer-not-to-say' ? '· ' + p.gender : ''} · Created ${dateStr}</div>
            <div class="profile-status ${statusClass}">${statusText}</div>
          </div>
          <div class="profile-actions">
            <button class="btn-sm btn-primary" onclick="onSelectProfile('${id}')">${p.completed ? 'View Results' : 'Continue'}</button>
            <button class="btn-sm btn-danger" onclick="onDeleteProfile('${id}')">🗑️</button>
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
  document.getElementById('input-name').focus();
}

// --- QUIZ SCREEN ---
function renderQuestion() {
  const q = getCurrentQuestion();
  if (!q) {
    // Quiz complete
    const results = completeQuiz();
    renderResults(results);
    return;
  }

  const profile = getActiveProfile();
  const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
  const previousAnswer = profile.answers[q.id];

  document.getElementById('progress-bar-fill').style.width = progress + '%';
  document.getElementById('progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
  document.getElementById('progress-percent').textContent = Math.round(progress) + '%';

  document.getElementById('question-text').textContent = q.text;

  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = q.options.map((opt, idx) => {
    const selected = previousAnswer === opt.value ? 'selected' : '';
    return `
      <button class="option-btn ${selected}" data-value="${opt.value}" onclick="onSelectOption(${opt.value}, this)">
        <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="option-text">${opt.text}</span>
        <span class="option-check">✓</span>
      </button>
    `;
  }).join('');

  // Show/hide prev button
  document.getElementById('btn-prev').style.visibility = currentQuestionIndex > 0 ? 'visible' : 'hidden';

  // Update next button state
  const btnNext = document.getElementById('btn-next');
  if (previousAnswer !== undefined && previousAnswer !== null) {
    btnNext.disabled = false;
    btnNext.textContent = currentQuestionIndex === shuffledQuestions.length - 1 ? 'See Results →' : 'Next →';
  } else {
    btnNext.disabled = true;
    btnNext.textContent = 'Select an answer';
  }

  showScreen('screen-quiz');
}

// --- RESULTS SCREEN ---
function renderResults(results) {
  if (!results) {
    const profile = getActiveProfile();
    if (profile && profile.results) {
      results = profile.results;
    } else {
      renderProfileScreen();
      return;
    }
  }

  // Summary
  document.getElementById('results-summary').textContent = results.summary;
  document.getElementById('results-answered').textContent = `${results.totalAnswered} of ${results.totalQuestions} questions answered`;

  // Condition cards
  const container = document.getElementById('results-cards');
  container.innerHTML = results.all.map(r => {
    const barWidth = Math.max(r.percentage, 2);
    return `
      <div class="result-card risk-${r.riskLevel}">
        <div class="result-header">
          <span class="result-icon">${r.condition.icon}</span>
          <span class="result-name">${r.condition.name}</span>
          <span class="result-badge" style="background: ${r.riskColor}">${r.riskLabel}</span>
        </div>
        <div class="result-bar-track">
          <div class="result-bar-fill" style="width: ${barWidth}%; background: ${r.riskColor}"></div>
        </div>
        <div class="result-score">${r.percentage}% · Score: ${r.rawScore} / ${r.maxScore}</div>
        <div class="result-desc">${r.condition.description}</div>
      </div>
    `;
  }).join('');

  showScreen('screen-results');
}

// ========================================================
// 4. EVENT HANDLERS
// ========================================================
function onSelectProfile(id) {
  switchProfile(id);
  const profile = getActiveProfile();
  if (profile.completed) {
    renderResults(profile.results);
  } else {
    initQuiz();
    renderQuestion();
  }
}

function onDeleteProfile(id) {
  const name = profiles[id] ? profiles[id].name : 'this profile';
  if (confirm(`Delete profile "${name}"? This cannot be undone.`)) {
    deleteProfile(id);
    renderProfileScreen();
  }
}

function onCreateProfile() {
  const name = document.getElementById('input-name').value.trim();
  const age = document.getElementById('input-age').value;
  const gender = document.getElementById('select-gender').value;

  if (!name) {
    document.getElementById('input-name').focus();
    document.getElementById('input-name').classList.add('shake');
    setTimeout(() => document.getElementById('input-name').classList.remove('shake'), 500);
    return;
  }

  createProfile(name, age, gender);
  initQuiz();
  renderQuestion();
}

function onSelectOption(value, btn) {
  const q = getCurrentQuestion();
  if (!q) return;

  // Visual feedback
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Save answer
  saveAnswer(q.id, value);

  // Enable next button
  const btnNext = document.getElementById('btn-next');
  btnNext.disabled = false;
  btnNext.textContent = currentQuestionIndex === shuffledQuestions.length - 1 ? 'See Results →' : 'Next →';

  // Auto-advance after a brief delay
  setTimeout(() => {
    goToNextQuestion();
    renderQuestion();
  }, 350);
}

function onPrevQuestion() {
  goToPrevQuestion();
  renderQuestion();
}

function onNextQuestion() {
  const profile = getActiveProfile();
  const q = getCurrentQuestion();
  if (!q || profile.answers[q.id] === undefined) return;

  goToNextQuestion();
  renderQuestion();
}

function onBackToProfiles() {
  renderProfileScreen();
}

function onRetakeAssessment() {
  const profile = getActiveProfile();
  if (!profile) return;

  profile.answers = {};
  profile.currentIndex = 0;
  profile.completed = false;
  profile.results = null;
  profile.shuffleSeed = Math.floor(Math.random() * 100000);
  saveProfiles();

  initQuiz();
  renderQuestion();
}

// ========================================================
// 5. UTILITY
// ========================================================
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ========================================================
// 6. KEYBOARD SHORTCUTS
// ========================================================
document.addEventListener('keydown', (e) => {
  const quizScreen = document.getElementById('screen-quiz');
  if (!quizScreen || !quizScreen.classList.contains('active')) return;

  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1;
    const btns = document.querySelectorAll('.option-btn');
    if (btns[idx]) btns[idx].click();
  }
  if (e.key === 'ArrowLeft') onPrevQuestion();
  if (e.key === 'ArrowRight') onNextQuestion();
});

// ========================================================
// 7. INIT ON LOAD
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  loadProfiles();

  // If there's an active profile with an incomplete quiz, resume it
  const profile = getActiveProfile();
  if (profile && !profile.completed && Object.keys(profile.answers).length > 0) {
    initQuiz();
    renderQuestion();
  } else if (profile && profile.completed) {
    renderResults(profile.results);
  } else {
    renderProfileScreen();
  }
});
