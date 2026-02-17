import { NextRequest } from "next/server";
import { z } from "zod";
import { handleAIGeneration } from "@/lib/api-helpers";

const schema = z.object({ niche: z.string(), audienceSize: z.string() });

export async function POST(req: NextRequest) {
  return handleAIGeneration({
    req,
    schema,
    feature: "monetization",
    system: "You map creator niches to revenue opportunities.",
    prompt: (i) => `Niche:${i.niche}\nAudience size:${i.audienceSize}`,
    jsonSchema: {
      name: "monetization_map",
      schema: {
        type: "object",
        properties: {
          revenueModels: { type: "array", items: { type: "string" } },
          affiliateOpportunities: { type: "array", items: { type: "string" } },
          digitalProductIdeas: { type: "array", items: { type: "string" } },
          estimatedIncomeRange: { type: "string" }
        },
        required: ["revenueModels", "affiliateOpportunities", "digitalProductIdeas", "estimatedIncomeRange"],
        additionalProperties: false
      }
    }
  });
}
