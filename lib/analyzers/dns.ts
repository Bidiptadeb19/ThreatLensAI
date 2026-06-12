import dns from "node:dns/promises";
import net from "node:net";
import { isPrivateOrReservedIp, resolvePublicAddresses } from "@/lib/security";
import type { DnsIntel, IpIntel } from "@/lib/types";

export async function getDnsIntel(hostname: string): Promise<{ dns: DnsIntel; ipIntel: IpIntel }> {
  const addresses = await resolvePublicAddresses(hostname);
  const [mxRecords, nameServers] = await Promise.all([
    dns.resolveMx(hostname).catch(() => []),
    dns.resolveNs(hostname).catch(() => [])
  ]);
  const uniqueAddresses = [...new Set(addresses.map((record) => record.address))];

  return {
    dns: {
      domain: hostname,
      addresses: uniqueAddresses,
      mxRecords: mxRecords.map((record) => `${record.exchange} (${record.priority})`),
      nameServers,
      blockedPrivateResolution: false
    },
    ipIntel: {
      addresses: uniqueAddresses.map((ip) => ({
        ip,
        version: net.isIPv6(ip) ? 6 : 4,
        isPrivateOrReserved: isPrivateOrReservedIp(ip),
        geo: process.env.ABUSEIPDB_API_KEY ? undefined : "Demo mode: geolocation provider not configured",
        asn: process.env.ABUSEIPDB_API_KEY ? undefined : "Demo mode"
      })),
      multipleIps: uniqueAddresses.length > 1
    }
  };
}
