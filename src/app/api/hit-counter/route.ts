import { NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export const runtime = "edge";

export async function POST() {
  try {
    const kv = createClient({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });

    const count = await kv.incr("portfolio:views");
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Hit counter error:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function GET() {
  try {
    const kv = createClient({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });

    const count = await kv.get<number>("portfolio:views");
    
    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error("Hit counter error:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
