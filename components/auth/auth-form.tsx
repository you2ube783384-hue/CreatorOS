"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const action = mode === "login" ? supabaseBrowser.auth.signInWithPassword : supabaseBrowser.auth.signUp;
    const { error: authError } = await action({ email, password });

    setLoading(false);
    if (authError) return setError(authError.message);
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-2xl p-6">
      <h1 className="text-2xl font-semibold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <div className="mt-4 space-y-3">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <Button type="submit" className="mt-5 w-full" disabled={loading}>
        {loading ? "Loading..." : mode === "login" ? "Login" : "Sign up"}
      </Button>
    </form>
  );
}
