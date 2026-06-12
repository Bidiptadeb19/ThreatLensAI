import Link from "next/link";
import { demoSamples } from "@/lib/samples";

const signals = ["URL lexical analysis", "DNS resolution", "IP intelligence", "SSL inspection", "Redirect behavior", "Threat reputation", "AI explanation"];

export default function HomePage() {
  return (
    <main>
      <section className="cyber-grid mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl content-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyanline">Hackathon security demo</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight text-white lg:text-7xl">ThreatLens AI: Explainable URL Threat Detection</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Analyze URLs using IP intelligence, DNS signals, SSL checks, redirect behavior, and AI-powered reasoning.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/scan" className="rounded bg-cyanline px-6 py-3 font-semibold text-ink shadow-glow hover:bg-white">Scan a URL</Link>
            <Link href="/about" className="rounded border border-white/15 px-6 py-3 font-semibold text-white hover:border-cyanline/50 hover:bg-white/10">View methodology</Link>
          </div>
        </div>
        <div className="rounded-lg border border-cyanline/20 bg-panel/80 p-6 shadow-glow">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-400">Live signal stack</span>
            <span className="rounded border border-acid/40 bg-acid/10 px-3 py-1 text-sm text-acid">Demo ready</span>
          </div>
          <div className="mt-5 grid gap-3">
            {signals.map((signal, index) => (
              <div key={signal} className="flex items-center gap-3 rounded border border-white/10 bg-black/20 p-3">
                <span className="grid h-8 w-8 place-items-center rounded bg-cyanline/10 text-sm font-semibold text-cyanline">{index + 1}</span>
                <span className="text-slate-200">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["Why URL attacks matter", "Phishing and malware links often arrive before traditional blocklists catch up. ThreatLens helps users evaluate risky links before clicking."],
            ["How it works", "The scanner safely resolves metadata, follows limited redirects, inspects SSL, extracts URL features, and turns evidence into a transparent score."],
            ["Technical signals used", "Domain structure, suspicious terms, IPs, DNS, SSL validity, redirects, reputation adapters, and AI-style recommendations."]
          ].map(([title, copy]) => (
            <article key={title} className="rounded-lg border border-white/10 bg-panel/60 p-6">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyanline">Demo examples</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Five safe sample URLs</h2>
          </div>
          <Link href="/scan" className="rounded border border-cyanline/40 px-4 py-2 text-cyanline hover:bg-cyanline/10">Try scanner</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {demoSamples.map((sample) => (
            <article key={sample.url} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <h3 className="font-semibold text-white">{sample.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{sample.intent}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
