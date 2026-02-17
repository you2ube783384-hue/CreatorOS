import { NextRequest } from "next/server";
import { z } from "zod";
import { handleAIGeneration } from "@/lib/api-helpers";

const schema = z.object({ interests: z.string(), skills: z.string(), goals: z.string() });

export async function POST(req: NextRequest) {
  return handleAIGeneration({
    req,
    schema,
    feature: "niche",
    system: "You are a growth strategist for faceless short-form creators.",
    prompt: (i) => `Interests: ${i.interests}\nSkills: ${i.skills}\nGoals: ${i.goals}`,
    jsonSchema: {
      name: "niche_intelligence",
      schema: {
        type: "object",
        properties: {
          niches: {
            type: "array",
            items: {
              type: "object",
              properties: {
                niche: { type: "string" },
                competition: { type: "string" },
                monetization: { type: "string" },
                channelConcept: { type: "string" }
              },
              required: ["niche", "competition", "monetization", "channelConcept"],
              additionalProperties: false
            }
          }
        },
        required: ["niches"],
        additionalProperties: false
      }
    }
  });
}
