-- Enable Row Level Security
-- Note: It is better to create tables first then enable RLS.

-- 1. Services Table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text, -- Store icon name or SVG string
  image_url text, -- Supabase Storage URL
  features text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Portfolio Projects Table
create table if not exists public.portfolio_projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  image_url text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Team Members Table
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  image_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Messages Table (Contact Form)
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.services enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.team_members enable row level security;
alter table public.messages enable row level security;

-- POLICIES

-- Services: Public Read, Admin Write
drop policy if exists "Allow public read access for services" on public.services;
create policy "Allow public read access for services"
  on public.services for select
  to public
  using (true);

drop policy if exists "Allow admin full access for services" on public.services;
create policy "Allow admin full access for services"
  on public.services for all
  to authenticated
  using (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com')
  with check (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');

-- Portfolio: Public Read, Admin Write
drop policy if exists "Allow public read access for portfolio" on public.portfolio_projects;
create policy "Allow public read access for portfolio"
  on public.portfolio_projects for select
  to public
  using (true);

drop policy if exists "Allow admin full access for portfolio" on public.portfolio_projects;
create policy "Allow admin full access for portfolio"
  on public.portfolio_projects for all
  to authenticated
  using (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com')
  with check (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');

-- Team: Public Read, Admin Write
drop policy if exists "Allow public read access for team" on public.team_members;
create policy "Allow public read access for team"
  on public.team_members for select
  to public
  using (true);

drop policy if exists "Allow admin full access for team" on public.team_members;
create policy "Allow admin full access for team"
  on public.team_members for all
  to authenticated
  using (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com')
  with check (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');

-- Messages: Public Insert, Admin Read/Update
drop policy if exists "Allow public insert for messages" on public.messages;
create policy "Allow public insert for messages"
  on public.messages for insert
  to public
  with check (true);

drop policy if exists "Allow admin full access for messages" on public.messages;
create policy "Allow admin full access for messages"
  on public.messages for all
  to authenticated
  using (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com')
  with check (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');
