import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/buildPrompt";
import type { WizardState } from "@/lib/types";

export async function POST(req: NextRequest) {
  const apiKey = process.env.TOGETHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured. Add TOGETHER_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  let state: WizardState;
  try {
    state = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!state.businessName?.trim()) {
    return NextResponse.json({ error: "Business name is required." }, { status: 400 });
  }

  const prompt = buildPrompt(state);

  let togetherRes: Response;
  try {
    togetherRes = await fetch("https://api.together.xyz/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell",
        prompt,
        width: 1024,
        height: 1024,
        steps: 4,
        n: 1,
        response_format: "base64",
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach the generation service. Check your network." },
      { status: 502 }
    );
  }

  if (!togetherRes.ok) {
    if (togetherRes.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key. Check TOGETHER_API_KEY in .env.local." },
        { status: 401 }
      );
    }
    const body = await togetherRes.text().catch(() => "");
    return NextResponse.json(
      { error: `Generation failed (${togetherRes.status}). ${body}`.slice(0, 200) },
      { status: togetherRes.status }
    );
  }

  const json = await togetherRes.json();
  const base64 = json?.data?.[0]?.b64_json;

  if (!base64) {
    return NextResponse.json({ error: "No image returned from generation service." }, { status: 500 });
  }

  return NextResponse.json({ image: `data:image/png;base64,${base64}` });
}
