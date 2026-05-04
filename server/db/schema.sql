-- Create a table for public user profiles
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'user',
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(email) >= 3)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create a table for audit logs
create table if not exists public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  action text not null,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.audit_logs enable row level security;

-- Only admins can view logs (policy depends on implementation, simpler to manage via backend service role for now)
drop policy if exists "Admins can view all logs" on public.audit_logs;
create policy "Admins can view all logs" on public.audit_logs
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
