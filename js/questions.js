// ========================================================
// COMPREHENSIVE MENTAL HEALTH SCREENING QUESTION BANK
// 80+ questions covering 12 conditions, all mixed together
// Based on validated clinical screening concepts (PHQ-9, GAD-7, MDQ, ASRS, PCL-5, etc.)
// Each question maps to one or more conditions with weighted scores
// ========================================================

// Condition keys used in scoring
// DEP  = Major Depressive Disorder
// DYS  = Persistent Depressive Disorder (Dysthymia)
// BIP  = Bipolar Disorder
// GAD  = Generalized Anxiety Disorder
// SAD  = Social Anxiety Disorder
// PAN  = Panic Disorder
// ADI  = ADHD - Predominantly Inattentive
// ADH  = ADHD - Predominantly Hyperactive-Impulsive
// OCD  = Obsessive-Compulsive Disorder
// PTSD = Post-Traumatic Stress Disorder
// BPD  = Borderline Personality Disorder
// EAT  = Eating Disorder Spectrum
// INS  = Insomnia / Sleep Disorder

const CONDITIONS = {
  DEP:  { name: 'Major Depression', color: '#6366f1', icon: '🌧️', description: 'Persistent sadness, loss of interest, fatigue, and feelings of worthlessness that significantly impact daily functioning.' },
  DYS:  { name: 'Persistent Low Mood (Dysthymia)', color: '#8b5cf6', icon: '🌫️', description: 'A chronic but milder form of depression lasting two years or more, with consistent low mood and low energy.' },
  BIP:  { name: 'Bipolar Spectrum', color: '#f59e0b', icon: '🎢', description: 'Cycling between periods of elevated mood/energy (mania or hypomania) and depressive episodes.' },
  GAD:  { name: 'Generalized Anxiety', color: '#ef4444', icon: '😰', description: 'Excessive, uncontrollable worry about everyday matters, often accompanied by physical tension and restlessness.' },
  SAD:  { name: 'Social Anxiety', color: '#ec4899', icon: '🫣', description: 'Intense fear of social situations due to worry about being judged, embarrassed, or humiliated.' },
  PAN:  { name: 'Panic Disorder', color: '#f43f5e', icon: '💓', description: 'Recurrent unexpected panic attacks with intense physical symptoms like racing heart, shortness of breath, and dread.' },
  ADI:  { name: 'ADHD – Inattentive Type', color: '#3b82f6', icon: '🧠', description: 'Difficulty sustaining attention, organizing tasks, following through on instructions, and frequent forgetfulness.' },
  ADH:  { name: 'ADHD – Hyperactive-Impulsive Type', color: '#06b6d4', icon: '⚡', description: 'Restlessness, fidgeting, difficulty waiting, excessive talking, and acting without thinking.' },
  OCD:  { name: 'Obsessive-Compulsive Tendencies', color: '#14b8a6', icon: '🔄', description: 'Recurring unwanted thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce anxiety.' },
  PTSD: { name: 'Post-Traumatic Stress', color: '#a855f7', icon: '⚠️', description: 'Flashbacks, nightmares, hypervigilance, and emotional numbness following exposure to a traumatic event.' },
  BPD:  { name: 'Emotional Dysregulation', color: '#e11d48', icon: '🌊', description: 'Intense and rapidly shifting emotions, unstable self-image, fear of abandonment, and difficulty maintaining relationships.' },
  EAT:  { name: 'Disordered Eating Patterns', color: '#84cc16', icon: '🍽️', description: 'Unhealthy preoccupation with food, weight, body image, or eating behaviors that affect physical and emotional health.' },
  INS:  { name: 'Sleep Disturbance', color: '#64748b', icon: '🌙', description: 'Persistent difficulty falling asleep, staying asleep, or experiencing restorative sleep, impacting daytime function.' }
};

// Standard 4-option scale used by most questions
const SCALE_FREQUENCY = [
  { text: 'Not at all', value: 0 },
  { text: 'Several days', value: 1 },
  { text: 'More than half the days', value: 2 },
  { text: 'Nearly every day', value: 3 }
];

const SCALE_AGREE = [
  { text: 'Strongly disagree', value: 0 },
  { text: 'Somewhat disagree', value: 1 },
  { text: 'Somewhat agree', value: 2 },
  { text: 'Strongly agree', value: 3 }
];

const SCALE_SEVERITY = [
  { text: 'Not at all', value: 0 },
  { text: 'A little bit', value: 1 },
  { text: 'Moderately', value: 2 },
  { text: 'Extremely', value: 3 }
];

const SCALE_NEVER_ALWAYS = [
  { text: 'Never', value: 0 },
  { text: 'Rarely', value: 1 },
  { text: 'Sometimes', value: 2 },
  { text: 'Very often', value: 3 }
];

// ========================================================
// QUESTION BANK - 85 QUESTIONS, DELIBERATELY MIXED
// ========================================================
const QUESTIONS = [
  // --- BLOCK 1: Mixed opening questions ---
  {
    id: 1,
    text: "Over the past 2 weeks, how often have you felt little interest or pleasure in doing things you usually enjoy?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 1.0, DYS: 0.7, BPD: 0.3 }
  },
  {
    id: 2,
    text: "How often do you find it hard to stay focused on tasks or activities, even ones you find interesting?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 1.0, DEP: 0.3 }
  },
  {
    id: 3,
    text: "Do you experience sudden, intense episodes of fear or panic that seem to come out of nowhere?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PAN: 1.0, GAD: 0.4 }
  },
  {
    id: 4,
    text: "How often do you feel nervous, anxious, or on edge?",
    options: SCALE_FREQUENCY,
    weights: { GAD: 1.0, PAN: 0.3, SAD: 0.3 }
  },
  {
    id: 5,
    text: "Have you had periods lasting several days where you felt unusually energetic, needed much less sleep, and had racing thoughts?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BIP: 1.0 }
  },

  // --- BLOCK 2 ---
  {
    id: 6,
    text: "How often do you have trouble falling asleep, staying asleep, or sleeping too much?",
    options: SCALE_FREQUENCY,
    weights: { INS: 1.0, DEP: 0.5, GAD: 0.3 }
  },
  {
    id: 7,
    text: "Do you avoid social situations because you fear being judged or embarrassed?",
    options: SCALE_NEVER_ALWAYS,
    weights: { SAD: 1.0, GAD: 0.2 }
  },
  {
    id: 8,
    text: "How often do you fidget, squirm, or feel restless when you have to sit still for a long time?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADH: 1.0, GAD: 0.2 }
  },
  {
    id: 9,
    text: "Do unwanted, intrusive thoughts repeatedly enter your mind even when you try to stop them?",
    options: SCALE_NEVER_ALWAYS,
    weights: { OCD: 1.0, GAD: 0.3, PTSD: 0.3 }
  },
  {
    id: 10,
    text: "How often have you felt down, depressed, or hopeless?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 1.0, DYS: 0.8, BPD: 0.3 }
  },

  // --- BLOCK 3 ---
  {
    id: 11,
    text: "Do you often interrupt others or blurt out answers before questions have been completed?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADH: 1.0 }
  },
  {
    id: 12,
    text: "Have you experienced a traumatic event that you find yourself re-living through flashbacks or nightmares?",
    options: SCALE_SEVERITY,
    weights: { PTSD: 1.0, INS: 0.3 }
  },
  {
    id: 13,
    text: "How often do you feel tired or have little energy, even after sleeping?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 0.8, DYS: 0.8, INS: 0.5 }
  },
  {
    id: 14,
    text: "Do you feel compelled to perform certain rituals or repetitive behaviors (like checking, counting, or washing) to reduce anxiety?",
    options: SCALE_NEVER_ALWAYS,
    weights: { OCD: 1.0 }
  },
  {
    id: 15,
    text: "How often do you worry excessively about different things in your life (work, health, family, money)?",
    options: SCALE_FREQUENCY,
    weights: { GAD: 1.0, DEP: 0.2 }
  },

  // --- BLOCK 4 ---
  {
    id: 16,
    text: "Do your emotions shift rapidly and intensely, sometimes within the same hour?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BPD: 1.0, BIP: 0.5 }
  },
  {
    id: 17,
    text: "How often do you lose things necessary for tasks (keys, phone, wallet, documents)?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 1.0 }
  },
  {
    id: 18,
    text: "Do you feel extremely self-conscious or worry that others are watching and judging you in social settings?",
    options: SCALE_NEVER_ALWAYS,
    weights: { SAD: 1.0, GAD: 0.3 }
  },
  {
    id: 19,
    text: "How often do you have poor appetite or overeat?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 0.6, EAT: 0.8 }
  },
  {
    id: 20,
    text: "During your energetic periods, have you taken unusual risks or made impulsive decisions you later regretted?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BIP: 1.0, ADH: 0.3, BPD: 0.4 }
  },

  // --- BLOCK 5 ---
  {
    id: 21,
    text: "How often do you feel that you are a failure or have let yourself or your family down?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 1.0, DYS: 0.6 }
  },
  {
    id: 22,
    text: "Do you experience heart pounding, sweating, trembling, or shortness of breath during moments of intense fear?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PAN: 1.0, GAD: 0.3, SAD: 0.3 }
  },
  {
    id: 23,
    text: "How often do you have difficulty organizing tasks and managing your time effectively?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 1.0, ADH: 0.4 }
  },
  {
    id: 24,
    text: "Do you go to great lengths to avoid being abandoned by people close to you?",
    options: SCALE_AGREE,
    weights: { BPD: 1.0 }
  },
  {
    id: 25,
    text: "How often do you feel emotionally numb or detached from the world around you?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PTSD: 0.8, DEP: 0.6, DYS: 0.4, BPD: 0.3 }
  },

  // --- BLOCK 6 ---
  {
    id: 26,
    text: "Do you spend significant time thinking about food, calories, body weight, or body shape?",
    options: SCALE_NEVER_ALWAYS,
    weights: { EAT: 1.0 }
  },
  {
    id: 27,
    text: "How often do you find it difficult to relax?",
    options: SCALE_FREQUENCY,
    weights: { GAD: 0.8, INS: 0.4, PAN: 0.3 }
  },
  {
    id: 28,
    text: "Do you often make careless mistakes in work, school, or other activities because you weren't paying close attention?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 1.0 }
  },
  {
    id: 29,
    text: "Have there been times when you talked much more than usual or felt pressure to keep talking?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BIP: 0.9, ADH: 0.4 }
  },
  {
    id: 30,
    text: "How often do you feel easily startled or constantly on guard?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PTSD: 1.0, GAD: 0.4, PAN: 0.3 }
  },

  // --- BLOCK 7 ---
  {
    id: 31,
    text: "Do you experience persistent muscle tension, headaches, or stomach problems related to worry?",
    options: SCALE_NEVER_ALWAYS,
    weights: { GAD: 0.8, PAN: 0.3 }
  },
  {
    id: 32,
    text: "How often do you feel that life is not worth living?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 1.0, BPD: 0.5, DYS: 0.4 }
  },
  {
    id: 33,
    text: "Do you have an unstable sense of who you are — your goals, values, or identity seem to shift frequently?",
    options: SCALE_AGREE,
    weights: { BPD: 1.0, BIP: 0.2 }
  },
  {
    id: 34,
    text: "How often do you procrastinate or delay starting tasks that require sustained mental effort?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 0.8, ADH: 0.4, DEP: 0.3 }
  },
  {
    id: 35,
    text: "Do you feel the need to check things repeatedly (locks, stove, messages) even though you know they're fine?",
    options: SCALE_NEVER_ALWAYS,
    weights: { OCD: 1.0 }
  },

  // --- BLOCK 8 ---
  {
    id: 36,
    text: "How often do you avoid places, activities, or people that remind you of a past traumatic experience?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PTSD: 1.0, SAD: 0.2 }
  },
  {
    id: 37,
    text: "Do you often feel that your mood and energy are on a rollercoaster that you can't control?",
    options: SCALE_AGREE,
    weights: { BIP: 0.8, BPD: 0.8 }
  },
  {
    id: 38,
    text: "How often do you have difficulty concentrating, such as reading a full article or following a conversation?",
    options: SCALE_FREQUENCY,
    weights: { ADI: 0.9, DEP: 0.4, GAD: 0.3 }
  },
  {
    id: 39,
    text: "Do you restrict food intake, skip meals, or follow extreme diets to control your weight?",
    options: SCALE_NEVER_ALWAYS,
    weights: { EAT: 1.0 }
  },
  {
    id: 40,
    text: "How often do you feel that you can't stop worrying, even when you try?",
    options: SCALE_FREQUENCY,
    weights: { GAD: 1.0, OCD: 0.3 }
  },

  // --- BLOCK 9 ---
  {
    id: 41,
    text: "Do you have intense anger outbursts that feel disproportionate to the situation?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BPD: 0.9, BIP: 0.3, ADH: 0.3 }
  },
  {
    id: 42,
    text: "How often do you wake up feeling unrefreshed, even after a full night's sleep?",
    options: SCALE_FREQUENCY,
    weights: { INS: 0.9, DEP: 0.5, DYS: 0.4 }
  },
  {
    id: 43,
    text: "Do you feel a rush of anxiety or dread when you think about speaking in front of others or meeting new people?",
    options: SCALE_SEVERITY,
    weights: { SAD: 1.0, PAN: 0.3 }
  },
  {
    id: 44,
    text: "How often do you feel as if your thoughts are racing so fast you can't keep up?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BIP: 0.9, GAD: 0.5, ADH: 0.4 }
  },
  {
    id: 45,
    text: "Do you engage in self-destructive behaviors (reckless spending, unsafe activities, substance use) during emotional distress?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BPD: 1.0, BIP: 0.4 }
  },

  // --- BLOCK 10 ---
  {
    id: 46,
    text: "How often do you forget appointments, deadlines, or commitments?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 1.0 }
  },
  {
    id: 47,
    text: "Do you feel guilty about eating or feel disgusted with yourself after eating?",
    options: SCALE_NEVER_ALWAYS,
    weights: { EAT: 1.0, DEP: 0.2 }
  },
  {
    id: 48,
    text: "How often do you feel so restless that it's hard to sit still?",
    options: SCALE_FREQUENCY,
    weights: { ADH: 0.9, GAD: 0.5, PAN: 0.3 }
  },
  {
    id: 49,
    text: "Do disturbing memories of a past event intrude into your mind when you don't want them to?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PTSD: 1.0, OCD: 0.2 }
  },
  {
    id: 50,
    text: "How often do you feel that people around you don't understand what you're going through?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 0.5, DYS: 0.5, BPD: 0.5 }
  },

  // --- BLOCK 11 ---
  {
    id: 51,
    text: "Do you have trouble completing projects or tasks because you get sidetracked by unrelated thoughts?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 0.9, ADH: 0.5 }
  },
  {
    id: 52,
    text: "How often do you feel keyed up or wound up with no specific reason?",
    options: SCALE_FREQUENCY,
    weights: { GAD: 0.9, PAN: 0.4 }
  },
  {
    id: 53,
    text: "During high-energy periods, have you needed significantly less sleep (e.g., only 3-4 hours) yet still felt rested?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BIP: 1.0 }
  },
  {
    id: 54,
    text: "Do you have specific thoughts or images that make you feel contaminated, harmful, or morally wrong?",
    options: SCALE_NEVER_ALWAYS,
    weights: { OCD: 1.0, GAD: 0.2 }
  },
  {
    id: 55,
    text: "How often do you feel slowed down — moving, speaking, or thinking more slowly than usual?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 0.9, DYS: 0.7 }
  },

  // --- BLOCK 12 ---
  {
    id: 56,
    text: "Do your relationships tend to be intense but unstable, swinging between idealization and devaluation?",
    options: SCALE_AGREE,
    weights: { BPD: 1.0, BIP: 0.2 }
  },
  {
    id: 57,
    text: "How often do you have difficulty waiting your turn in conversations, queues, or activities?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADH: 1.0 }
  },
  {
    id: 58,
    text: "Do you lie awake at night with your mind racing, unable to switch off your thoughts?",
    options: SCALE_NEVER_ALWAYS,
    weights: { INS: 1.0, GAD: 0.5, DEP: 0.3 }
  },
  {
    id: 59,
    text: "How often do you avoid eating in front of others due to embarrassment about how much or how little you eat?",
    options: SCALE_NEVER_ALWAYS,
    weights: { EAT: 0.9, SAD: 0.3 }
  },
  {
    id: 60,
    text: "Do you feel hypervigilant — constantly scanning your environment for potential threats or danger?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PTSD: 0.9, GAD: 0.5, PAN: 0.3 }
  },

  // --- BLOCK 13 ---
  {
    id: 61,
    text: "How often do you feel worthless or excessively guilty about things that aren't your fault?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 1.0, DYS: 0.5, OCD: 0.2 }
  },
  {
    id: 62,
    text: "Do you catch yourself daydreaming or zoning out during conversations, meetings, or lectures?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 1.0, DEP: 0.2 }
  },
  {
    id: 63,
    text: "Have you ever felt so good or hyper that others told you that you were not your normal self?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BIP: 1.0 }
  },
  {
    id: 64,
    text: "Do you have panic attacks where you feel like you might die, lose control, or go crazy?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PAN: 1.0, GAD: 0.3 }
  },
  {
    id: 65,
    text: "How often do you feel emotionally empty inside?",
    options: SCALE_FREQUENCY,
    weights: { BPD: 0.9, DEP: 0.6, DYS: 0.5 }
  },

  // --- BLOCK 14 ---
  {
    id: 66,
    text: "Do you need things to be arranged in a specific order or symmetry, and feel distressed if they aren't?",
    options: SCALE_NEVER_ALWAYS,
    weights: { OCD: 1.0 }
  },
  {
    id: 67,
    text: "How often do you feel irritable or easily angered?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 0.5, GAD: 0.4, BIP: 0.5, BPD: 0.5, ADH: 0.3 }
  },
  {
    id: 68,
    text: "Do you exercise excessively or purge (vomit, use laxatives) to compensate for eating?",
    options: SCALE_NEVER_ALWAYS,
    weights: { EAT: 1.0 }
  },
  {
    id: 69,
    text: "How often do you feel like you're watching yourself from outside your body or that the world around you feels unreal?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PTSD: 0.8, BPD: 0.5, PAN: 0.4 }
  },
  {
    id: 70,
    text: "Do you have difficulty listening when spoken to directly, even when there is no obvious distraction?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 1.0, ADH: 0.3 }
  },

  // --- BLOCK 15 ---
  {
    id: 71,
    text: "How often has sadness or low mood been a part of your life for most days over the past two years?",
    options: SCALE_FREQUENCY,
    weights: { DYS: 1.0, DEP: 0.5 }
  },
  {
    id: 72,
    text: "Do you worry about having another panic attack or change your behavior to avoid triggering one?",
    options: SCALE_AGREE,
    weights: { PAN: 1.0, GAD: 0.3 }
  },
  {
    id: 73,
    text: "How often do you have difficulty controlling your impulses (spending, eating, talking, driving)?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADH: 0.8, BIP: 0.5, BPD: 0.5 }
  },
  {
    id: 74,
    text: "Do you feel that you must perform mental rituals (counting, praying, repeating phrases) to prevent something bad?",
    options: SCALE_NEVER_ALWAYS,
    weights: { OCD: 1.0 }
  },
  {
    id: 75,
    text: "How often do you use your phone, social media, or other distractions late at night, delaying sleep?",
    options: SCALE_NEVER_ALWAYS,
    weights: { INS: 0.7, ADH: 0.3, ADI: 0.2 }
  },

  // --- BLOCK 16 ---
  {
    id: 76,
    text: "Do you have strong emotional reactions to perceived rejection or criticism, even minor ones?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BPD: 0.9, SAD: 0.5, DEP: 0.3 }
  },
  {
    id: 77,
    text: "How often do you have trouble enjoying activities that most people find pleasurable?",
    options: SCALE_FREQUENCY,
    weights: { DEP: 0.9, DYS: 0.7, PTSD: 0.3 }
  },
  {
    id: 78,
    text: "Do you feel that your body weight or shape has a major influence on how you feel about yourself as a person?",
    options: SCALE_AGREE,
    weights: { EAT: 1.0, DEP: 0.2 }
  },
  {
    id: 79,
    text: "How often do you have difficulty remembering things you just read or were just told?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 0.8, DEP: 0.3, PTSD: 0.2 }
  },
  {
    id: 80,
    text: "During a high-energy period, did you become much more interested in activities that could have caused trouble (risky investments, sexual indiscretions)?",
    options: SCALE_NEVER_ALWAYS,
    weights: { BIP: 1.0, BPD: 0.3 }
  },

  // --- BLOCK 17 ---
  {
    id: 81,
    text: "How often do you feel so anxious that you experience physical symptoms (chest tightness, dizziness, tingling)?",
    options: SCALE_NEVER_ALWAYS,
    weights: { PAN: 0.9, GAD: 0.6 }
  },
  {
    id: 82,
    text: "Do you experience intense guilt or shame that seems disproportionate to what actually happened?",
    options: SCALE_NEVER_ALWAYS,
    weights: { OCD: 0.6, DEP: 0.6, PTSD: 0.4 }
  },
  {
    id: 83,
    text: "How often do you have a hard time following through on instructions or finishing chores and duties?",
    options: SCALE_NEVER_ALWAYS,
    weights: { ADI: 0.9, ADH: 0.4, DEP: 0.3 }
  },
  {
    id: 84,
    text: "Do you have persistent negative beliefs about yourself, like 'I am bad,' 'I am broken,' or 'No one can be trusted'?",
    options: SCALE_AGREE,
    weights: { PTSD: 0.8, DEP: 0.7, BPD: 0.5, DYS: 0.4 }
  },
  {
    id: 85,
    text: "How often do you feel that your sleep schedule is irregular — sleeping too much some days and barely at all on others?",
    options: SCALE_NEVER_ALWAYS,
    weights: { INS: 0.8, BIP: 0.6, DEP: 0.3 }
  }
];

// Shuffle questions deterministically per session but consistently within a session
function shuffleQuestions(questionsArray, seed) {
  const arr = [...questionsArray];
  let m = arr.length, t, i;
  let s = seed || 42;
  function seededRandom() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  }
  while (m) {
    i = Math.floor(seededRandom() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}
