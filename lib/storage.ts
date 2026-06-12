import fs from "node:fs/promises";
import path from "node:path";
import type { ThreatReport } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const reportsFile = path.join(dataDir, "reports.json");

async function readReports(): Promise<ThreatReport[]> {
  try {
    const raw = await fs.readFile(reportsFile, "utf8");
    return JSON.parse(raw) as ThreatReport[];
  } catch {
    return [];
  }
}

export async function saveReport(report: ThreatReport) {
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
