-- SAFE MIGRATION SCRIPT
-- Run this in Supabase SQL Editor to fix errors and deploy CMS tables.

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  image_url text,
  features text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  image_url text not null,
  description text,
  link text, -- Added link column
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  image_url text, -- Standardized to image_url instead of photo_url if needed, but UI uses photo_url. Let's fix UI match.
  photo_url text, -- Keeping photo_url to match UI
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Safe to run multiple times)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- POLICIES (Drop first to avoid "policy already exists" error)

-- Services
DROP POLICY IF EXISTS "Allow public read access for services" ON public.services;
CREATE POLICY "Allow public read access for services" ON public.services FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for services" ON public.services;
CREATE POLICY "Allow admin full access for services" ON public.services FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com') WITH CHECK (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');

-- Portfolio
DROP POLICY IF EXISTS "Allow public read access for portfolio" ON public.portfolio_projects;
CREATE POLICY "Allow public read access for portfolio" ON public.portfolio_projects FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for portfolio" ON public.portfolio_projects;
CREATE POLICY "Allow admin full access for portfolio" ON public.portfolio_projects FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com') WITH CHECK (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');

-- Team
DROP POLICY IF EXISTS "Allow public read access for team" ON public.team_members;
CREATE POLICY "Allow public read access for team" ON public.team_members FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for team" ON public.team_members;
CREATE POLICY "Allow admin full access for team" ON public.team_members FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com') WITH CHECK (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');

-- Messages
DROP POLICY IF EXISTS "Allow public insert for messages" ON public.messages;
CREATE POLICY "Allow public insert for messages" ON public.messages FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin full access for messages" ON public.messages;
CREATE POLICY "Allow admin full access for messages" ON public.messages FOR ALL TO authenticated USING (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com') WITH CHECK (auth.jwt() ->> 'email' = 'aganyawiseman@gmail.com');
