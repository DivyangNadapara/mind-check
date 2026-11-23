// ========================================================
// MINDCHECK CLINICAL BOARD & COMPREHENSIVE QUESTION BANK
// Multi-specialist clinical evaluation system
// ========================================================

const DOCTORS = {
  jenkins: {
    id: 'jenkins',
    name: 'Dr. Sarah Jenkins, M.D.',
    title: 'Board-Certified Neuropsychiatrist',
    specialty: 'Mood Disorders, Bipolar Spectrum & Sleep Architecture',
    avatar: '👩‍⚕️',
    badgeColor: '#6366f1'
  },
  vance: {
    id: 'vance',
    name: 'Dr. Marcus Vance, Ph.D.',
    title: 'Senior Clinical Trauma Psychologist',
    specialty: 'Childhood Trauma, Adverse Childhood Experiences (ACEs) & Complex PTSD',
    avatar: '👨‍⚕️',
    badgeColor: '#a855f7'
  },
  rostova: {
    id: 'rostova',
    name: 'Dr. Elena Rostova, M.D., Ph.D.',
    title: 'Adult Neurodevelopmental Specialist',
    specialty: 'Adult ADHD (Inattentive & Hyperactive), Executive Dysfunction & Burnout',
    avatar: '👩‍🔬',
    badgeColor: '#0ea5e9'
  },
  patel: {
    id: 'patel',
    name: 'Dr. Kabir Patel, Psy.D.',
    title: 'Clinical Anxiety & Somatics Director',
    specialty: 'Generalized Anxiety, Panic Cycles, Agoraphobia & OCD Mechanisms',
    avatar: '👨‍⚕️',
    badgeColor: '#f43f5e'
  },
  lin: {
    id: 'lin',
    name: 'Dr. Maya Lin, Ph.D.',
    title: 'Temperament & Personality Dynamics Lead',
    specialty: 'Introversion vs Social Phobia, Sensory Processing (HSP) & Emotional Regulation',
    avatar: '👩‍⚕️',
    badgeColor: '#10b981'
  }
};

const CONDITIONS = {
  DEP: {
    key: 'DEP',
    name: 'Major Depressive Disorder (Unipolar Depression)',
    category: 'Mood & Affective',
    doctor: 'jenkins',
    color: '#6366f1',
    icon: '🌧️',
    shortDesc: 'Persistent emptiness, emotional numbness, loss of pleasure, and cognitive slowing.',
    clinicalOverview: 'A debilitating neurochemical and affective state marked by profound loss of interest in formerly rewarding activities (anhedonia), mental exhaustion, slowed thought processing, and pervasive feelings of guilt, hopelessness, or worthlessness.'
  },
  DYS: {
    key: 'DYS',
    name: 'Persistent Depressive Disorder (Dysthymia / High-Functioning Depression)',
    category: 'Mood & Affective',
    doctor: 'jenkins',
    color: '#8b5cf6',
    icon: '🌫️',
    shortDesc: 'A chronic, years-long low-grade depressive baseline that feels like "just who I am."',
    clinicalOverview: 'Unlike episodic major depression, dysthymia is a chronic baseline where you rarely recall feeling truly light or enthusiastic for two or more years. You might still hold a job or attend school, but everyday existence feels like moving through wet cement.'
  },
  BIP: {
    key: 'BIP',
    name: 'Bipolar Spectrum (Hypomania & Affective Cycling)',
    category: 'Mood & Affective',
    doctor: 'jenkins',
    color: '#f59e0b',
    icon: '⚡',
    shortDesc: 'Cycling between high-voltage energetic surges (racing mind, reduced sleep) and painful crashes.',
    clinicalOverview: 'Characterized by marked shifts in energy, activity, and mood. In elevated states (mania or hypomania), you may feel brilliant, invincible, talkative, and need only 3-4 hours of sleep, often embarking on risky or impulsive projects before crashing into severe depression.'
  },
  GAD: {
    key: 'GAD',
    name: 'Generalized Anxiety Disorder (Chronic Worry & Somatic Tension)',
    category: 'Anxiety & Autonomic',
    doctor: 'patel',
    color: '#ef4444',
    icon: '😰',
    shortDesc: 'An autonomic nervous system stuck in "threat detection," driving nonstop worst-case mental simulations.',
    clinicalOverview: 'Persistent, excessive, and uncontrollable worry regarding everyday responsibilities, health, finances, or loved ones. The body stays in a hyper-aroused sympathetic state, manifesting as muscle tightness, shallow breathing, stomach distress, and inability to unwind.'
  },
  SAD: {
    key: 'SAD',
    name: 'Social Anxiety Disorder (Fear of Scrutiny & Judgment)',
    category: 'Anxiety & Autonomic',
    doctor: 'patel',
    color: '#ec4899',
    icon: '🫣',
    shortDesc: 'Intense dread of being evaluated, embarrassed, or seen as awkward by others.',
    clinicalOverview: 'Marked, irrational fear of social interactions where one might be scrutinized or judged. This is fundamentally distinct from introversion: people with social anxiety often crave close connection, but are paralyzed by the anticipation of humiliation or negative evaluation.'
  },
  PAN: {
    key: 'PAN',
    name: 'Panic Disorder & Somatic Agoraphobia',
    category: 'Anxiety & Autonomic',
    doctor: 'patel',
    color: '#f43f5e',
    icon: '💓',
    shortDesc: 'Sudden catastrophic adrenaline surges: racing heart, air hunger, terror of dying or going crazy.',
    clinicalOverview: 'Recurrent, unexpected surges of intense terror that peak within minutes. Accompanied by somatic sensations such as palpitations, chest tightness, dizziness, and derealization, frequently generating anticipatory fear ("fear of fear itself") and avoidance of places.'
  },
  ADI: {
    key: 'ADI',
    name: 'Adult ADHD – Predominantly Inattentive Type',
    category: 'Neurodevelopmental',
    doctor: 'rostova',
    color: '#3b82f6',
    icon: '🧠',
    shortDesc: 'Executive dysfunction, dopamine regulation failure, working memory lapses, and task paralysis.',
    clinicalOverview: 'A neurodevelopmental difference in prefrontal dopamine signaling. Manifests not as a lack of attention, but as an inability to regulate attention on command: severe task initiation paralysis, chronic forgetfulness, time blindness, and losing track of thoughts or objects.'
  },
  ADH: {
    key: 'ADH',
    name: 'Adult ADHD – Hyperactive / Impulsive & Combined Type',
    category: 'Neurodevelopmental',
    doctor: 'rostova',
    color: '#06b6d4',
    icon: '🚀',
    shortDesc: 'An internal "motor" that cannot switch off, mental restlessness, impulsive speech and actions.',
    clinicalOverview: 'Characterized by an internal motor running at full throttle. Manifests as difficulty sitting still, interrupting others before they finish speaking, impulse spending or eating, rapid impatience, and an intolerance for boredom that drives reckless novelty-seeking.'
  },
  OCD: {
    key: 'OCD',
    name: 'Obsessive-Compulsive Spectrum (Intrusive Thoughts & Compulsions)',
    category: 'Anxiety & Autonomic',
    doctor: 'patel',
    color: '#14b8a6',
    icon: '🔄',
    shortDesc: 'Distressing ego-dystonic "what if" thoughts neutralized by repetitive physical or mental rituals.',
    clinicalOverview: 'Characterized by recurrent, distressing, and taboo or fearful intrusive thoughts (obsessions regarding harm, contamination, symmetry, or morality) paired with urgent mental or physical behaviors (compulsions like checking, counting, asking for reassurance) to temporarily relieve anxiety.'
  },
  PTSD: {
    key: 'PTSD',
    name: 'Post-Traumatic Stress & Flashback Re-experiencing',
    category: 'Trauma & Stress',
    doctor: 'vance',
    color: '#a855f7',
    icon: '⚠️',
    shortDesc: 'Intrusive memories, nightmares, hyper-vigilance, and emotional trigger reactivity from past trauma.',
    clinicalOverview: 'Arises following exposure to life-threatening or deeply horrifying single or acute events. The memory of the trauma remains unintegrated in the amygdala and hippocampus, causing involuntary flashbacks, night terrors, physical jumpiness, and avoidance of trauma reminders.'
  },
  CTR: {
    key: 'CTR',
    name: 'Childhood Trauma & Complex Developmental Trauma (C-PTSD / ACEs)',
    category: 'Trauma & Stress',
    doctor: 'vance',
    color: '#c084fc',
    icon: '🌱',
    shortDesc: 'Deep-rooted patterns from growing up on eggshells, emotional neglect, parentification, or abuse.',
    clinicalOverview: 'Resulting from chronic, repetitive relational trauma in childhood (e.g., emotional invalidation, volatile caregivers, neglect, perfectionist demands). Leads to deep toxic shame ("there is something fundamentally wrong with me"), chronic hypervigilance, people-pleasing, or profound dissociation.'
  },
  BPD: {
    key: 'BPD',
    name: 'Emotional Dysregulation & Attachment Sensitivity',
    category: 'Personality & Temperament',
    doctor: 'lin',
    color: '#e11d48',
    icon: '🌊',
    shortDesc: 'Intense emotional storm surges, chronic fear of abandonment, and identity instability.',
    clinicalOverview: 'Marked by extreme emotional reactivity and a slow return to baseline. Minor interpersonal shifts can trigger overwhelming agony or terror of abandonment, resulting in unstable relationship dynamics (idealizing then feeling deeply hurt), chronic inner emptiness, and impulsive reactions.'
  },
  INT: {
    key: 'INT',
    name: 'Temperament Profile: High Introversion & Sensory Sensitivity',
    category: 'Personality & Temperament',
    doctor: 'lin',
    color: '#10b981',
    icon: '🌿',
    shortDesc: 'A sensitive, healthy nervous system that recharges in quiet solitude (NOT a medical disorder).',
    clinicalOverview: 'A natural, healthy neuro-temperament. Individuals with high introversion and sensory sensitivity have a deeply reflective inner world. Their nervous system processes stimuli deeply, meaning noisy environments and large groups deplete their energy battery quickly. This is NOT an illness or social phobia.'
  },
  INS: {
    key: 'INS',
    name: 'Sleep Architecture & Circadian Disruption',
    category: 'Somatic & Regulatory',
    doctor: 'jenkins',
    color: '#64748b',
    icon: '🌙',
    shortDesc: 'Sleep onset delay, midnight awakening, unrefreshing sleep, and inverted circadian clocks.',
    clinicalOverview: 'Chronic impairment in the restorative quality or duration of sleep. Includes racing thoughts preventing sleep onset, nocturnal waking with adrenaline spikes, delayed sleep phase syndrome (night owl wiring), and morning exhaustion that severely degrades emotional resilience.'
  },
  BUR: {
    key: 'BUR',
    name: 'Allostatic Overload & Autonomic Nervous System Burnout',
    category: 'Somatic & Regulatory',
    doctor: 'rostova',
    color: '#d97706',
    icon: '🔋',
    shortDesc: 'Total neuro-endocrine exhaustion from prolonged survival mode, masking, and chronic stress.',
    clinicalOverview: 'A state of total autonomic and emotional depletion resulting from prolonged unmanaged chronic stress, masking neurodivergence, or prolonged survival mode. Differs from simple fatigue: the body feels drained of all cellular energy, memory degrades, and even minor tasks feel monumental.'
  }
};

// Reusable scale options
const SCALE_FREQUENCY_SIMPLE = [
  { text: 'Never or rarely', value: 0 },
  { text: 'Sometimes (1-2 days a week)', value: 1 },
  { text: 'Often (most days)', value: 2 },
  { text: 'Almost constantly / every single day', value: 3 }
];

const SCALE_AGREE_SIMPLE = [
  { text: 'Not like me at all', value: 0 },
  { text: 'Somewhat like me', value: 1 },
  { text: 'Very much like me', value: 2 },
  { text: 'Exactly how I feel / 100% true', value: 3 }
];

const SCALE_SEVERITY_SIMPLE = [
  { text: 'None / Minimal', value: 0 },
  { text: 'Mild (manageable inconvenience)', value: 1 },
  { text: 'Moderate (causes real distress or struggle)', value: 2 },
  { text: 'Severe (overwhelming, disrupts my daily life)', value: 3 }
];

// Comprehensive 50+ in-depth clinical question bank
const QUESTIONS = [
  // SECTION 1: MOOD, PLEASURE & VITALITY (Dr. Jenkins)
  {
    id: 1,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "I want to start by looking at how your brain processes joy and vitality right now.",
    text: "When you try to do things you used to enjoy (like hobbies, music, video games, or seeing friends), how does it feel?",
    options: [
      { text: "I still feel genuine joy and interest just like normal.", value: 0 },
      { text: "I enjoy them slightly less, but can still have good moments.", value: 1 },
      { text: "It feels forced or muted — like the color has been drained out of them.", value: 2 },
      { text: "Total emotional numbness; absolutely nothing sparks pleasure or interest anymore.", value: 3 }
    ],
    weights: { DEP: 1.0, DYS: 0.6, BUR: 0.5 }
  },
  {
    id: 2,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Let's distinguish between temporary tiredness and chronic low-grade fog.",
    text: "Looking back over the last few years, how long has a low mood, sadness, or lack of excitement been your 'normal' baseline?",
    options: [
      { text: "Only recently, or rarely happens.", value: 0 },
      { text: "It comes in waves of a few weeks or months, then clears up.", value: 1 },
      { text: "It has been my steady baseline for at least 1 to 2 years straight.", value: 2 },
      { text: "For as long as I can remember — I can barely recall what genuine happiness feels like.", value: 3 }
    ],
    weights: { DYS: 1.0, DEP: 0.5 }
  },
  {
    id: 3,
    doctor: 'jenkins',
    type: 'scenario',
    doctorNote: "Read these four daily experiences. Pick the one that sounds closest to your typical morning.",
    text: "How does your body and mind typically feel in the first hour after waking up?",
    options: [
      {
        label: "Functional Reset",
        text: "I wake up reasonably refreshed, ready to get on with my day.",
        value: 0
      },
      {
        label: "Dopamine Search",
        text: "My body is awake, but my brain feels foggy until I get immediate stimulation (phone, caffeine, social media).",
        value: 1,
        weights: { ADI: 0.8, INS: 0.4 }
      },
      {
        label: "Dread & Heart Pound",
        text: "My eyes open and an immediate wave of anxiety, dread, or racing stomach hits me before I even get out of bed.",
        value: 2,
        weights: { GAD: 1.0, PAN: 0.5, BUR: 0.4 }
      },
      {
        label: "The Wet Concrete Blanket",
        text: "My limbs feel physically heavy, like lead. Getting out of bed feels like a mountain, and I wonder what the point of today is.",
        value: 3,
        weights: { DEP: 1.0, DYS: 0.8, BUR: 0.6 }
      }
    ]
  },
  {
    id: 4,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Self-worth is a key indicator of underlying affective distress.",
    text: "How often do you hear an internal voice whispering that you are a failure, broken, or a disappointment to those who care about you?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { DEP: 1.0, DYS: 0.7, CTR: 0.5 }
  },
  {
    id: 5,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "I'm checking for signs of manic or hypomanic surges in your brain's chemistry.",
    text: "Have you ever experienced days where you felt unusually euphoric, invincible, or wired with electric energy, needing only 3-4 hours of sleep without feeling tired?",
    options: [
      { text: "Never — when I'm energetic, it's just a normal good day.", value: 0 },
      { text: "Maybe once or twice, but very briefly.", value: 1 },
      { text: "Yes, I get distinct multi-day phases where my thoughts race, I talk fast, and feel unstoppable.", value: 2 },
      { text: "Definitely — and during these phases I made rash decisions (excessive spending, wild plans) that I later regretted.", value: 3 }
    ],
    weights: { BIP: 1.0 }
  },

  // SECTION 2: ATTENTION, FOCUS & EXECUTIVE FUNCTION (Dr. Rostova)
  {
    id: 6,
    doctor: 'rostova',
    type: 'single',
    doctorNote: "Hi, I'm Dr. Rostova. Let's talk about how your brain initiates and executes tasks.",
    text: "When you have an important task to do, do you experience 'executive paralysis' — where you are screaming at yourself internally to start, but your body physically won't move?",
    options: [
      { text: "No, if something is important, I can sit down and get it done.", value: 0 },
      { text: "Occasionally with boring chores, but nothing out of the ordinary.", value: 1 },
      { text: "Frequently. I waste hours in guilt and anxiety wishing I could just start.", value: 2 },
      { text: "Almost every single day. Starting tasks feels like pushing through a solid brick wall.", value: 3 }
    ],
    weights: { ADI: 1.0, BUR: 0.4 }
  },
  {
    id: 7,
    doctor: 'rostova',
    type: 'multi',
    doctorNote: "Select any of these common executive function quirks that occur frequently in your daily life:",
    text: "Which of the following daily struggles apply to you? (Check all that resonate)",
    options: [
      { text: "Losing everyday items (keys, phone, glasses, wallet) multiple times a week", weight: { ADI: 0.7 } },
      { text: "Starting 5 different projects or chores at once and finishing none of them", weight: { ADI: 0.8, ADH: 0.5 } },
      { text: "Having 30+ browser tabs or unfinished documents open because 'I might need them'", weight: { ADI: 0.6 } },
      { text: "'Time blindness' — chronically underestimating how long tasks take or being perpetually late", weight: { ADI: 0.8 } },
      { text: "Hyperfocus: Getting so locked into an interesting topic that you forget to eat, drink, or use the restroom", weight: { ADI: 0.8, ADH: 0.6 } },
      { text: "Needing background noise, podcasts, or music just to do simple chores like dishes", weight: { ADI: 0.6, ADH: 0.5 } }
    ]
  },
  {
    id: 8,
    doctor: 'rostova',
    type: 'single',
    doctorNote: "Let's look at mental and physical hyperactivity or restlessness.",
    text: "Does it feel like there is an internal motor inside your mind or body that refuses to idle or turn off?",
    options: [
      { text: "No, I can easily sit quietly and relax without restlessness.", value: 0 },
      { text: "Only when I have had too much caffeine or I'm anxious.", value: 1 },
      { text: "Yes, my brain is constantly jumping tracks, or I find myself fidgeting, tapping, or moving.", value: 2 },
      { text: "Constantly. Doing nothing feels physically uncomfortable or infuriating.", value: 3 }
    ],
    weights: { ADH: 1.0, GAD: 0.4 }
  },
  {
    id: 9,
    doctor: 'rostova',
    type: 'single',
    doctorNote: "Impulsive communication is a hallmark of dopamine dysregulation.",
    text: "In conversations or meetings, do you frequently interrupt people, finish their sentences for them, or blurt out answers before they finish asking?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { ADH: 1.0 }
  },
  {
    id: 10,
    doctor: 'rostova',
    type: 'scenario',
    doctorNote: "Which scenario best captures your experience when reading a book or listening to someone talk?",
    text: "When you try to listen in a meeting, class, or read a long paragraph:",
    options: [
      {
        label: "Normal Processing",
        text: "I absorb the information with normal effort, retaining the main ideas.",
        value: 0
      },
      {
        label: "Silent Zone-Out",
        text: "My eyes read the entire page or my head nods, but five minutes later I realize my brain absorbed zero words.",
        value: 2,
        weights: { ADI: 1.0, BUR: 0.3 }
      },
      {
        label: "Thought Hijack",
        text: "A single word triggers an unrelated thought rabbit hole, and I disappear into a daydream without meaning to.",
        value: 2,
        weights: { ADI: 0.9, ADH: 0.4 }
      },
      {
        label: "Severe Agitation",
        text: "The person talks too slowly for my brain; I feel physically impatient and itch to skip ahead.",
        value: 3,
        weights: { ADH: 1.0, ADI: 0.5 }
      }
    ]
  },

  // SECTION 3: CHILDHOOD TRAUMA & EARLY LIFE HISTORY (Dr. Vance)
  {
    id: 11,
    doctor: 'vance',
    type: 'single',
    doctorNote: "Hello, I'm Dr. Vance. In psychiatry, we know that many adult struggles are survival mechanisms learned in childhood.",
    text: "Growing up in your home, did you feel like you were constantly 'walking on eggshells' around a parent or caregiver's explosive temper or unpredictable moods?",
    options: [
      { text: "Not at all — my childhood home felt emotionally safe and predictable.", value: 0 },
      { text: "Occasionally during stressful family arguments.", value: 1 },
      { text: "Frequently. I had to monitor everyone's tone of voice and footsteps to stay safe.", value: 2 },
      { text: "Constantly. The atmosphere was a volatile minefield where anything could set off chaos.", value: 3 }
    ],
    weights: { CTR: 1.0, PTSD: 0.6, GAD: 0.5, BPD: 0.5 }
  },
  {
    id: 12,
    doctor: 'vance',
    type: 'multi',
    doctorNote: "These questions refer to your experiences before the age of 18 (Adverse Childhood Experiences). Select all that occurred:",
    text: "During your childhood or teenage years, did you experience any of the following? (Select all that apply)",
    options: [
      { text: "Emotional neglect: Feeling unseen, ignored, or that your emotional needs didn't matter to anyone", weight: { CTR: 0.9, DYS: 0.4 } },
      { text: "Parentification: Having to act like the responsible 'adult' or emotional therapist for your parents", weight: { CTR: 0.8, GAD: 0.5 } },
      { text: "Humiliation / Shaming: Being repeatedly called stupid, lazy, worthless, or a burden by caregivers", weight: { CTR: 1.0, DEP: 0.5 } },
      { text: "Physical threat or violence in the household (witnessed or experienced)", weight: { CTR: 1.0, PTSD: 0.7 } },
      { text: "Substance abuse or severe unmanaged mental illness in a primary caregiver", weight: { CTR: 0.8, GAD: 0.4 } },
      { text: "Severe school bullying or peer ostracism that made you feel unsafe outside home", weight: { CTR: 0.7, SAD: 0.7 } }
    ]
  },
  {
    id: 13,
    doctor: 'vance',
    type: 'single',
    doctorNote: "Let's explore the core belief that often stems from early trauma.",
    text: "Do you carry a persistent, deep-seated sensation that you are somehow 'fundamentally flawed,' defective, or that nobody would love you if they saw the real you?",
    options: SCALE_AGREE_SIMPLE,
    weights: { CTR: 1.0, BPD: 0.6, DEP: 0.6 }
  },
  {
    id: 14,
    doctor: 'vance',
    type: 'single',
    doctorNote: "Trauma changes how our autonomic nervous system perceives danger.",
    text: "How often do you find yourself 'hyper-vigilant' — sitting with your back to the wall, constantly scanning rooms, or getting startled easily by sudden noises?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { PTSD: 1.0, CTR: 0.8, GAD: 0.5 }
  },
  {
    id: 15,
    doctor: 'vance',
    type: 'single',
    doctorNote: "Trauma triggers can pull past events into the present.",
    text: "Do you experience moments where a sight, smell, tone of voice, or argument throws your body back into a past terrifying experience (flashbacks or sudden panic)?",
    options: SCALE_SEVERITY_SIMPLE,
    weights: { PTSD: 1.0, CTR: 0.7 }
  },

  // SECTION 4: TEMPERAMENT: INTROVERSION VS SOCIAL PHOBIA (Dr. Lin)
  {
    id: 16,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Hello, I'm Dr. Lin. It is vital we don't confuse natural Introversion with Social Anxiety. Let's look at your social battery.",
    text: "After spending several hours socializing at a party, gathering, or busy office, what happens to your internal energy?",
    options: [
      { text: "I feel energized, buzzing, and ready to keep socializing (Extravert trait).", value: 0 },
      { text: "I feel pleasantly tired, but can easily keep hanging out.", value: 1 },
      { text: "My battery is completely drained; I desperately need quiet solitude to recharge (Classic Introvert).", value: 3, weights: { INT: 1.0 } },
      { text: "I leave feeling exhausted and obsessively replay everything I said, worrying people hated me (Social Anxiety).", value: 3, weights: { SAD: 1.0, INT: 0.5 } }
    ]
  },
  {
    id: 17,
    doctor: 'lin',
    type: 'scenario',
    doctorNote: "Imagine it's Friday night. You had plans with friends, but they just texted to cancel. What is your genuine, private reaction?",
    text: "How do you feel when social plans get cancelled at the last second?",
    options: [
      {
        label: "Disappointed",
        text: "I feel sad or bored; I genuinely wanted to be out around people.",
        value: 0
      },
      {
        label: "Pure Sweet Relief",
        text: "Deep secret joy! I can put on comfy clothes, read, play games, or be alone without feeling guilty (Healthy Introversion).",
        value: 3,
        weights: { INT: 1.0 }
      },
      {
        label: "Anxious Rejection",
        text: "I immediately spiral: 'Did I do something wrong? Do they secretly dislike me? Are they hanging out without me?'",
        value: 3,
        weights: { SAD: 0.9, BPD: 0.6 }
      },
      {
        label: "Exhausted Apathy",
        text: "I was too exhausted to go anyway, but I don't feel joy being home either — just hollow fatigue.",
        value: 2,
        weights: { DEP: 0.7, BUR: 0.7 }
      }
    ]
  },
  {
    id: 18,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Let's isolate Social Anxiety Disorder from introversion.",
    text: "When you have to make a phone call, speak in a meeting, or order food, do you experience intense anticipatory dread of embarrassing yourself or sounding foolish?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { SAD: 1.0, GAD: 0.4 }
  },
  {
    id: 19,
    doctor: 'lin',
    type: 'multi',
    doctorNote: "High Sensory Processing Sensitivity (HSP) is a distinct biological trait often found in introverts. Select what applies:",
    text: "Do you experience heightened sensitivity to your physical environment? (Select all that resonate)",
    options: [
      { text: "Bright fluorescent lights, loud sirens, or crowded supermarkets feel physically draining or painful", weight: { INT: 0.9, BUR: 0.4 } },
      { text: "Scratchy clothing tags, uncomfortable fabrics, or subtle background sounds drive you crazy", weight: { INT: 0.8, ADI: 0.4 } },
      { text: "Strong emotional empathy: absorbing other people's negative moods like an emotional sponge", weight: { INT: 0.9, BPD: 0.4 } },
      { text: "Needing low-lit, quiet spaces to 'decompress' after being in public for even a couple hours", weight: { INT: 1.0 } }
    ]
  },
  {
    id: 20,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Let's examine how you experience solitude.",
    text: "Do you genuinely love being alone with your thoughts, books, games, and creative projects, feeling peaceful and content during solitude?",
    options: [
      { text: "No, being alone makes me feel restless, lonely, or bored.", value: 0 },
      { text: "Sometimes, but I prefer company most of the time.", value: 1 },
      { text: "Yes, solitude is where I feel most creative, grounded, and at home.", value: 3, weights: { INT: 1.0 } },
      { text: "I isolate, but NOT because I enjoy it — I isolate out of fear of people or sheer exhaustion.", value: 3, weights: { SAD: 0.8, DEP: 0.7 } }
    ]
  },

  // SECTION 5: ANXIETY, PANIC & SOMATICS (Dr. Patel)
  {
    id: 21,
    doctor: 'patel',
    type: 'single',
    doctorNote: "Hello, I'm Dr. Patel. Let's look at your autonomic nervous system and panic circuitry.",
    text: "Do you experience sudden, terrifying surges of adrenaline where your heart pounds, you feel dizzy or out of breath, and feel like you might faint, die, or go crazy?",
    options: [
      { text: "Never had an experience like that.", value: 0 },
      { text: "Once or twice during an extreme life crisis.", value: 1 },
      { text: "Yes, occasionally, and they seem to hit out of the blue without a clear reason.", value: 2, weights: { PAN: 0.8 } },
      { text: "Frequently, and I live in constant dread of when the next attack will strike.", value: 3, weights: { PAN: 1.0 } }
    ]
  },
  {
    id: 22,
    doctor: 'patel',
    type: 'multi',
    doctorNote: "Anxiety is intensely physical. Select all the physical sensations you regularly experience when anxious:",
    text: "Which somatic (physical) symptoms regularly accompany your stress? (Check all that apply)",
    options: [
      { text: "Clenched jaw, tight shoulders, or chronic tension headaches", weight: { GAD: 0.8, BUR: 0.4 } },
      { text: "Digestive issues: nervous stomach, IBS, nausea, or loss of appetite", weight: { GAD: 0.8, PAN: 0.4 } },
      { text: "Shallow breathing or the feeling that you cannot take a full, satisfying deep breath", weight: { GAD: 0.7, PAN: 0.7 } },
      { text: "Cold, clammy hands, tremors, or tingling sensations in fingers/face", weight: { PAN: 0.9, GAD: 0.5 } },
      { text: "Feeling detached from your body, like looking at yourself from above (depersonalization)", weight: { PAN: 0.8, PTSD: 0.7, CTR: 0.5 } }
    ]
  },
  {
    id: 23,
    doctor: 'patel',
    type: 'single',
    doctorNote: "Chronic worry operates like a loop that never resolves.",
    text: "When you try to relax or fall asleep, does your brain instantly begin generating 'What if this goes wrong?' catastrophic scenarios?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { GAD: 1.0, INS: 0.5 }
  },
  {
    id: 24,
    doctor: 'patel',
    type: 'single',
    doctorNote: "Agoraphobia is often an adaptation to panic symptoms.",
    text: "Have you started avoiding malls, public transit, highways, crowds, or leaving home alone because you worry you might panic and not be able to escape?",
    options: SCALE_SEVERITY_SIMPLE,
    weights: { PAN: 1.0, SAD: 0.4 }
  },
  {
    id: 25,
    doctor: 'patel',
    type: 'single',
    doctorNote: "Let's explore intrusive thoughts and OCD mechanisms.",
    text: "Do you suffer from unwanted, horrifying, or taboo thoughts entering your mind that make you feel like a bad or dangerous person, even though you would never act on them?",
    options: [
      { text: "No, my thoughts are typical worries.", value: 0 },
      { text: "Rarely, but I can brush them off.", value: 1 },
      { text: "Yes, they distress me deeply and I have to mentally argue against them to feel clean/safe.", value: 2, weights: { OCD: 0.8, GAD: 0.4 } },
      { text: "Constantly. They torment me, and I perform mental or physical rituals to cancel them out.", value: 3, weights: { OCD: 1.0 } }
    ]
  },
  {
    id: 26,
    doctor: 'patel',
    type: 'multi',
    doctorNote: "Compulsions can be physical or entirely mental. Select any habits you find yourself compelled to perform:",
    text: "Do you repeatedly do any of the following to quiet your anxiety? (Select all that apply)",
    options: [
      { text: "Repeatedly checking door locks, appliances, stove knobs, or car locks multiple times", weight: { OCD: 0.9 } },
      { text: "Needing things to be arranged in exact symmetry or order, feeling distressed if touched", weight: { OCD: 0.8 } },
      { text: "Mental checking: compulsively reviewing past conversations over and over to prove you didn't do something wrong", weight: { OCD: 0.9, GAD: 0.5 } },
      { text: "Seeking constant reassurance from loved ones: 'Are you sure everything is okay? Are you mad at me?'", weight: { OCD: 0.7, BPD: 0.6, CTR: 0.5 } },
      { text: "Compulsive hand washing, sanitizing, or extreme avoidance of shared items due to contamination fears", weight: { OCD: 1.0 } }
    ]
  },

  // SECTION 6: EMOTIONAL REGULATION & ATTACHMENT (Dr. Lin & Dr. Vance)
  {
    id: 27,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Let's look at how quickly your emotional temperature shifts.",
    text: "Do your emotions feel like a high-speed rollercoaster — where you can go from completely fine to devastated, furious, or despairing in minutes over a subtle trigger?",
    options: SCALE_AGREE_SIMPLE,
    weights: { BPD: 1.0, BIP: 0.4, CTR: 0.5 }
  },
  {
    id: 28,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Attachment panic is very distinct from generalized worry.",
    text: "If a close friend or partner takes longer than usual to text back or seems slightly distant, what happens inside you?",
    options: [
      { text: "I assume they are busy and go about my day.", value: 0 },
      { text: "I notice it, but it doesn't ruin my mood.", value: 1 },
      { text: "A pit of dread opens in my stomach — I assume they are pulling away or getting tired of me.", value: 2, weights: { BPD: 0.8, SAD: 0.4, CTR: 0.6 } },
      { text: "Full emotional panic. I either bombard them with texts, or withdraw coldly to reject them before they reject me.", value: 3, weights: { BPD: 1.0, CTR: 0.7 } }
    ]
  },
  {
    id: 29,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Identity stability is a cornerstone of psychological well-being.",
    text: "Do you often feel like a chameleon with no solid core identity — changing your personality, goals, opinions, or style depending on who you are around?",
    options: SCALE_AGREE_SIMPLE,
    weights: { BPD: 0.9, CTR: 0.7, ADI: 0.3 }
  },
  {
    id: 30,
    doctor: 'vance',
    type: 'single',
    doctorNote: "People-pleasing is often a fawning defense mechanism developed in early life.",
    text: "Do you find it nearly impossible to say 'No' to others, taking on tasks you hate because the thought of someone being upset with you feels terrifying?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { CTR: 0.9, SAD: 0.6, BPD: 0.5 }
  },

  // SECTION 7: SLEEP & NERVOUS SYSTEM RECOVERY (Dr. Jenkins)
  {
    id: 31,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Let's examine your sleep architecture and circadian rhythm.",
    text: "When you lay down to sleep at night, how long does it typically take for your mind and body to actually drift off?",
    options: [
      { text: "15 to 30 minutes — pretty standard and peaceful.", value: 0 },
      { text: "30 to 60 minutes of light tossing and turning.", value: 1 },
      { text: "1 to 2+ hours: my brain suddenly comes alive with racing thoughts, ideas, or anxiety.", value: 2, weights: { INS: 0.9, ADI: 0.5, GAD: 0.5 } },
      { text: "Severe insomnia: I lie awake for hours or need sleep aids, feeling exhausted yet wired.", value: 3, weights: { INS: 1.0, DEP: 0.4 } }
    ]
  },
  {
    id: 32,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Circadian delay is very common in neurodivergent and stressed individuals.",
    text: "Does your internal biological clock feel naturally shifted — feeling sluggish all day, only to become sharp, creative, and alert after 10:00 PM or midnight?",
    options: SCALE_AGREE_SIMPLE,
    weights: { INS: 0.8, ADI: 0.7, ADH: 0.6 }
  },
  {
    id: 33,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Nighttime awakenings can indicate hyperarousal or cortisol spikes.",
    text: "Do you regularly jolt awake in the middle of the night (like 3:00 or 4:00 AM) with a racing heart or instant anxiety, unable to get back to sleep?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { INS: 0.9, GAD: 0.6, DEP: 0.6 }
  },

  // SECTION 8: BURNOUT & SURVIVAL EXHAUSTION (Dr. Rostova)
  {
    id: 34,
    doctor: 'rostova',
    type: 'scale',
    doctorNote: "On this sliding scale from 0 to 10, let's measure your current level of exhaustion.",
    text: "How exhausted is your nervous system right now? (0 = Full of energy, 10 = Completely burned out at a cellular level)",
    min: 0,
    max: 10,
    minLabel: 'Energized & resilient',
    maxLabel: 'Totally burned out',
    weights: { BUR: 1.0, DEP: 0.5 }
  },
  {
    id: 35,
    doctor: 'rostova',
    type: 'single',
    doctorNote: "Masking is the exhausting effort of hiding your true struggles to appear 'normal.'",
    text: "Do you spend massive amounts of energy 'masking' around others — forcing smiles, pretending to be organized and calm, only to collapse in total fatigue the moment you're alone?",
    options: SCALE_AGREE_SIMPLE,
    weights: { BUR: 0.9, ADI: 0.7, INT: 0.6, CTR: 0.5 }
  },
  {
    id: 36,
    doctor: 'rostova',
    type: 'multi',
    doctorNote: "When burnout sets in, everyday basic tasks suddenly feel like climbing Everest. Check what you struggle with:",
    text: "Which of these basic daily self-care tasks have felt overwhelmingly hard lately? (Select all that apply)",
    options: [
      { text: "Brushing teeth or taking a shower on a regular routine", weight: { BUR: 0.8, DEP: 0.8, ADI: 0.5 } },
      { text: "Replying to simple text messages or emails from friends and family", weight: { BUR: 0.9, ADI: 0.7, SAD: 0.5 } },
      { text: "Cooking a meal or remembering to eat nutritious food", weight: { BUR: 0.7, ADI: 0.6, DEP: 0.5 } },
      { text: "Opening mail or taking care of bills and paperwork", weight: { BUR: 0.8, ADI: 0.8 } },
      { text: "Folding laundry or cleaning up clutter in your living space", weight: { BUR: 0.7, ADI: 0.7 } }
    ]
  },

  // SECTION 9: DEEP CLINICAL DIFFERENTIATION ITEMS
  {
    id: 37,
    doctor: 'vance',
    type: 'single',
    doctorNote: "I want to ask about physical freeze or shut-down responses under stress.",
    text: "When a conflict, loud argument, or high-stress confrontation happens, what is your body's automatic reaction?",
    options: [
      { text: "I can stand my ground, speak calmly, and resolve it.", value: 0 },
      { text: "I get angry and argue back vigorously.", value: 1, weights: { BPD: 0.4, ADH: 0.3 } },
      { text: "My brain goes blank, I freeze, and I physically cannot speak or defend myself (Dorsal Vagal Freeze).", value: 3, weights: { CTR: 1.0, PTSD: 0.7, SAD: 0.5 } },
      { text: "I immediately apologize, agree with everything, and try to soothe the other person at my own expense (Fawning).", value: 3, weights: { CTR: 1.0, BPD: 0.5 } }
    ]
  },
  {
    id: 38,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Bipolar depression often looks different from unipolar depression. Let's check for 'lead-like' fatigue.",
    text: "During your lowest periods, do your arms and legs feel so heavy it feels like you're carrying sandbags, and do you sleep 12-14 hours a day yet still feel groggy?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { BIP: 0.8, DEP: 0.7 }
  },
  {
    id: 39,
    doctor: 'patel',
    type: 'single',
    doctorNote: "Let's check how you handle uncertainty.",
    text: "How much distress does 'not knowing for sure' cause you? (e.g., waiting for test results, ambiguous text messages, waiting for answers)",
    options: [
      { text: "Mild curiosity, but I can easily wait.", value: 0 },
      { text: "Moderate annoyance, but tolerable.", value: 1 },
      { text: "High anxiety — my mind assumes the worst possible outcome has already occurred.", value: 2, weights: { GAD: 0.9, OCD: 0.5 } },
      { text: "Agonizing, unbearable torture. I must get certainty immediately or I cannot function.", value: 3, weights: { OCD: 1.0, GAD: 0.8, BPD: 0.5 } }
    ]
  },
  {
    id: 40,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Distinguishing healthy solitude from painful loneliness.",
    text: "When you are by yourself on a quiet evening, how do you feel most of the time?",
    options: [
      { text: "Peaceful, cozy, creative, and fully recharged (High Introversion).", value: 3, weights: { INT: 1.0 } },
      { text: "Restless and bored — I want to be around people.", value: 0 },
      { text: "Paralyzed by an aching, terrifying sense of empty loneliness and abandonment.", value: 3, weights: { BPD: 1.0, DEP: 0.7, CTR: 0.5 } },
      { text: "Safe from judgment, but sad that I can't connect with people easily.", value: 2, weights: { SAD: 0.9, INT: 0.4 } }
    ]
  },
  {
    id: 41,
    doctor: 'rostova',
    type: 'single',
    doctorNote: "Sensory overwhelm vs ADHD focus breaks.",
    text: "In a busy coffee shop or crowded room, can you filter out background voices, or does your brain force you to hear every single conversation at equal volume?",
    options: [
      { text: "I can filter out noise easily with no problem.", value: 0 },
      { text: "A little distracting, but manageable with effort.", value: 1 },
      { text: "My brain has zero audio filter — every voice, fork clatter, and hum hits my brain simultaneously.", value: 3, weights: { ADI: 0.9, INT: 0.7 } },
      { text: "It overwhelms my nervous system so intensely that I feel irritable, panicked, or need to run away.", value: 3, weights: { INT: 0.9, BUR: 0.6, PAN: 0.4 } }
    ]
  },
  {
    id: 42,
    doctor: 'vance',
    type: 'single',
    doctorNote: "Rejection Sensitivity Dysphoria (RSD) is intensely painful and common in ADHD and trauma.",
    text: "When someone offers you mild criticism or seems dissatisfied with your work, do you experience a visceral, physical pain in your chest, feeling like your entire world collapsed?",
    options: SCALE_AGREE_SIMPLE,
    weights: { ADI: 0.9, BPD: 0.7, CTR: 0.7, SAD: 0.6 }
  },
  {
    id: 43,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Cognitive speed during mood shifts.",
    text: "Have you ever experienced episodes where your thoughts were firing so rapidly that you couldn't get words out fast enough, jumping from one brilliant idea to another?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { BIP: 1.0, ADH: 0.4 }
  },
  {
    id: 44,
    doctor: 'patel',
    type: 'single',
    doctorNote: "Checking somatic hyper-awareness.",
    text: "Do you constantly check or monitor your own pulse, heart rhythm, breathing rate, or swallowing, terrified that something is about to fail inside your body?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { PAN: 1.0, GAD: 0.7, OCD: 0.6 }
  },
  {
    id: 45,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Relationship splitting and rapid idealization/devaluation.",
    text: "Do you find that your opinion of close friends or partners can flip overnight — viewing them as an angel one day, and as a cruel or untrustworthy enemy the next?",
    options: SCALE_AGREE_SIMPLE,
    weights: { BPD: 1.0, CTR: 0.5 }
  },
  {
    id: 46,
    doctor: 'vance',
    type: 'single',
    doctorNote: "Childhood safety foundations.",
    text: "When you were a child, if you were crying or terrified, was there an adult who held you, comforted you, and made you feel safe?",
    options: [
      { text: "Yes, consistently — my caregivers were warm and dependable.", value: 0 },
      { text: "Most of the time, yes.", value: 0 },
      { text: "Rarely — I usually had to cry alone in my room until I stopped.", value: 2, weights: { CTR: 0.8, DYS: 0.4 } },
      { text: "Never. Crying was met with punishment, mockery, or anger ('I will give you something to cry about').", value: 3, weights: { CTR: 1.0, PTSD: 0.6, BPD: 0.5 } }
    ]
  },
  {
    id: 47,
    doctor: 'rostova',
    type: 'single',
    doctorNote: "Boredom intolerance.",
    text: "Does feeling bored feel almost physically painful or intolerable to you, driving you to do something impulsive or seek intense dopamine?",
    options: SCALE_AGREE_SIMPLE,
    weights: { ADH: 1.0, ADI: 0.7 }
  },
  {
    id: 48,
    doctor: 'jenkins',
    type: 'single',
    doctorNote: "Existential weight and despair.",
    text: "In the past few weeks, have you had thoughts that people in your life would be better off without you, or that you just wish you could go to sleep and never wake up?",
    options: [
      { text: "Not at all.", value: 0 },
      { text: "A fleeting thought during an overwhelming moment, but no desire to act on it.", value: 1, weights: { DEP: 0.5, BUR: 0.4 } },
      { text: "Yes, these thoughts visit me frequently and feel heavy.", value: 2, weights: { DEP: 0.9, DYS: 0.6, BPD: 0.5 } },
      { text: "Very frequently, with deep despair or feeling trapped.", value: 3, weights: { DEP: 1.0, BPD: 0.8 } }
    ]
  },
  {
    id: 49,
    doctor: 'patel',
    type: 'single',
    doctorNote: "Post-event ruminations in social contexts.",
    text: "After leaving a social interaction, do you spend hours or days conducting a 'post-mortem' in your head, cringing over every word you said or silence you kept?",
    options: SCALE_FREQUENCY_SIMPLE,
    weights: { SAD: 1.0, OCD: 0.4, GAD: 0.4 }
  },
  {
    id: 50,
    doctor: 'lin',
    type: 'single',
    doctorNote: "Sensory recharge necessity.",
    text: "If you do not get adequate quiet alone time for a few days, do you become irritable, prone to crying spells, or experience a mental shutdown?",
    options: SCALE_AGREE_SIMPLE,
    weights: { INT: 1.0, BUR: 0.7 }
  }
];

// Helper to get questions in clinical sequence or shuffled deterministically
function getPreparedQuestions(seed) {
  const arr = JSON.parse(JSON.stringify(QUESTIONS));
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
