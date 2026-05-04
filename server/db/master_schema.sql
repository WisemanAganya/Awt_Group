-- MASTER SCHEMA SCRIPT (Unified)
-- This script sets up the entire database for the AWT Group Website.
-- It is idempotent: safe to run multiple times.

-- ==============================================================================
-- 1. AUTHENTICATION & USERS (Base Setup)
-- ==============================================================================

-- Create a table for public user profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'user',
  avatar_url text,
  updated_at timestamp with time zone,
  constraint username_length check (char_length(email) >= 3)
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==============================================================================
-- 2. AUDIT LOGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid default gen_random_uuid() primary key, -- Use gen_random_uuid() which is standard in Supabase
  user_id uuid references auth.users,
  action text not null,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
DROP POLICY IF EXISTS "Admins can view all logs" ON public.audit_logs;
CREATE POLICY "Admins can view all logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Authenticated users can insert logs" ON public.audit_logs;
CREATE POLICY "Authenticated users can insert logs" ON public.audit_logs
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id); -- Users can log their own actions

-- ==============================================================================
-- 3. CMS CONTENT (Dynamic Tables)
-- ==============================================================================

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text,
  image_url text,
  features text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  image_url text not null,
  description text,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  image_url text, -- Standardized
  photo_url text, -- Legacy support for UI
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- System Settings Table (New)
CREATE TABLE IF NOT EXISTS public.system_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Page Content Table (CMS)
CREATE TABLE IF NOT EXISTS public.page_content (
  section_slug text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Products Table (New for BizTracker and Twende)
CREATE TABLE IF NOT EXISTS public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  status text default 'Active',
  subscriptions integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for CMS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- CMS Policies (Public Read, Admin Full Access)

-- Helper policy logic for Admins
-- We will use a standard check for all admin policies

-- Products
DROP POLICY IF EXISTS "Allow public read access for products" ON public.products;
CREATE POLICY "Allow public read access for products" ON public.products FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for products" ON public.products;
CREATE POLICY "Allow admin full access for products" ON public.products FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));


-- CMS Policies (Public Read, Admin Full Access)

-- Helper policy logic for Admins
-- We will use a standard check for all admin policies

-- Services
DROP POLICY IF EXISTS "Allow public read access for services" ON public.services;
CREATE POLICY "Allow public read access for services" ON public.services FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for services" ON public.services;
CREATE POLICY "Allow admin full access for services" ON public.services FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Portfolio
DROP POLICY IF EXISTS "Allow public read access for portfolio" ON public.portfolio_projects;
CREATE POLICY "Allow public read access for portfolio" ON public.portfolio_projects FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for portfolio" ON public.portfolio_projects;
CREATE POLICY "Allow admin full access for portfolio" ON public.portfolio_projects FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Team
DROP POLICY IF EXISTS "Allow public read access for team" ON public.team_members;
CREATE POLICY "Allow public read access for team" ON public.team_members FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for team" ON public.team_members;
CREATE POLICY "Allow admin full access for team" ON public.team_members FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Messages
DROP POLICY IF EXISTS "Allow public insert for messages" ON public.messages;
CREATE POLICY "Allow public insert for messages" ON public.messages FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin full access for messages" ON public.messages;
CREATE POLICY "Allow admin full access for messages" ON public.messages FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- System Settings
DROP POLICY IF EXISTS "Allow public read access for settings" ON public.system_settings;
CREATE POLICY "Allow public read access for settings" ON public.system_settings FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for settings" ON public.system_settings;
CREATE POLICY "Allow admin full access for settings" ON public.system_settings FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Page Content
DROP POLICY IF EXISTS "Allow public read access for content" ON public.page_content;
CREATE POLICY "Allow public read access for content" ON public.page_content FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow admin full access for content" ON public.page_content;
CREATE POLICY "Allow admin full access for content" ON public.page_content FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- SEED DATA FOR PAGE CONTENT
INSERT INTO public.page_content (section_slug, content)
VALUES 
('home_hero', '{"title": "Web & Mobile Application Systems", "subtitle": "Addressing challenges and solutions for economic development through innovative technology.", "cta_text": "Get Started", "cta_link": "/contact"}'),
('home_stats', '{"years": "10+", "projects": "150+", "clients": "80+", "team": "50+"}'),
('contact_info', '{"email": "info@awtgroup.com", "phone": "+256 700 000 000", "address": "Kampala, Uganda"}'),
('about_content', '{"mission": "To empower businesses and curious minds through innovative technology solutions, education, and strategic consultancy, fostering growth and efficiency in the digital age.", "vision": "To be the leading catalyst for technological advancement and digital transformation, recognizing and nurturing potential to create lasting impact."}')
ON CONFLICT (section_slug) DO NOTHING;



-- ==============================================================================
-- 4. STORAGE CONFIGURATION
-- ==============================================================================

-- Create 'images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies

-- Public Read
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'images' );

-- Admin Upload/Update/Delete
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT TO authenticated 
WITH CHECK ( bucket_id = 'images' AND EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin') );

DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE TO authenticated 
USING ( bucket_id = 'images' AND EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin') );

DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE TO authenticated 
USING ( bucket_id = 'images' AND EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin') );
