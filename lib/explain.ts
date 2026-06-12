import type { AiExplanation, ScoreBreakdown, ThreatReport, Verdict } from "@/lib/types";

function confidenceFor(score: number, evidenceCount: number) {
  return Math.min(95, Math.max(55, 60 + evidenceCount * 6 + Math.abs(score - 50) / 2));
}

export async function explainThreat(partial: {
  verdict: Verdict;
  score: number;
  scoreBreakdown: ScoreBreakdown[];
  features: ThreatReport["features"];
  reputation: ThreatReport["reputation"];
}): Promise<AiExplanation> {
  const topEvidence = partial.scoreBreakdown.slice(0, 5).map((item) => `${item.label} contributed ${item.points} risk points.`);
  const confidence = Math.round(confidenceFor(partial.score, topEvidence.length));

  if (!process.env.OPENAI_API_KEY) {
    const isSafe = partial.verdict === "Safe";
    return {
      summary: isSafe
        ? "ThreatLens found a low-risk URL profile. The address uses expected structure and no high-impact risk signals were detected in demo-mode analysis."
        : `ThreatLens classified this URL as ${partial.verdict.toLowerCase()} because multiple URL, redirect, SSL, or reputation signals increased the risk score.`,
      evidence: topEvidence.length ? topEvidence : ["No major weighted risk factors were detected."],
      userAction: isSafe ? "Proceed normally, while still verifying the page before entering sensitive data." : "Avoid opening the link or entering credentials until a trusted party verifies it.",
      securityTeamAction: isSafe ? "No immediate escalation is needed; keep the report for baseline comparison." : "Review the redirect path, resolved infrastructure, and any matching campaign indicators before allowing access.",
      confidence,
      source: "template"
    };
  }

  return {
    summary: "AI provider configured. This demo build uses the same evidence package and can be extended to call an OpenAI-compatible chat completion endpoint.",
    evidence: topEvidence,
    userAction: partial.verdict === "Dangerous" ? "Do not visit this URL." : "Use caution and verify the destination.",
    securityTeamAction: "Correlate the report with proxy logs, DNS telemetry, and endpoint alerts.",
    confidence,
    source: "ai"
  };
}
