import { NextResponse } from "next/server";
import { getReport } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as { id?: string; format?: "json" | "pdf" };
  if (!body.id) return NextResponse.json({ error: "Report id is required." }, { status: 400 });
  const report = await getReport(body.id);
  if (!report) return NextResponse.json({ error: "Report not found." }, { status: 404 });

  if (body.format === "pdf") {
    return new NextResponse(
      `<html><body><pre>${JSON.stringify(report, null, 2)}</pre><script>window.print()</script></body></html>`,
      { headers: { "content-type": "text/html; charset=utf-8" } }
    );
  }

  return new NextResponse(JSON.stringify(report, null, 2), {
    headers: {
      "content-type": "application/json",
      "content-disposition": `attachment; filename="threatlens-${report.id}.json"`
    }
  });
}
