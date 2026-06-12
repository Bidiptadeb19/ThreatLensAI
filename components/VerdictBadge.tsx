import type { Verdict } from "@/lib/types";

const styles: Record<Verdict, string> = {
  Safe: "border-acid/50 bg-acid/10 text-acid",
  Suspicious: "border-amberglow/50 bg-amberglow/10 text-amberglow",
  Dangerous: "border-danger/50 bg-danger/10 text-danger"
};

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return <span className={`inline-flex rounded border px-3 py-1 text-sm font-semibold ${styles[verdict]}`}>{verdict}</span>;
}
