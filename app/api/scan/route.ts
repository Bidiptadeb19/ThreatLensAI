import { NextResponse } from "next/server";
import { scanUrl } from "@/lib/scanner";

export const runtime = "nodejs";

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000);
  const max = Number(process.env.RATE_LIMIT_MAX ?? 20);
  const current = hits.get(ip);
  if (!current || current.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= max;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many scans. Please wait and try again." }, { status: 429 });
  }

  try {
    const body = (await request.json()) as { url?: string };
    if (!body.url) return NextResponse.json({ error: "URL is required." }, { status: 400 });
    const report = await scanUrl(body.url);
    return NextResponse.json({ report });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Scan failed." }, { status: 400 });
  }
}
