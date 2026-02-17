"use client";

import { ModuleShell } from "@/components/dashboard/module-shell";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function NicheIntelligencePage() {
  return (
    <ModuleShell
      title="Niche Intelligence Engine"
      description="Discover profitable short-form niches aligned to your strengths."
      endpoint="/api/niche-intelligence"
      payloadBuilder={(f) => ({ interests: f.interests ?? "", skills: f.skills ?? "", goals: f.goals ?? "Growth" })}
    >
      {(setField) => (
        <>
          <Input placeholder="Interests" onChange={(e) => setField("interests", e.target.value)} />
          <Input placeholder="Skills" onChange={(e) => setField("skills", e.target.value)} />
          <Select onChange={(e) => setField("goals", e.target.value)}>
            <option>Growth</option><option>Monetization</option><option>Brand authority</option>
          </Select>
        </>
      )}
    </ModuleShell>
  );
}
