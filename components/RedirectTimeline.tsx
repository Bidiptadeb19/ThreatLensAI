import type { RedirectHop } from "@/lib/types";

export function RedirectTimeline({ redirects }: { redirects: RedirectHop[] }) {
  return (
    <div className="space-y-3">
      {redirects.map((hop, index) => (
        <div key={`${hop.url}-${index}`} className="grid gap-3 rounded border border-white/10 bg-black/20 p-4 sm:grid-cols-[80px_1fr]">
          <span className="text-sm font-semibold text-cyanline">Hop {index + 1}</span>
          <div>
            <p className="break-all text-sm text-white">{hop.url}</p>
            <p className="mt-1 text-sm text-slate-400">Status {hop.status || "blocked"} {hop.location ? `-> ${hop.location}` : ""}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
