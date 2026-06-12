import Link from "next/link";
import { ReportView } from "@/components/ReportView";
import { getReport } from "@/lib/storage";

export const runtime = "nodejs";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white">Report not found</h1>
        <p className="mt-4 text-slate-400">Run a new scan to generate a fresh report.</p>
        <Link href="/scan" className="mt-8 inline-flex rounded bg-cyanline px-5 py-3 font-semibold text-ink">Scan a URL</Link>
      </main>
    );
  }
  return <ReportView report={report} />;
}
