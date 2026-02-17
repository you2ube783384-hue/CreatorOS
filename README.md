# CreatorOS

Production-ready AI SaaS starter for faceless and short-form creators.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS + shadcn-style UI primitives
- Supabase auth/database
- OpenAI structured JSON generation
- Stripe subscriptions (Pro ₹999/month)

## Features
- Email/password auth (login/signup/logout)
- Protected dashboard routes
- Plan-aware generation limits (free vs pro)
- Rate-limited AI API routes
- Modules: Niche Intelligence, Viral Script Builder, Hook Analyzer, 30-Day Planner, Monetization Map
- CSV export for 30-day planner
- Public marketing landing page

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env vars:
   ```bash
   cp .env.example .env.local
   ```
3. Apply Supabase schema in `supabase/schema.sql`.
4. Run dev:
   ```bash
   npm run dev
   ```

## Stripe
- Create product price at ₹999/month.
- Set `NEXT_PUBLIC_STRIPE_PRICE_ID`.
- Configure webhook endpoint: `/api/stripe/webhook`.

## Deploy
Deploy directly to Vercel. Set all `.env.example` variables in project settings.
