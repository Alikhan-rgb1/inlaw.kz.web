-- Удаляем ограничение (constraint), если оно есть и мешает
alter table applications drop constraint if exists applications_status_check;

-- Добавляем правильное ограничение (если нужно, или можно вообще без него)
alter table applications add constraint applications_status_check 
check (status in ('pending', 'approved', 'rejected'));
