import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const features = [
  "Niche Intelligence",
  "Viral Script Builder",
  "Hook Analyzer",
  "30-Day Planner",
  "Monetization Map"
];

export default function LandingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <header className="flex items-center justify-between">
        <div className="text-xl font-bold">CreatorOS</div>
        <div className="flex gap-3">
          <Link href="/login" className="rounded-lg border border-white/20 px-4 py-2 text-sm">
            Login
          </Link>
          <Link href="/signup" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black">
            Get Started
          </Link>
        </div>
      </header>

      <section className="glass mt-16 rounded-2xl p-10 shadow-glow">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/50 px-3 py-1 text-xs text-accent">
          <Sparkles className="h-3 w-3" /> AI Creator Stack
        </div>
        <h1 className="text-4xl font-bold md:text-6xl">Build Viral Content Systems. Not Random Videos.</h1>
        <p className="mt-6 max-w-2xl text-muted">
          CreatorOS turns chaotic content creation into a repeatable operating system for growth, monetization,
          and consistency.
        </p>
        <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-black">
          Launch Dashboard <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <article className="glass rounded-xl p-6"><h2 className="font-semibold">Problem</h2><p className="mt-2 text-sm text-muted">Creators rely on random ideas, weak hooks, and no system.</p></article>
        <article className="glass rounded-xl p-6"><h2 className="font-semibold">Solution</h2><p className="mt-2 text-sm text-muted">AI workflows built for faceless short-form growth.</p></article>
      </section>

      <section className="mt-16">
        <h3 className="text-2xl font-semibold">Feature Showcase</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="glass rounded-xl p-5 text-sm">{feature}</div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="glass rounded-xl p-6"><h4 className="font-semibold">Free</h4><p className="text-muted">Limited generations</p></div>
        <div className="glass rounded-xl border-accent/40 p-6"><h4 className="font-semibold">Pro ₹999/mo</h4><p className="text-muted">Unlimited strategy workflows</p></div>
        <div className="glass rounded-xl p-6"><h4 className="font-semibold">Testimonials</h4><p className="text-muted">“Placeholder creator proof.”</p></div>
      </section>

      <footer className="mt-20 pb-6 text-center text-sm text-muted">Scale your content machine with CreatorOS.</footer>
    </main>
  );
}
