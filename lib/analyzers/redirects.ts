import { normalizeUrl, resolvePublicAddresses } from "@/lib/security";
import type { RedirectHop } from "@/lib/types";

export async function followRedirects(startUrl: URL): Promise<{ finalUrl: URL; redirects: RedirectHop[] }> {
  const maxRedirects = Number(process.env.SCAN_MAX_REDIRECTS ?? 5);
  const timeout = Number(process.env.SCAN_TIMEOUT_MS ?? 5000);
  const redirects: RedirectHop[] = [];
  let current = startUrl;

  for (let index = 0; index <= maxRedirects; index += 1) {
    await resolvePublicAddresses(current.hostname);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(current, {
        method: "HEAD",
        redirect: "manual",
        signal: controller.signal,
        headers: { "user-agent": "ThreatLensAI/1.0 safe-metadata-scanner" }
      });
      const location = response.headers.get("location") ?? undefined;
      redirects.push({ url: current.href, status: response.status, location });
      if (!location || response.status < 300 || response.status > 399) break;
      current = normalizeUrl(new URL(location, current).href);
    } catch {
      redirects.push({ url: current.href, status: 0, location: "Request blocked, timed out, or refused" });
      break;
    } finally {
      clearTimeout(timer);
    }
  }

  return { finalUrl: current, redirects };
}
