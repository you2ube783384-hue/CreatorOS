import { NextRequest } from "next/server";
import { z } from "zod";
import { handleAIGeneration } from "@/lib/api-helpers";

const schema = z.object({ script: z.string().min(10) });

export async function POST(req: NextRequest) {
  return handleAIGeneration({
    req,
    schema,
    feature: "hook",
    system: "You score short-form hooks and scripts for retention.",
    prompt: (i) => `Analyze this script:\n${i.script}`,
    jsonSchema: {
      name: "hook_analysis",
      schema: {
        type: "object",
        properties: {
          curiosityScore: { type: "number" },
          emotionalTriggerStrength: { type: "string" },
          retentionProbability: { type: "string" },
          rewriteSuggestion: { type: "string" }
        },
        required: ["curiosityScore", "emotionalTriggerStrength", "retentionProbability", "rewriteSuggestion"],
        additionalProperties: false
      }
    }
  });
}
