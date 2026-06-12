import net from "node:net";
import type { UrlFeatures } from "@/lib/types";

const suspiciousKeywords = ["login", "verify", "update", "secure", "account", "password", "bank", "wallet", "free", "gift"];
const shorteners = new Set(["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "cutt.ly", "rebrand.ly"]);

function entropy(value: string) {
  if (!value) return 0;
  const chars = [...value];
  const frequencies = chars.reduce<Record<string, number>>((acc, char) => {
    acc[char] = (acc[char] ?? 0) + 1;
    return acc;
  }, {});
  const raw = Object.values(frequencies).reduce((sum, count) => {
    const p = count / chars.length;
    return sum - p * Math.log2(p);
  }, 0);
  return Math.min(10, Math.round((raw / 4.5) * 10));
}

export function extractUrlFeatures(input: URL, finalUrl: URL, redirectCount: number): UrlFeatures {
  const hostParts = input.hostname.split(".");
  const keywordHits = suspiciousKeywords.filter((keyword) => input.href.toLowerCase().includes(keyword));
  const finalHostname = finalUrl.hostname.replace(/^www\./, "");
  const inputHostname = input.hostname.replace(/^www\./, "");

  return {
    urlLength: input.href.length,
    dotCount: (input.href.match(/\./g) ?? []).length,
    hyphenCount: (input.href.match(/-/g) ?? []).length,
    hasIpAddress: Boolean(net.isIP(input.hostname)),
    suspiciousKeywords: keywordHits,
    usesHttps: input.protocol === "https:",
    punycodeDetected: input.hostname.includes("xn--"),
    subdomainCount: Math.max(0, hostParts.length - 2),
    tld: hostParts.at(-1) ?? "",
    queryParamCount: input.searchParams.size,
    randomnessScore: entropy(`${input.hostname}${input.pathname.replace(/\//g, "")}`),
    isShortener: shorteners.has(input.hostname.replace(/^www\./, "").toLowerCase()),
    redirectCount,
    finalDomainMismatch: inputHostname !== finalHostname
  };
}
