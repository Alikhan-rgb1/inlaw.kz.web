-- 1. Create applications table (Таблица заявок)
create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  type text not null, -- 'company' or 'visa'
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  data jsonb not null
);

-- 2. Enable RLS
alter table applications enable row level security;

-- 3. Create admin_users table (Таблица администраторов)
create table if not exists admin_users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null
);

-- 4. Enable RLS for admin_users
alter table admin_users enable row level security;

-- 5. Policies (Удаляем старые перед созданием, чтобы не было ошибок)

-- Applications Policies
drop policy if exists "Users can insert their own applications" on applications;
create policy "Users can insert their own applications"
on applications for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can view their own applications" on applications;
create policy "Users can view their own applications"
on applications for select
using (auth.uid() = user_id);

drop policy if exists "Admins can view all applications" on applications;
create policy "Admins can view all applications"
on applications for select
using (
  exists (
    select 1 from admin_users where email = (auth.jwt() ->> 'email')
  )
);

drop policy if exists "Admins can update applications" on applications;
create policy "Admins can update applications"
on applications for update
using (
  exists (
    select 1 from admin_users where email = (auth.jwt() ->> 'email')
  )
);

-- Admin Users Policies
drop policy if exists "Read admin users" on admin_users;
create policy "Read admin users"
on admin_users for select
using (true);

-- 6. Insert Admin User (Добавляем вашего админа)
insert into admin_users (email) 
values ('admin@gmail.com')
on conflict (email) do nothing;

-- 7. Storage Setup (Настройка хранилища файлов)
-- Create bucket if not exists
insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

-- Storage Policies
-- Allow authenticated users to upload files
drop policy if exists "Authenticated users can upload documents" on storage.objects;
create policy "Authenticated users can upload documents"
on storage.objects for insert
with check ( bucket_id = 'documents' and auth.role() = 'authenticated' );

-- Allow users to view their own files (owner)
drop policy if exists "Users can view their own documents" on storage.objects;
create policy "Users can view their own documents"
on storage.objects for select
using ( bucket_id = 'documents' and auth.uid() = owner );

-- Allow admins to view ALL files
drop policy if exists "Admins can view all documents" on storage.objects;
create policy "Admins can view all documents"
on storage.objects for select
using ( 
  bucket_id = 'documents' 
  and exists (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) 
);
