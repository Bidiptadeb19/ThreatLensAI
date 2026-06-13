import fs from "node:fs/promises";
import path from "node:path";
import type { ThreatReport } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const reportsFile = path.join(dataDir, "reports.json");

// Keep the in-memory array on global to persist it across hot reloads or warm serverless containers.
const globalForReports = global as unknown as {
  inMemoryReports: ThreatReport[];
};

if (!globalForReports.inMemoryReports) {
  globalForReports.inMemoryReports = [];
}

const isVercel = !!process.env.VERCEL;

async function readReports(): Promise<ThreatReport[]> {
  if (isVercel) {
    return globalForReports.inMemoryReports;
  }
  try {
    const raw = await fs.readFile(reportsFile, "utf8");
    return JSON.parse(raw) as ThreatReport[];
  } catch {
    return [];
  }
}

export async function saveReport(report: ThreatReport) {
  if (isVercel) {
    globalForReports.inMemoryReports.unshift(report);
    if (globalForReports.inMemoryReports.length > 50) {
      globalForReports.inMemoryReports = globalForReports.inMemoryReports.slice(0, 50);
    }
    return;
  }
  await fs.mkdir(dataDir, { recursive: true });
  const reports = await readReports();
  reports.unshift(report);
  await fs.writeFile(reportsFile, JSON.stringify(reports.slice(0, 50), null, 2));
}

export async function getReport(id: string) {
  const reports = await readReports();
  return reports.find((report) => report.id === id) ?? null;
}

export async function listReports() {
  return readReports();
}
