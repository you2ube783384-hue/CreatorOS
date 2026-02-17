"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function ViralScriptBuilderPage() {
  const [form, setForm] = useState({ platform: "YouTube Shorts", niche: "", tone: "Bold", duration: "30s" });
  const [result, setResult] = useState<Record<string, string> | null>(null);

  const generate = async () => {
    const res = await fetch("/api/viral-script", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json();
    setResult(json.data);
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h1 className="text-2xl font-semibold">Viral Script Builder</h1>
        <Select onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}><option>YouTube Shorts</option><option>Reels</option><option>TikTok</option></Select>
        <Input placeholder="Niche" onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value }))} />
        <Input placeholder="Tone" onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value }))} />
        <Select onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}><option>15s</option><option>30s</option><option>60s</option></Select>
        <Button onClick={generate}>Generate Script</Button>
      </Card>
      <Card>
        <h2 className="mb-3 font-medium">Script Output</h2>
        {result ? Object.entries(result).map(([k,v]) => <div key={k} className="mb-3 rounded-lg border border-white/10 p-3"><div className="mb-1 text-xs uppercase text-accent">{k}</div><p className="text-sm">{v}</p><Button variant="outline" className="mt-2" onClick={() => navigator.clipboard.writeText(v)}>Copy</Button></div>) : <p className="text-sm text-muted">Generate to see output.</p>}
      </Card>
    </div>
  );
}
