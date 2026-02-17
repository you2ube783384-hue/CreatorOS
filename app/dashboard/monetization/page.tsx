"use client";

import { ModuleShell } from "@/components/dashboard/module-shell";
import { Input } from "@/components/ui/input";

export default function MonetizationPage() {
  return (
    <ModuleShell
      title="Monetization Map"
      description="Map audience size to revenue opportunities and products."
      endpoint="/api/monetization"
      payloadBuilder={(f) => ({ niche: f.niche ?? "", audienceSize: f.audienceSize ?? "" })}
    >
      {(setField) => (
        <>
          <Input placeholder="Niche" onChange={(e) => setField("niche", e.target.value)} />
          <Input placeholder="Audience size estimate" onChange={(e) => setField("audienceSize", e.target.value)} />
        </>
      )}
    </ModuleShell>
  );
}
