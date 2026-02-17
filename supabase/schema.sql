create table if not exists users (
  id uuid primary key,
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'inactive',
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists usage_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null,
  tokens_consumed int not null default 0,
  created_at timestamptz default now()
);

create table if not exists generations (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null,
  prompt text not null,
  output jsonb not null,
  created_at timestamptz default now()
);

alter table subscriptions enable row level security;
alter table usage_logs enable row level security;
alter table generations enable row level security;

create policy "Users can view own subscriptions" on subscriptions for select using (auth.uid() = user_id);
create policy "Users can view own usage" on usage_logs for select using (auth.uid() = user_id);
create policy "Users can view own generations" on generations for select using (auth.uid() = user_id);
