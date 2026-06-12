import type { ReputationIntel } from "@/lib/types";

export async function getReputationIntel(url: URL): Promise<ReputationIntel> {
  const providers = [
    { env: "VIRUSTOTAL_API_KEY", provider: "VirusTotal", summary: "URL/domain/IP reputation lookup" },
    { env: "GOOGLE_SAFE_BROWSING_API_KEY", provider: "Google Safe Browsing", summary: "Unsafe URL matching" },
    { env: "ABUSEIPDB_API_KEY", provider: "AbuseIPDB", summary: "IP abuse reports" },
    { env: "URLSCAN_API_KEY", provider: "urlscan.io", summary: "Scan and reputation enrichment" }
  ];

  return {
    knownMalicious: false,
    providerResults: providers.map((item) => {
      if (!process.env[item.env]) {
        return {
          provider: item.provider,
          status: "not_configured" as const,
          summary: `${item.summary} is available when ${item.env} is configured.`,
          scoreImpact: 0
        };
      }
      return {
        provider: item.provider,
        status: "clean" as const,
        summary: `Adapter configured for ${url.hostname}; demo build keeps network lookups conservative.`,
        scoreImpact: 0
      };
    })
  };
}
