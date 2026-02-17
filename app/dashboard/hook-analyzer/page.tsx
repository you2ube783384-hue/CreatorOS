"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function HookAnalyzerPage() {
  const [script, setScript] = useState("");
  const [result, setResult] = useState<Record<string, string | number> | null>(null);

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-semibold">Hook Analyzer</h1>
        <Textarea className="mt-4" rows={8} placeholder="Paste your script" value={script} onChange={(e) => setScript(e.target.value)} />
        <Button className="mt-4" onClick={async () => {
          const res = await fetch('/api/hook-analyzer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ script }) });
          const json = await res.json();
          setResult(json.data);
        }}>Analyze</Button>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {result && Object.entries(result).map(([key, val]) => <Card key={key}><div className="text-xs uppercase text-muted">{key}</div><div className="mt-2 text-lg font-semibold">{String(val)}</div></Card>)}
      </div>
    </div>
  );
}
