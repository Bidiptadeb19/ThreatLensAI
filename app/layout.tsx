import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThreatLens AI",
  description: "Explainable URL threat detection using URL, IP, DNS, SSL, redirect, and reputation signals."
};

const nav = [
  { href: "/", label: "Overview" },
  { href: "/scan", label: "Scan" },
  { href: "/history", label: "History" },
  { href: "/about", label: "Methodology" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide text-white">
              <span className="grid h-9 w-9 place-items-center rounded border border-cyanline/50 bg-cyanline/10 text-cyanline">TL</span>
              ThreatLens AI
            </Link>
            <div className="flex items-center gap-1 rounded border border-white/10 bg-white/5 p-1">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
