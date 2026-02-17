"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PlannerPage() {
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("YouTube Shorts");
  const [frequency, setFrequency] = useState("Daily");
  const [rows, setRows] = useState<Array<Record<string, string>>>([]);

  const exportCsv = () => {
    const header = "day,idea,hook,angle,cta\n";
    const body = rows.map((row) => `${row.day},"${row.idea}","${row.hook}","${row.angle}","${row.cta}"`).join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "creatoros-30-day-plan.csv";
    link.click();
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h1 className="text-2xl font-semibold">30-Day Content Planner</h1>
        <Input placeholder="Niche" onChange={(e) => setNiche(e.target.value)} />
        <Select onChange={(e) => setPlatform(e.target.value)}><option>YouTube Shorts</option><option>Reels</option><option>TikTok</option></Select>
        <Select onChange={(e) => setFrequency(e.target.value)}><option>Daily</option><option>5x/week</option><option>3x/week</option></Select>
        <Button onClick={async () => {
          const res = await fetch('/api/planner', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ niche, platform, frequency }) });
          const json = await res.json();
          setRows(json.data?.plan ?? []);
        }}>Generate Plan</Button>
      </Card>
      <Card>
        <div className="mb-3 flex justify-between"><h2 className="font-medium">Content Table</h2><Button variant="outline" onClick={exportCsv} disabled={!rows.length}>Export CSV</Button></div>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="text-muted"><th>Day</th><th>Idea</th><th>Hook</th><th>Angle</th><th>CTA</th></tr></thead><tbody>{rows.map((r, i)=><tr key={i} className="border-t border-white/10"><td>{r.day}</td><td>{r.idea}</td><td>{r.hook}</td><td>{r.angle}</td><td>{r.cta}</td></tr>)}</tbody></table></div>
      </Card>
    </div>
  );
}
