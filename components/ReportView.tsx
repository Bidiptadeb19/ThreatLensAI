"use client";

import { RedirectTimeline } from "@/components/RedirectTimeline";
import { RiskGauge } from "@/components/RiskGauge";
import { SignalCard } from "@/components/SignalCard";
import { VerdictBadge } from "@/components/VerdictBadge";
import type { ThreatReport } from "@/lib/types";

export function ReportView({ report }: { report: ThreatReport }) {
  function downloadJson() {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `threatlens-${report.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyanline">Threat report</p>
          <h1 className="mt-3 break-all text-3xl font-bold text-white lg:text-5xl">{report.inputUrl}</h1>
          <p className="mt-3 break-all text-slate-400">Final destination: {report.finalUrl}</p>
        </div>
        <div className="no-print flex gap-3">
          <button onClick={downloadJson} className="rounded border border-cyanline/40 px-4 py-2 text-cyanline hover:bg-cyanline/10">Export JSON</button>
          <button onClick={() => window.print()} className="rounded bg-cyanline px-4 py-2 font-semibold text-ink hover:bg-white">Export PDF</button>
        </div>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-lg border border-white/10 bg-panel/80 p-6">
          <RiskGauge score={report.score} />
          <div className="mt-6 flex items-center justify-center gap-3">
            <VerdictBadge verdict={report.verdict} />
            <span className="text-sm text-slate-400">{report.confidence}% confidence</span>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-2xl font-semibold text-white">AI analyst recommendation</h2>
          <p className="mt-4 leading-7 text-slate-300">{report.aiExplanation.summary}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <SignalCard title="Normal user action" value={report.aiExplanation.userAction} />
            <SignalCard title="Security team action" value={report.aiExplanation.securityTeamAction} />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SignalCard title="DNS addresses" value={report.dns.addresses.join(", ") || "None"} detail={report.dns.domain} />
        <SignalCard title="SSL" value={report.ssl.hasHttps ? report.ssl.issuer ?? "HTTPS detected" : "No HTTPS"} detail={report.ssl.error ?? `Valid to ${report.ssl.validTo ?? "unknown"}`} />
        <SignalCard title="IP intelligence" value={report.ipIntel.multipleIps ? "Multiple IPs" : report.ipIntel.addresses[0]?.ip ?? "No IP"} detail={report.ipIntel.addresses[0]?.geo} />
        <SignalCard title="Domain features" value={`${report.features.subdomainCount} subdomains`} detail={`TLD .${report.features.tld}, randomness ${report.features.randomnessScore}/10`} />
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-semibold text-white">Top risk factors</h2>
          <div className="mt-4 space-y-3">
            {report.scoreBreakdown.length ? report.scoreBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-3">
                <span className="text-slate-200">{item.label}</span>
                <span className="font-semibold text-amberglow">+{item.points}</span>
              </div>
            )) : <p className="text-slate-400">No major weighted risk factors were detected.</p>}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-semibold text-white">Explainability</h2>
          <ul className="mt-4 space-y-3">
            {report.aiExplanation.evidence.map((item) => <li key={item} className="rounded border border-white/10 bg-black/20 p-3 text-slate-300">{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-6">
        <h2 className="text-xl font-semibold text-white">Redirect chain</h2>
        <div className="mt-4"><RedirectTimeline redirects={report.redirects} /></div>
      </section>

      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-6">
        <h2 className="text-xl font-semibold text-white">Technical indicators</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <tbody className="divide-y divide-white/10">
              {Object.entries(report.features).map(([key, value]) => (
                <tr key={key}>
                  <th className="py-3 pr-6 font-medium text-slate-400">{key}</th>
                  <td className="py-3 text-white">{Array.isArray(value) ? value.join(", ") || "None" : String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
