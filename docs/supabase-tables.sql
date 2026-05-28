-- Run in the Supabase SQL editor for project matlocindus (or your MAT INDUS project).
-- Creates contact_leads + quote_leads to match app/api/contact and app/api/quote.
-- simulator_leads already exists.

create table if not exists public.contact_leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  phone       text,
  message     text not null
);

create table if not exists public.quote_leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  first_name    text not null,
  last_name     text not null,
  email         text not null,
  phone         text not null,
  company       text not null,
  sector        text not null,
  project_type  text not null,
  message       text not null
);

-- The API routes use SUPABASE_SERVICE_ROLE_KEY (bypasses RLS), so RLS is optional.
-- Enable RLS + add an INSERT policy if you ever wire these to the anon key:
-- alter table public.contact_leads enable row level security;
-- create policy "anon can insert contact_leads" on public.contact_leads for insert to anon with check (true);
-- alter table public.quote_leads enable row level security;
-- create policy "anon can insert quote_leads" on public.quote_leads for insert to anon with check (true);
