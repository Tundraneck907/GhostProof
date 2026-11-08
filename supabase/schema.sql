-- Run in Supabase SQL Editor
create table if not exists clients (id uuid primary key default gen_random_uuid(), name text not null, phone text, email text, created_at timestamptz default now());
create table if not exists invoices (id uuid primary key default gen_random_uuid(), client_id uuid references clients(id), amount numeric not null, due_date date, status text default 'open', response_hours int, deposit text, tone text, history text, ghost_raw numeric, ghost_final numeric, ghost_band text, created_at timestamptz default now());
create table if not exists followups (id uuid primary key default gen_random_uuid(), invoice_id uuid references invoices(id), channel text, day int, message text, sent_at timestamptz default now());
alter table clients enable row level security;
alter table invoices enable row level security;
alter table followups enable row level security;
create policy "allow all for demo" on clients for all using (true) with check (true);
create policy "allow all for demo" on invoices for all using (true) with check (true);
create policy "allow all for demo" on followups for all using (true) with check (true);
