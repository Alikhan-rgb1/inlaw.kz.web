-- Добавляем колонку user_info в таблицу applications
alter table applications 
add column if not exists user_info jsonb default '{}'::jsonb;
