"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ModuleShell({
  title,
  description,
  endpoint,
  children,
  payloadBuilder
}: {
  title: string;
  description: string;
  endpoint: string;
  children: (setField: (key: string, value: string) => void) => React.ReactNode;
  payloadBuilder: (state: Record<string, string>) => Record<string, string>;
}) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadBuilder(form))
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) return setError(json.error ?? "Failed to generate");
    setData(json.data);
  };

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-muted">{description}</p>
        <div className="mt-5 space-y-3">{children((key, value) => setForm((prev) => ({ ...prev, [key]: value })))}</div>
        <Button className="mt-5" onClick={submit} disabled={loading}>{loading ? "Generating..." : "Generate"}</Button>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      </Card>

      <Card>
        <h2 className="mb-4 font-medium">Output</h2>
        {loading ? (
          <div className="space-y-2"><Skeleton /><Skeleton /><Skeleton /></div>
        ) : data ? (
          <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-white/90">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p className="text-sm text-muted">No output yet.</p>
        )}
      </Card>
    </div>
  );
}
