import { NextResponse } from "next/server";
import { getReport } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) return NextResponse.json({ error: "Report not found." }, { status: 404 });
  return NextResponse.json({ report });
}
