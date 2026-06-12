"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stages = ["Parsing URL", "Resolving DNS", "Checking SSL", "Following redirects", "Checking IP reputation", "Generating AI report"];

type Sample = { label: string; url: string; intent: string };

export function ScanForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [error, setError] = useState("");
  const [samples, setSamples] = useState<Sample[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/demo-samples")
      .then((response) => response.json())
      .then((data) => setSamples(data.samples ?? []))
      .catch(() => setSamples([]));
  }, []);

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => setActiveStage((stage) => Math.min(stages.length - 1, stage + 1)), 650);
    return () => clearInterval(timer);
  }, [loading]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setActiveStage(0);
    const response = await fetch("/api/scan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(data.error ?? "Scan failed.");
      return;
    }
    router.push(`/report/${data.report.id}`);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={submit} className="rounded-lg border border-cyanline/20 bg-panel/85 p-6 shadow-glow">
        <label className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanline">URL Scanner</label>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/login"
            className="min-h-12 flex-1 rounded border border-white/10 bg-black/30 px-4 text-white outline-none ring-cyanline/40 focus:ring-2"
          />
          <button disabled={loading} className="min-h-12 rounded bg-cyanline px-6 font-semibold text-ink hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Scanning" : "Scan URL"}
          </button>
        </div>
        {error ? <p className="mt-4 rounded border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{error}</p> : null}
        {loading ? (
          <div className="mt-6 grid gap-2">
            {stages.map((stage, index) => (
              <div key={stage} className={`rounded border p-3 text-sm ${index <= activeStage ? "border-cyanline/40 bg-cyanline/10 text-white" : "border-white/10 bg-white/5 text-slate-500"}`}>
                {stage}
              </div>
            ))}
          </div>
        ) : null}
      </form>

      <aside className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
        <h2 className="text-lg font-semibold text-white">Demo examples</h2>
        <div className="mt-4 space-y-3">
          {samples.map((sample) => (
            <button key={sample.url} onClick={() => setUrl(sample.url)} className="w-full rounded border border-white/10 bg-black/20 p-3 text-left hover:border-cyanline/50">
              <span className="block text-sm font-semibold text-white">{sample.label}</span>
              <span className="mt-1 block break-all text-xs text-slate-400">{sample.url}</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
