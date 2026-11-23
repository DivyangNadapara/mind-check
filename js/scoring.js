// ========================================================
// SCORING & ANALYSIS ENGINE
// Calculates risk levels across all conditions based on answers
// ========================================================

// Thresholds for each condition (percentage of max possible score)
const RISK_THRESHOLDS = {
  low: 0.25,      // Below 25% = low risk
  moderate: 0.45,  // 25-45% = moderate
  high: 0.65,      // 45-65% = high
  veryHigh: 0.80   // Above 80% = very high
};

function calculateResults(answers, questions) {
  // 1. Calculate max possible score per condition
  const maxScores = {};
  const actualScores = {};

  for (const key of Object.keys(CONDITIONS)) {
    maxScores[key] = 0;
    actualScores[key] = 0;
  }

  // Sum up maximum possible and actual scores
  for (const q of questions) {
    const maxOptionValue = Math.max(...q.options.map(o => o.value));
    const userAnswer = answers[q.id];
    const answerValue = (userAnswer !== undefined && userAnswer !== null) ? userAnswer : 0;

    for (const [condition, weight] of Object.entries(q.weights)) {
      maxScores[condition] += maxOptionValue * weight;
      actualScores[condition] += answerValue * weight;
    }
  }

  // 2. Calculate percentages and risk levels
  const results = {};
  for (const key of Object.keys(CONDITIONS)) {
    const percentage = maxScores[key] > 0 ? actualScores[key] / maxScores[key] : 0;
    let riskLevel, riskLabel, riskColor;

    if (percentage < RISK_THRESHOLDS.low) {
      riskLevel = 0;
      riskLabel = 'Minimal';
      riskColor = '#22c55e';
    } else if (percentage < RISK_THRESHOLDS.moderate) {
      riskLevel = 1;
      riskLabel = 'Mild';
      riskColor = '#84cc16';
    } else if (percentage < RISK_THRESHOLDS.high) {
      riskLevel = 2;
      riskLabel = 'Moderate';
      riskColor = '#f59e0b';
    } else if (percentage < RISK_THRESHOLDS.veryHigh) {
      riskLevel = 3;
      riskLabel = 'High';
      riskColor = '#ef4444';
    } else {
      riskLevel = 4;
      riskLabel = 'Very High';
      riskColor = '#dc2626';
    }

    results[key] = {
      condition: CONDITIONS[key],
      key: key,
      rawScore: Math.round(actualScores[key] * 10) / 10,
      maxScore: Math.round(maxScores[key] * 10) / 10,
      percentage: Math.round(percentage * 100),
      riskLevel,
      riskLabel,
      riskColor
    };
  }

  // 3. Sort by severity (highest risk first)
  const sorted = Object.values(results).sort((a, b) => b.percentage - a.percentage);

  // 4. Identify primary concerns (moderate or above)
  const concerns = sorted.filter(r => r.riskLevel >= 2);

  // 5. Generate summary
  let summaryText;
  if (concerns.length === 0) {
    summaryText = "Based on your responses, your scores fall within the minimal to mild range across all areas screened. While this is reassuring, remember that mental health exists on a spectrum and can change over time.";
  } else if (concerns.length <= 2) {
    const names = concerns.map(c => c.condition.name).join(' and ');
    summaryText = `Your responses suggest elevated indicators in the area(s) of ${names}. Consider discussing these patterns with a mental health professional for a thorough evaluation.`;
  } else {
    summaryText = `Your responses indicate elevated scores across multiple areas (${concerns.length} conditions flagged). This pattern suggests it would be particularly valuable to seek a comprehensive evaluation from a qualified mental health professional.`;
  }

  return {
    all: sorted,
    concerns: concerns,
    summary: summaryText,
    totalQuestions: questions.length,
    totalAnswered: Object.keys(answers).length
  };
}

function generateDetailedReport(results) {
  let report = '# Mental Health Screening Report\n\n';
  report += `**Date:** ${new Date().toLocaleDateString()}\n`;
  report += `**Questions Answered:** ${results.totalAnswered} / ${results.totalQuestions}\n\n`;
  report += '---\n\n';
  report += `## Summary\n${results.summary}\n\n`;
  report += '---\n\n';
  report += '## Detailed Results\n\n';

  for (const r of results.all) {
    report += `### ${r.condition.icon} ${r.condition.name}\n`;
    report += `- **Risk Level:** ${r.riskLabel} (${r.percentage}%)\n`;
    report += `- **Score:** ${r.rawScore} / ${r.maxScore}\n`;
    report += `- ${r.condition.description}\n\n`;
  }

  report += '---\n\n';
  report += '> ⚠️ **Important Disclaimer:** This screening tool is for informational purposes only and does NOT constitute a medical or psychological diagnosis. Only a licensed mental health professional can provide an accurate diagnosis. If you are in crisis, please contact a crisis helpline immediately.\n';

  return report;
}
