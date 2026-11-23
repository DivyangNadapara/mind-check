// ========================================================
// MINDCHECK CLINICAL BOARD DIAGNOSTIC & MULTI-PAGE REPORT ENGINE
// Simulates an expert multi-disciplinary medical board
// ========================================================

const CLINICAL_THRESHOLDS = {
  minimal: 0.25,
  mild: 0.45,
  moderate: 0.65,
  marked: 0.80
};

function calculateClinicalResults(answers, questions) {
  const maxScores = {};
  const actualScores = {};

  for (const key of Object.keys(CONDITIONS)) {
    maxScores[key] = 0;
    actualScores[key] = 0;
  }

  // Calculate actual vs max scores
  for (const q of questions) {
    const rawAnswer = answers[q.id];

    if (q.type === 'multi') {
      // For multi-select: options have individual weights
      for (const opt of q.options) {
        if (opt.weight) {
          for (const [cond, w] of Object.entries(opt.weight)) {
            if (maxScores[cond] !== undefined) {
              maxScores[cond] += 3 * w; // max potential value 3
              if (Array.isArray(rawAnswer) && rawAnswer.includes(opt.text)) {
                actualScores[cond] += 3 * w;
              }
            }
          }
        }
      }
    } else if (q.type === 'scale') {
      // Scale from 0 to 10
      const val = (rawAnswer !== undefined && rawAnswer !== null) ? Number(rawAnswer) : 0;
      const normalizedVal = (val / 10) * 3; // normalize to 0-3 scale
      if (q.weights) {
        for (const [cond, w] of Object.entries(q.weights)) {
          if (maxScores[cond] !== undefined) {
            maxScores[cond] += 3 * w;
            actualScores[cond] += normalizedVal * w;
          }
        }
      }
    } else if (q.type === 'scenario') {
      // Scenario with distinct option weights
      const maxOptWeight = 3;
      // Calculate max potential for conditions in this scenario
      for (const opt of q.options) {
        if (opt.weights) {
          for (const [cond, w] of Object.entries(opt.weights)) {
            if (maxScores[cond] !== undefined) {
              maxScores[cond] = Math.max(maxScores[cond], maxScores[cond] + (maxOptWeight * w * 0.5));
            }
          }
        }
      }
      // Actual selected option
      if (rawAnswer !== undefined && rawAnswer !== null) {
        const selectedOpt = q.options[rawAnswer] || q.options.find(o => o.value === rawAnswer);
        if (selectedOpt && selectedOpt.weights) {
          for (const [cond, w] of Object.entries(selectedOpt.weights)) {
            if (actualScores[cond] !== undefined) {
              actualScores[cond] += 3 * w;
            }
          }
        }
      }
    } else {
      // Standard single selection
      const val = (rawAnswer !== undefined && rawAnswer !== null) ? Number(rawAnswer) : 0;
      if (q.weights) {
        for (const [cond, w] of Object.entries(q.weights)) {
          if (maxScores[cond] !== undefined) {
            maxScores[cond] += 3 * w;
            actualScores[cond] += val * w;
          }
        }
      }
    }
  }

  // Calculate percentages and clinical tiers
  const profileList = [];
  for (const key of Object.keys(CONDITIONS)) {
    const raw = actualScores[key];
    const max = Math.max(maxScores[key], 1);
    const pct = Math.min(100, Math.round((raw / max) * 100));

    let tier, label, colorClass, badgeStyle;

    if (key === 'INT') {
      // Introversion is a temperament trait, not a pathology
      if (pct < 30) {
        tier = 'Extroverted / Socially Ambiverted';
        label = 'Low Solitude Need';
        colorClass = 'badge-neutral';
        badgeStyle = '#64748b';
      } else if (pct < 65) {
        tier = 'Balanced Ambivert';
        label = 'Moderate Solitude Need';
        colorClass = 'badge-info';
        badgeStyle = '#0ea5e9';
      } else {
        tier = 'High Introversion & Sensitive Battery';
        label = 'High Solitude Need';
        colorClass = 'badge-success';
        badgeStyle = '#10b981';
      }
    } else {
      if (pct < 25) {
        tier = 'Minimal / Subclinical';
        label = 'Minimal';
        colorClass = 'badge-green';
        badgeStyle = '#22c55e';
      } else if (pct < 45) {
        tier = 'Mild / Emerging';
        label = 'Mild';
        colorClass = 'badge-yellow';
        badgeStyle = '#eab308';
      } else if (pct < 65) {
        tier = 'Moderate / Clinically Significant';
        label = 'Moderate';
        colorClass = 'badge-orange';
        badgeStyle = '#f97316';
      } else if (pct < 80) {
        tier = 'Marked / High Clinical Concern';
        label = 'Marked';
        colorClass = 'badge-red';
        badgeStyle = '#ef4444';
      } else {
        tier = 'Severe / Acute Clinical Priority';
        label = 'Severe';
        colorClass = 'badge-purple';
        badgeStyle = '#b91c1c';
      }
    }

    profileList.push({
      key,
      condition: CONDITIONS[key],
      rawScore: Math.round(raw * 10) / 10,
      maxScore: Math.round(max * 10) / 10,
      percentage: pct,
      tier,
      label,
      badgeStyle,
      isElevated: key !== 'INT' && pct >= 45,
      isHighPriority: key !== 'INT' && pct >= 65
    });
  }

  // Sort clinical conditions by percentage (excluding INT from top clinical disorders)
  const clinicalDisorders = profileList.filter(p => p.key !== 'INT').sort((a, b) => b.percentage - a.percentage);
  const introversionProfile = profileList.find(p => p.key === 'INT');

  const elevatedConditions = clinicalDisorders.filter(c => c.percentage >= 45);
  const primaryCondition = clinicalDisorders[0];
  const secondaryCondition = clinicalDisorders[1] && clinicalDisorders[1].percentage >= 40 ? clinicalDisorders[1] : null;

  // Generate the Comprehensive Multi-Page Clinical Dossier
  const report = generateComprehensiveBoardDossier(clinicalDisorders, introversionProfile, primaryCondition, secondaryCondition);

  return {
    all: profileList,
    clinicalDisorders,
    introversionProfile,
    elevatedConditions,
    primaryCondition,
    secondaryCondition,
    report,
    totalQuestions: questions.length,
    totalAnswered: Object.keys(answers).length
  };
}

// ========================================================
// CLINICAL BOARD DOSSIER GENERATOR (MULTI-PAGE DEPTH)
// ========================================================
function generateComprehensiveBoardDossier(disorders, introversion, primary, secondary) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // 1. EXECUTIVE FORMULATION
  let executiveSummary = "";
  if (!primary || primary.percentage < 30) {
    executiveSummary = `Following a thorough multi-specialty clinical screening, your responses indicate a generally balanced neuro-affective profile with no acute or clinical-range psychopathology detected. Mild transient stress or fatigue may be present, but core functioning across mood, attention, and autonomic regulation remains within healthy normative ranges.`;
  } else if (primary.percentage < 45) {
    executiveSummary = `The Board's evaluation reveals mild sub-threshold elevations primarily centered around ${primary.condition.name}. While these symptoms do not yet meet the criteria for a severe clinical disorder, they represent noticeable friction points in daily productivity, emotional resilience, or autonomic calm. Early proactive interventions are highly recommended.`;
  } else {
    executiveSummary = `The Clinical Board has reached consensus on a marked primary presentation indicating **${primary.condition.name}** (Severity Index: ${primary.percentage}%), `;
    if (secondary && secondary.percentage >= 45) {
      executiveSummary += `compounded by significant secondary clinical indicators of **${secondary.condition.name}** (${secondary.percentage}%). `;
    }
    executiveSummary += `This pattern indicates that your current distress is not an isolated bad week or personal failure of willpower, but rather a profound neurobiological and autonomic dysregulation requiring structured, evidence-based care.`;
  }

  // 2. DIFFERENTIAL DIAGNOSES & SYNERGY ANALYSIS
  const differentials = [];

  const traumaScore = disorders.find(d => d.key === 'CTR')?.percentage || 0;
  const adhdInatt = disorders.find(d => d.key === 'ADI')?.percentage || 0;
  const adhdHyp = disorders.find(d => d.key === 'ADH')?.percentage || 0;
  const anxietyScore = disorders.find(d => d.key === 'GAD')?.percentage || 0;
  const socialAnxScore = disorders.find(d => d.key === 'SAD')?.percentage || 0;
  const depressionScore = disorders.find(d => d.key === 'DEP')?.percentage || 0;
  const dysthymiaScore = disorders.find(d => d.key === 'DYS')?.percentage || 0;
  const burnoutScore = disorders.find(d => d.key === 'BUR')?.percentage || 0;
  const bipolarScore = disorders.find(d => d.key === 'BIP')?.percentage || 0;
  const bpdScore = disorders.find(d => d.key === 'BPD')?.percentage || 0;
  const panicScore = disorders.find(d => d.key === 'PAN')?.percentage || 0;
  const ocdScore = disorders.find(d => d.key === 'OCD')?.percentage || 0;
  const sleepScore = disorders.find(d => d.key === 'INS')?.percentage || 0;
  const introversionScore = introversion ? introversion.percentage : 50;

  // Analysis 1: ADHD vs Anxiety Synergy
  if (adhdInatt >= 45 && anxietyScore >= 45) {
    differentials.push({
      title: "ADHD Executive Dysfunction vs. Generalized Anxiety Synergy",
      specialist: "Dr. Elena Rostova & Dr. Kabir Patel",
      text: "A critical diagnostic finding in your profile is the high co-elevation of Adult ADHD (Inattentive) and Generalized Anxiety. Clinically, this is frequently misdiagnosed as pure anxiety. In reality, individuals with undiagnosed executive dysfunction often use adrenaline and catastrophic anxiety as an unconscious 'fuel' to force their prefrontal cortex to initiate tasks. Treating the anxiety alone without accommodating the underlying dopamine and executive deficits often leads to worsening task paralysis."
    });
  }

  // Analysis 2: Childhood Trauma Developmental Imprint
  if (traumaScore >= 45) {
    differentials.push({
      title: "Childhood Relational Trauma (ACEs) & Autonomic Nervous System Wiring",
      specialist: "Dr. Marcus Vance",
      text: "Your responses indicate substantial developmental and childhood trauma (growing up on eggshells, emotional neglect, or parentification). The brain's threat circuitry (amygdala and dorsal vagal complex) was conditioned early in life to view the world as chronically unsafe. What you experience today as sudden panic, hypervigilance, difficulty trusting others, or people-pleasing are not random flaws — they are brilliant survival adaptations that your nervous system developed to keep you safe as a child, which now trap you in an exhausted adult body."
    });
  }

  // Analysis 3: Introversion vs Social Anxiety
  if (introversionScore >= 55) {
    if (socialAnxScore >= 45) {
      differentials.push({
        title: "High Introversion Coexisting with Social Anxiety Disorder",
        specialist: "Dr. Maya Lin",
        text: "It is crucial to separate your temperament from your anxiety. Your high introversion is a healthy biological trait: your nervous system naturally processes stimuli deeply, and you recharge through quiet solitude. However, you also suffer from Social Anxiety: a fear of humiliation and negative scrutiny. The Board's goal is NOT to turn you into a loud extrovert, but to dismantle the shame and terror of social evaluation while fiercely protecting your natural need for quiet solitude."
      });
    } else {
      differentials.push({
        title: "Healthy Temperamental Introversion (Non-Pathological)",
        specialist: "Dr. Maya Lin",
        text: "Your profile indicates high introversion without disabling social anxiety. You genuinely enjoy quiet pursuits and require solitude to restore your energy battery. Society often unfairly pathologizes quietness as 'withdrawn' or 'anti-social.' The Board confirms your introversion is a biological gift and a healthy boundary, not a psychiatric disorder."
      });
    }
  }

  // Analysis 4: Depression vs Burnout Exhaustion
  if (depressionScore >= 45 && burnoutScore >= 45) {
    differentials.push({
      title: "Allostatic Burnout Masking as Major Depression",
      specialist: "Dr. Sarah Jenkins & Dr. Elena Rostova",
      text: "Your presentation exhibits severe allostatic burnout running parallel with depressive symptoms. When an individual spends months or years 'masking' their true struggles and operating in survival mode, the neuro-endocrine system depletes its cortisol and serotonin reserves. This looks like depression (anhedonia, heavy limbs, brain fog), but classic anti-depressive willpower exercises will fail unless accompanied by radical autonomic rest and nervous system decompression."
    });
  }

  // Analysis 5: Bipolar vs Borderline Emotional Cycling
  if (bipolarScore >= 45 || bpdScore >= 45) {
    differentials.push({
      title: "Affective Instability: Neurochemical Cycling vs Interpersonal Triggers",
      specialist: "Dr. Sarah Jenkins & Dr. Maya Lin",
      text: "Your responses demonstrate significant emotional velocity. We carefully analyzed whether this represents Bipolar cycling (autonomous neurochemical shifts lasting days or weeks independent of environment) or Borderline emotional dysregulation (hyper-reactive shifts triggered within hours by perceived rejection, abandonment, or conflict). A qualified psychiatrist should perform longitudinal mood tracking to tailor the correct therapeutic framework."
    });
  }

  // Analysis 6: Sleep & Circadian Architecture
  if (sleepScore >= 50) {
    differentials.push({
      title: "Circadian Rhythm Delay & Nocturnal Hyperarousal",
      specialist: "Dr. Sarah Jenkins",
      text: "Chronic insomnia and night-owl circadian shifts are severely eroding your cognitive resilience. When the prefrontal cortex is deprived of restorative deep slow-wave and REM sleep, the amygdala becomes 60% more emotionally reactive the following day, intensifying anxiety loops and ADHD symptoms."
    });
  }

  // 3. BOARD MEMBER DELIBERATION NOTES
  const boardNotes = [
    {
      doctor: DOCTORS.jenkins,
      statement: primary.key === 'DEP' || primary.key === 'DYS' || primary.key === 'BIP' || primary.key === 'INS'
        ? `I have reviewed the neuro-affective profile in detail. The patient's score in ${primary.condition.name} is the primary driver of their cognitive slowing and pervasive emotional fatigue. We must address neurochemical stabilization and sleep continuity immediately.`
        : `From a neuropsychiatric standpoint, while primary mood disorders are secondary here, the chronic wear on the patient's nervous system is clearly depleting dopamine and serotonin. Restoring baseline sleep architecture is essential.`
    },
    {
      doctor: DOCTORS.vance,
      statement: traumaScore >= 40
        ? `The trauma index (${traumaScore}%) cannot be overlooked. The patient's adult hyperarousal and self-worth beliefs are direct echoes of early relational unsafety and childhood emotional neglect. Any treatment plan that ignores somatic trauma release will only scratch the surface.`
        : `Developmental trauma indicators appear manageable or secondary. The patient shows intact early relational anchoring, meaning cognitive and behavioral tools can be utilized without extensive trauma desensitization.`
    },
    {
      doctor: DOCTORS.rostova,
      statement: adhdInatt >= 40 || adhdHyp >= 40 || burnoutScore >= 40
        ? `The executive dysfunction markers (${adhdInatt}% Inattentive / ${burnoutScore}% Burnout) are striking. The patient is suffering from classic dopamine initiation failure and task paralysis, which they have internalized as 'laziness.' Re-framing this as prefrontal wiring rather than moral failing will bring immense relief.`
        : `Executive function and dopamine regulation appear largely functional. Cognitive stamina will naturally rebound once the primary emotional stressors are de-escalated.`
    },
    {
      doctor: DOCTORS.patel,
      statement: anxietyScore >= 40 || panicScore >= 40 || ocdScore >= 40
        ? `The somatic anxiety markers and catastrophic loop frequencies indicate an autonomic nervous system locked in fight-or-flight sympathetic dominance. The vagal tone is suppressed, producing hyperventilation, tension, and panic anticipatory dread.`
        : `Autonomic alarm triggers and panic loops remain within manageable thresholds. The patient can utilize top-down mindfulness and cognitive reframing effectively.`
    },
    {
      doctor: DOCTORS.lin,
      statement: introversionScore >= 55
        ? `I want to emphasize to the patient that their ${introversion.tier} is a beautiful, natural asset. We must guide them to honor their quiet boundaries, stop exhausting themselves by over-masking, and address social anxiety without eroding their introverted soul.`
        : `The patient displays a balanced social orientation. Facilitating supportive community connections and interpersonal repair will serve as a vital therapeutic lever.`
    }
  ];

  // 4. ACTIONABLE ROADMAP
  const actionPlan = {
    immediate: [
      "Schedule a consultation with a licensed clinical psychologist or psychiatrist, bringing this MindCheck dossier as a clinical talking point.",
      "Implement the 'Physiological Sigh' (two quick inhales through the nose, one long slow exhale through the mouth) 3 times whenever acute panic or overwhelm hits.",
      "Establish a strict circadian anchor: wake up at the exact same time daily and view natural daylight within 20 minutes of rising."
    ],
    therapeuticModalities: [
      traumaScore >= 45 ? "EMDR (Eye Movement Desensitization & Reprocessing) or Somatic Experiencing for resolving childhood trauma imprints." : null,
      bpdScore >= 45 ? "DBT (Dialectical Behavior Therapy) for mastering distress tolerance and emotional regulation." : null,
      (adhdInatt >= 45 || adhdHyp >= 45) ? "Adult ADHD Coaching & Prefrontal Accommodations (externalizing memory, visual timers, dopamine menus)." : null,
      (anxietyScore >= 45 || ocdScore >= 45) ? "ERP (Exposure and Response Prevention) or Acceptance & Commitment Therapy (ACT) for breaking obsessive loops." : null,
      depressionScore >= 45 ? "Behavioral Activation & Schema Therapy to counter deep-rooted core defectiveness beliefs." : null
    ].filter(Boolean),
    doctorDiscussionQuestions: [
      `"I completed an extensive multi-specialty screening indicating significant elevation in ${primary.condition.name}. Can we evaluate this clinically?"`,
      secondary ? `"We noticed potential synergy with ${secondary.condition.name}. How can we differentiate between the two?"` : null,
      traumaScore >= 45 ? `"My screening revealed significant childhood developmental trauma indicators. What trauma-informed modalities do you offer?"` : null,
      adhdInatt >= 45 ? `"Given my high executive dysfunction markers, would a formal neuro-psychological ADHD evaluation be appropriate?"` : null
    ].filter(Boolean)
  };

  return {
    dateStr,
    executiveSummary,
    differentials,
    boardNotes,
    actionPlan
  };
}
