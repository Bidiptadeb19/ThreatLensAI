import { NextResponse } from "next/server";
import { demoSamples } from "@/lib/samples";

export async function GET() {
  return NextResponse.json({ samples: demoSamples });
}
