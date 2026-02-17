import { NextRequest } from "next/server";
import { z } from "zod";
import { handleAIGeneration } from "@/lib/api-helpers";

const schema = z.object({ niche: z.string(), platform: z.string(), frequency: z.string() });

export async function POST(req: NextRequest) {
  return handleAIGeneration({
    req,
    schema,
    feature: "planner",
    system: "You create 30-day content plans for faceless creators.",
    prompt: (i) => `Niche:${i.niche}\nPlatform:${i.platform}\nFrequency:${i.frequency}`,
    jsonSchema: {
      name: "content_plan",
      schema: {
        type: "object",
        properties: {
          plan: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: { type: "string" },
                idea: { type: "string" },
                hook: { type: "string" },
                angle: { type: "string" },
                cta: { type: "string" }
              },
              required: ["day", "idea", "hook", "angle", "cta"],
              additionalProperties: false
            }
          }
        },
        required: ["plan"],
        additionalProperties: false
      }
    }
  });
}
