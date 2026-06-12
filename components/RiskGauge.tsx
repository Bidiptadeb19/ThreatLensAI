export function RiskGauge({ score }: { score: number }) {
  const degrees = Math.round((score / 100) * 180);
  const color = score >= 60 ? "#ff4d6d" : score >= 30 ? "#ffcf5a" : "#a3ff4a";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-64 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-64 rounded-full border-[22px] border-white/10" />
        <div
          className="absolute inset-x-0 top-0 h-64 rounded-full border-[22px] border-transparent"
          style={{ borderTopColor: color, borderLeftColor: color, transform: `rotate(${degrees - 45}deg)` }}
        />
        <div className="absolute bottom-0 left-1/2 h-1 w-24 origin-left rounded bg-white" style={{ transform: `rotate(${degrees}deg)` }} />
        <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />
      </div>
      <div className="text-center">
        <div className="text-5xl font-bold" style={{ color }}>
          {score}
        </div>
        <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Risk score</div>
      </div>
    </div>
  );
}
