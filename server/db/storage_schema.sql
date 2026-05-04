-- Create a new private bucket called 'images'
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Policy: Public Read
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Policy: Admin Upload (Authenticated Users)
-- Since we only have one admin user, any authenticated user is the admin.
drop policy if exists "Admin Upload" on storage.objects;
create policy "Admin Upload"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'images' );

-- Policy: Admin Update
drop policy if exists "Admin Update" on storage.objects;
create policy "Admin Update"
  on storage.objects for update
  to authenticated
  using ( bucket_id = 'images' );

-- Policy: Admin Delete
drop policy if exists "Admin Delete" on storage.objects;
create policy "Admin Delete"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'images' );
