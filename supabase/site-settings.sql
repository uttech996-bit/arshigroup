-- ARSHI GROUP global branding settings
-- Run once in Supabase SQL Editor.

create table if not exists public.site_settings (
  id boolean primary key default true check (id = true),
  light_logo_url text not null default '/brand/arshi-light.svg',
  dark_logo_url text not null default '/brand/arshi-dark.svg',
  icon_logo_url text not null default '/brand/arshi-icon.svg',
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

insert into public.site_settings (id)
values (true)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

 drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (true);

 drop policy if exists "site_settings_staff_insert" on public.site_settings;
create policy "site_settings_staff_insert"
  on public.site_settings for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('super_admin','admin','manager','editor','support_agent')
    )
  );

 drop policy if exists "site_settings_staff_update" on public.site_settings;
create policy "site_settings_staff_update"
  on public.site_settings for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('super_admin','admin','manager','editor','support_agent')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('super_admin','admin','manager','editor','support_agent')
    )
  );

create index if not exists idx_site_settings_updated_by on public.site_settings(updated_by);
