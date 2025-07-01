
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create users profile table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create registries table
create table public.registries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  event_type text not null,
  event_date date not null,
  message text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create registry items table
create table public.registry_items (
  id uuid default uuid_generate_v4() primary key,
  registry_id uuid references public.registries(id) on delete cascade not null,
  name text not null,
  description text,
  quantity integer default 1,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create reservations table
create table public.reservations (
  id uuid default uuid_generate_v4() primary key,
  registry_item_id uuid references public.registry_items(id) on delete cascade not null,
  guest_name text not null,
  guest_email text,
  guest_phone text,
  quantity_reserved integer default 1,
  message text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.registries enable row level security;
alter table public.registry_items enable row level security;
alter table public.reservations enable row level security;

-- Create policies for profiles
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Create policies for registries
create policy "Users can view own registries" on public.registries
  for select using (auth.uid() = user_id);

create policy "Users can create registries" on public.registries
  for insert with check (auth.uid() = user_id);

create policy "Users can update own registries" on public.registries
  for update using (auth.uid() = user_id);

create policy "Public can view active registries" on public.registries
  for select using (is_active = true);

-- Create policies for registry items
create policy "Registry owners can manage items" on public.registry_items
  for all using (
    exists (
      select 1 from public.registries
      where registries.id = registry_items.registry_id
      and registries.user_id = auth.uid()
    )
  );

create policy "Public can view registry items" on public.registry_items
  for select using (
    exists (
      select 1 from public.registries
      where registries.id = registry_items.registry_id
      and registries.is_active = true
    )
  );

-- Create policies for reservations
create policy "Anyone can create reservations" on public.reservations
  for insert with check (true);

create policy "Registry owners can view reservations" on public.reservations
  for select using (
    exists (
      select 1 from public.registry_items
      join public.registries on registries.id = registry_items.registry_id
      where registry_items.id = reservations.registry_item_id
      and registries.user_id = auth.uid()
    )
  );

-- Create triggers for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger handle_registries_updated_at
  before update on public.registries
  for each row execute function public.handle_updated_at();

create trigger handle_registry_items_updated_at
  before update on public.registry_items
  for each row execute function public.handle_updated_at();

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
