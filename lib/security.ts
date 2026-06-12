import dns from "node:dns/promises";
import net from "node:net";

const privateV4 = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^0\./,
  /^224\./,
  /^240\./
];

export function normalizeUrl(input: string) {
  const trimmed = input.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs can be scanned.");
  }
  if (!url.hostname || url.username || url.password) {
    throw new Error("URL must include a public host and cannot include credentials.");
  }
  return url;
}

export function isPrivateOrReservedIp(ip: string) {
  if (net.isIPv4(ip)) return privateV4.some((pattern) => pattern.test(ip));
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    return lower === "::1" || lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe80:");
  }
  return false;
}

export function assertSafeHostname(hostname: string) {
  const lower = hostname.toLowerCase();
  if (["localhost", "localhost.localdomain"].includes(lower) || lower.endsWith(".localhost")) {
    throw new Error("Localhost scanning is blocked for SSRF safety.");
  }
  if (net.isIP(hostname) && isPrivateOrReservedIp(hostname)) {
    throw new Error("Private or reserved IP scanning is blocked.");
  }
}

export async function resolvePublicAddresses(hostname: string) {
  assertSafeHostname(hostname);
  const records = await dns.lookup(hostname, { all: true, verbatim: false });
  if (records.some((record) => isPrivateOrReservedIp(record.address))) {
    throw new Error("DNS resolution points to a private or reserved address, so the scan was blocked.");
  }
  return records;
}
