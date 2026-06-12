export type Verdict = "Safe" | "Suspicious" | "Dangerous";

export type UrlFeatures = {
  urlLength: number;
  dotCount: number;
  hyphenCount: number;
  hasIpAddress: boolean;
  suspiciousKeywords: string[];
  usesHttps: boolean;
  punycodeDetected: boolean;
  subdomainCount: number;
  tld: string;
  queryParamCount: number;
  randomnessScore: number;
  isShortener: boolean;
  redirectCount: number;
  finalDomainMismatch: boolean;
};

export type DnsIntel = {
  domain: string;
  addresses: string[];
  mxRecords: string[];
  nameServers: string[];
  blockedPrivateResolution: boolean;
};

export type IpIntel = {
  addresses: Array<{
    ip: string;
    version: 4 | 6;
    isPrivateOrReserved: boolean;
    geo?: string;
    asn?: string;
    abuseScore?: number;
  }>;
  multipleIps: boolean;
};

export type SslIntel = {
  hasHttps: boolean;
  checked: boolean;
  issuer?: string;
  validFrom?: string;
  validTo?: string;
  expired?: boolean;
  selfSigned?: boolean;
  domainMismatch?: boolean;
  error?: string;
};

export type RedirectHop = {
  url: string;
  status: number;
  location?: string;
};

export type ReputationIntel = {
  providerResults: Array<{
    provider: string;
    status: "not_configured" | "clean" | "suspicious" | "malicious" | "error";
    summary: string;
    scoreImpact: number;
  }>;
  knownMalicious: boolean;
};

export type ScoreBreakdown = {
  label: string;
  points: number;
  severity: "low" | "medium" | "high";
};

export type AiExplanation = {
  summary: string;
  evidence: string[];
  userAction: string;
  securityTeamAction: string;
  confidence: number;
  source: "ai" | "template";
};

export type ThreatReport = {
  id: string;
  inputUrl: string;
  normalizedUrl: string;
  finalUrl: string;
  verdict: Verdict;
  score: number;
  confidence: number;
  createdAt: string;
  features: UrlFeatures;
  dns: DnsIntel;
  ipIntel: IpIntel;
  ssl: SslIntel;
  redirects: RedirectHop[];
  reputation: ReputationIntel;
  aiExplanation: AiExplanation;
  recommendations: string[];
  scoreBreakdown: ScoreBreakdown[];
};
