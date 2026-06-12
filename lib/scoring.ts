import type { ReputationIntel, ScoreBreakdown, SslIntel, UrlFeatures, Verdict } from "@/lib/types";

export function scoreThreat(features: UrlFeatures, ssl: SslIntel, reputation: ReputationIntel) {
  const breakdown: ScoreBreakdown[] = [];
  const add = (label: string, points: number, severity: ScoreBreakdown["severity"]) => {
    if (points > 0) breakdown.push({ label, points, severity });
  };

  add("Known malicious reputation", reputation.knownMalicious ? 50 : 0, "high");
  const maliciousProvider = reputation.providerResults.find((provider) => provider.status === "malicious");
  add("Threat intelligence provider detection", maliciousProvider ? Math.max(40, maliciousProvider.scoreImpact) : 0, "high");
  add("IP address used directly in URL", features.hasIpAddress ? 20 : 0, "medium");
  add("No HTTPS", features.usesHttps ? 0 : 15, "medium");
  add("Suspicious keywords", Math.min(15, features.suspiciousKeywords.length * 5), "medium");
  add("Excessive subdomains", features.subdomainCount >= 3 ? 10 : 0, "medium");
  add("Too many redirects", features.redirectCount >= 3 ? 10 : 0, "medium");
  add("Domain mismatch after redirect", features.finalDomainMismatch ? 20 : 0, "high");
  add("Punycode/homograph risk", features.punycodeDetected ? 15 : 0, "medium");
  add("URL shortener", features.isShortener ? 10 : 0, "medium");
  add("High randomness", features.randomnessScore >= 8 ? 10 : 0, "low");
  add("Expired SSL certificate", ssl.expired ? 15 : 0, "medium");
  add("Self-signed SSL certificate", ssl.selfSigned ? 10 : 0, "medium");

  const score = Math.min(100, breakdown.reduce((sum, item) => sum + item.points, 0));
  const verdict: Verdict = score >= 60 ? "Dangerous" : score >= 30 ? "Suspicious" : "Safe";
  return { score, verdict, breakdown };
}
