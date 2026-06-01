import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/buildPrompt";
import type { WizardState } from "@/lib/types";

export async function POST(req: NextRequest) {
  const apiKey = process.env.STABILITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured. Add STABILITY_API_KEY to .env.local." },
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

  const form = new FormData();
  form.append("prompt", prompt);
  form.append("output_format", "png");
  form.append("aspect_ratio", "1:1");

  let stabilityRes: Response;
  try {
    stabilityRes = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/*",
        },
        body: form,
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to reach the generation service. Check your network." },
      { status: 502 }
    );
  }

  if (!stabilityRes.ok) {
    if (stabilityRes.status === 402) {
      return NextResponse.json(
        { error: "Free credits exhausted. Add credits at platform.stability.ai." },
        { status: 402 }
      );
    }
    if (stabilityRes.status === 401) {
      return NextResponse.json(
        { error: "Invalid API key. Check STABILITY_API_KEY in .env.local." },
        { status: 401 }
      );
    }
    const body = await stabilityRes.text().catch(() => "");
    return NextResponse.json(
      { error: `Generation failed (${stabilityRes.status}). ${body}`.slice(0, 200) },
      { status: stabilityRes.status }
    );
  }

  const imageBuffer = await stabilityRes.arrayBuffer();
  const base64 = Buffer.from(imageBuffer).toString("base64");

  return NextResponse.json({ image: `data:image/png;base64,${base64}` });
}
