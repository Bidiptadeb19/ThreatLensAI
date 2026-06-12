import { ScanForm } from "@/components/ScanForm";

export default function ScanPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.24em] text-cyanline">Safe metadata scanner</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Scan a suspicious URL</h1>
        <p className="mt-4 leading-7 text-slate-300">ThreatLens analyzes the URL without rendering page HTML, executing scripts, or downloading files.</p>
      </div>
      <ScanForm />
    </main>
  );
}
