-- ============================================================
--  منجز Monjiz — Admin, Profiles, Auth & Portfolio (Work Photos)
--  Run the whole script once in Supabase → SQL Editor
-- ============================================================

-- 1) Admins table (list of auth users who are administrators)
create table if not exists public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 2) Freelancers: link to auth user, avatar, and portfolio photos
alter table public.freelancers
  add column if not exists auth_id uuid references auth.users(id) on delete cascade,
  add column if not exists avatar_url text,
  add column if not exists portfolio jsonb not null default '[]'::jsonb;

-- 3) Clients: link to auth user
alter table public.clients
  add column if not exists auth_id uuid references auth.users(id) on delete cascade;

-- 4) Storage bucket for work photos (public so anyone can view portfolios)
insert into storage.buckets (id, name, public)
values ('works', 'works', true)
on conflict (id) do nothing;

-- 5) Row Level Security
alter table public.admins enable row level security;

-- --- Freelancers ---
drop policy if exists "freelancers public read" on public.freelancers;
create policy "freelancers public read" on public.freelancers
  for select using (approved = true);

drop policy if exists "freelancers owner read" on public.freelancers;
create policy "freelancers owner read" on public.freelancers
  for select using (auth.uid() = auth_id);

drop policy if exists "freelancers insert" on public.freelancers;
create policy "freelancers insert" on public.freelancers
  for insert with check (auth.uid() = auth_id);

drop policy if exists "freelancers owner update" on public.freelancers;
create policy "freelancers owner update" on public.freelancers
  for update using (auth.uid() = auth_id) with check (auth.uid() = auth_id);

drop policy if exists "admins manage freelancers" on public.freelancers;
create policy "admins manage freelancers" on public.freelancers
  for all using (exists (select 1 from public.admins where admins.id = auth.uid()));

-- --- Clients ---
drop policy if exists "clients insert" on public.clients;
create policy "clients insert" on public.clients
  for insert with check (auth.uid() = auth_id);

drop policy if exists "clients owner" on public.clients;
create policy "clients owner" on public.clients
  for all using (auth.uid() = auth_id);

drop policy if exists "admins manage clients" on public.clients;
create policy "admins manage clients" on public.clients
  for all using (exists (select 1 from public.admins where admins.id = auth.uid()));

-- --- Admins: anyone can read to check if a user is admin ---
drop policy if exists "admins select" on public.admins;
create policy "admins select" on public.admins
  for select using (true);

-- --- Storage policies for work photos ---
drop policy if exists "works upload" on storage.objects;
create policy "works upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'works');

drop policy if exists "works update" on storage.objects;
create policy "works update" on storage.objects
  for update to authenticated
  using (bucket_id = 'works');

drop policy if exists "works delete" on storage.objects;
create policy "works delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'works');

-- ============================================================
--  AFTER RUNNING THIS, add yourself as admin:
--  INSERT INTO public.admins (id) VALUES ('YOUR_AUTH_USER_ID');
--  (Find your user id in Authentication → Users after you sign up)
-- ============================================================
