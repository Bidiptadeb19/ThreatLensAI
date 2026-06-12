import tls from "node:tls";
import type { SslIntel } from "@/lib/types";

export async function inspectSsl(url: URL): Promise<SslIntel> {
  if (url.protocol !== "https:") {
    return { hasHttps: false, checked: false };
  }

  return new Promise((resolve) => {
    const socket = tls.connect(
      {
        host: url.hostname,
        port: 443,
        servername: url.hostname,
        rejectUnauthorized: false,
        timeout: Number(process.env.SCAN_TIMEOUT_MS ?? 5000)
      },
      () => {
        const cert = socket.getPeerCertificate();
        const validTo = cert.valid_to ? new Date(cert.valid_to) : undefined;
        const issuer = typeof cert.issuer === "object" ? Object.values(cert.issuer).join(", ") : undefined;
        const authError = socket.authorizationError ? String(socket.authorizationError) : undefined;
        const selfSigned = JSON.stringify(cert.issuer ?? {}) === JSON.stringify(cert.subject ?? {});
        resolve({
          hasHttps: true,
          checked: true,
          issuer,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          expired: validTo ? validTo.getTime() < Date.now() : undefined,
          selfSigned,
          domainMismatch: authError?.includes("ALTNAME"),
          error: authError
        });
        socket.end();
      }
    );

    socket.on("timeout", () => {
      socket.destroy();
      resolve({ hasHttps: true, checked: false, error: "SSL inspection timed out" });
    });
    socket.on("error", (error) => resolve({ hasHttps: true, checked: false, error: error.message }));
  });
}
