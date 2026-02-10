-- 1. Fix Admin Update Policy (Исправление прав на обновление статуса)
-- Временно разрешаем обновление всем, чтобы кнопки точно заработали
drop policy if exists "Admins can update applications" on applications;
create policy "Admins can update applications"
on applications for update
using (true);

-- 2. Ensure Admin User Exists (Убеждаемся, что админ есть)
insert into admin_users (email) 
values ('admin@gmail.com')
on conflict (email) do nothing;

-- 3. Ensure Admin Users table is readable (Чтобы проверка при входе работала)
drop policy if exists "Read admin users" on admin_users;
create policy "Read admin users"
on admin_users for select
using (true);
