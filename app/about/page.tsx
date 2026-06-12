const scoring = [
  ["Known malicious reputation", "+50"],
  ["Google Safe Browsing match", "+50"],
  ["VirusTotal malicious detections", "+40"],
  ["AbuseIPDB high abuse score", "+30"],
  ["IP address used directly", "+20"],
  ["No HTTPS", "+15"],
  ["Suspicious keywords", "+5 to +15"],
  ["Excessive subdomains", "+10"],
  ["Too many redirects", "+10"],
  ["Domain mismatch after redirect", "+20"],
  ["Very new domain", "+20"],
  ["Punycode detected", "+15"],
  ["URL shortener", "+10"],
  ["High randomness", "+10"]
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.24em] text-cyanline">Methodology</p>
      <h1 className="mt-3 text-4xl font-bold text-white">Transparent multi-signal scoring</h1>
      <p className="mt-4 max-w-3xl leading-7 text-slate-300">ThreatLens combines deterministic feature extraction with optional external intelligence and AI-compatible explanations. Every score is decomposed into visible evidence so a judge, user, or analyst can understand the verdict.</p>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          ["Safe by design", "The scanner never renders the target webpage, executes scripts, downloads files, or allows localhost/private-IP scans."],
          ["Hackathon practical", "The app works without paid API keys using local heuristics, demo samples, and template analyst reports."],
          ["Extension ready", "Adapters are prepared for VirusTotal, Google Safe Browsing, AbuseIPDB, urlscan.io, and OpenAI-compatible models."]
        ].map(([title, copy]) => (
          <article key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 leading-7 text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-white/10 bg-panel/70 p-6">
        <h2 className="text-2xl font-semibold text-white">Scoring weights</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {scoring.map(([label, points]) => (
            <div key={label} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-3">
              <span className="text-slate-300">{label}</span>
              <span className="font-semibold text-amberglow">{points}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded border border-acid/30 bg-acid/10 p-4 text-acid">0-29 Safe</div>
          <div className="rounded border border-amberglow/30 bg-amberglow/10 p-4 text-amberglow">30-59 Suspicious</div>
          <div className="rounded border border-danger/30 bg-danger/10 p-4 text-danger">60-100 Dangerous</div>
        </div>
      </section>
    </main>
  );
}
