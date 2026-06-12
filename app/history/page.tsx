import Link from "next/link";
import { VerdictBadge } from "@/components/VerdictBadge";
import { listReports } from "@/lib/storage";

export const runtime = "nodejs";

export default async function HistoryPage() {
  const reports = await listReports();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyanline">Previous scans</p>
          <h1 className="mt-3 text-4xl font-bold text-white">History</h1>
        </div>
        <Link href="/scan" className="rounded bg-cyanline px-5 py-3 font-semibold text-ink hover:bg-white">New scan</Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-white/10">
        {reports.length ? (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/10 text-slate-300">
              <tr>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Verdict</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-white/[0.035]">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="max-w-md break-all px-4 py-4 text-white">{report.inputUrl}</td>
                  <td className="px-4 py-4"><VerdictBadge verdict={report.verdict} /></td>
                  <td className="px-4 py-4 font-semibold text-white">{report.score}</td>
                  <td className="px-4 py-4 text-slate-400">{new Date(report.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-4"><Link href={`/report/${report.id}`} className="text-cyanline hover:underline">Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="bg-white/[0.035] p-8 text-center text-slate-400">No scans yet. Run the first demo from the scanner page.</div>
        )}
      </div>
    </main>
  );
}
