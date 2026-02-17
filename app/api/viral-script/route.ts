import { NextRequest } from "next/server";
import { z } from "zod";
import { handleAIGeneration } from "@/lib/api-helpers";

const schema = z.object({ platform: z.string(), niche: z.string(), tone: z.string(), duration: z.string() });

export async function POST(req: NextRequest) {
  return handleAIGeneration({
    req,
    schema,
    feature: "script",
    system: "You write viral short-form scripts.",
    prompt: (i) => `Platform:${i.platform}\nNiche:${i.niche}\nTone:${i.tone}\nDuration:${i.duration}`,
    jsonSchema: {
      name: "viral_script",
      schema: {
        type: "object",
        properties: { hook: { type: "string" }, body: { type: "string" }, retentionLoop: { type: "string" }, cta: { type: "string" } },
        required: ["hook", "body", "retentionLoop", "cta"],
        additionalProperties: false
      }
    }
  });
}
