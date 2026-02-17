import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { enforceRateLimit } from "@/lib/rate-limit";
import { assertCanGenerate, logUsage } from "@/lib/usage";
import { openai } from "@/lib/openai";
import { FeatureKey } from "@/lib/types";

export async function handleAIGeneration<T extends z.ZodTypeAny>({
  req,
  schema,
  feature,
  prompt,
  system,
  jsonSchema
}: {
  req: NextRequest;
  schema: T;
  feature: FeatureKey;
  prompt: (input: z.infer<T>) => string;
  system: string;
  jsonSchema: { name: string; schema: Record<string, unknown> };
}) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ip = req.headers.get("x-forwarded-for") ?? user.id;
  if (!enforceRateLimit(ip)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const allowed = await assertCanGenerate(user.id);
  if (!allowed.allowed) return NextResponse.json({ error: "Usage limit reached. Upgrade to Pro." }, { status: 402 });

  const completion = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      { role: "system", content: system },
      { role: "user", content: prompt(parsed.data) }
    ],
    text: {
      format: {
        type: "json_schema",
        name: jsonSchema.name,
        schema: jsonSchema.schema,
        strict: true
      }
    }
  });

  const text = completion.output_text;
  const data = JSON.parse(text);
  const tokens = completion.usage?.total_tokens ?? 0;

  await logUsage(user.id, feature, tokens, JSON.stringify(parsed.data), data);

  return NextResponse.json({ data, plan: allowed.plan });
}
