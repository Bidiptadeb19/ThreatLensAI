import crypto from "node:crypto";
import { getDnsIntel } from "@/lib/analyzers/dns";
import { getReputationIntel } from "@/lib/analyzers/reputation";
import { followRedirects } from "@/lib/analyzers/redirects";
import { inspectSsl } from "@/lib/analyzers/ssl";
import { extractUrlFeatures } from "@/lib/analyzers/url";
import { explainThreat } from "@/lib/explain";
import { normalizeUrl } from "@/lib/security";
import { scoreThreat } from "@/lib/scoring";
import { saveReport } from "@/lib/storage";
import type { ThreatReport } from "@/lib/types";

export async function scanUrl(inputUrl: string): Promise<ThreatReport> {
  const normalized = normalizeUrl(inputUrl);
  const [{ dns, ipIntel }, redirectData, ssl, reputation] = await Promise.all([
    getDnsIntel(normalized.hostname),
    followRedirects(normalized),
    inspectSsl(normalized),
    getReputationIntel(normalized)
  ]);

  const features = extractUrlFeatures(normalized, redirectData.finalUrl, redirectData.redirects.length - 1);
  const scored = scoreThreat(features, ssl, reputation);
  const aiExplanation = await explainThreat({
    verdict: scored.verdict,
    score: scored.score,
    scoreBreakdown: scored.breakdown,
    features,
    reputation
  });

  const recommendations =
    scored.verdict === "Safe"
      ? ["Verify the address bar before entering credentials.", "Keep this report as a baseline for future comparison."]
      : ["Do not click the link from email or chat.", "Open a security ticket with the exported report.", "Block the domain until reputation checks are complete."];

  const report: ThreatReport = {
    id: crypto.randomUUID(),
    inputUrl,
    normalizedUrl: normalized.href,
    finalUrl: redirectData.finalUrl.href,
    verdict: scored.verdict,
    score: scored.score,
    confidence: aiExplanation.confidence,
    createdAt: new Date().toISOString(),
    features,
    dns,
    ipIntel,
    ssl,
    redirects: redirectData.redirects,
    reputation,
    aiExplanation,
    recommendations,
    scoreBreakdown: scored.breakdown
  };

  await saveReport(report);
  return report;
}
