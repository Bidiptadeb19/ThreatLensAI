export function SignalCard({ title, value, detail }: { title: string; value: string; detail?: string }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-glow">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 break-words text-xl font-semibold text-white">{value}</p>
      {detail ? <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p> : null}
    </section>
  );
}
