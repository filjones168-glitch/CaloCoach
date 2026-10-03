-- CaloCoach data model. Run in Supabase SQL editor when connecting a real backend.
-- The browser MVP currently uses NutritionStore in localStorage so the core experience
-- remains usable without credentials or an external service.

create extension if not exists "pgcrypto";

create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  first_name text not null,
  age smallint check (age between 13 and 120),
  sex text check (sex in ('female', 'male', 'other')),
  height numeric not null,
  height_unit text not null default 'cm' check (height_unit in ('cm', 'in')),
  weight numeric not null,
  weight_unit text not null default 'kg' check (weight_unit in ('kg', 'lb')),
  activity_level text not null default 'moderate',
  goal text not null default 'lose' check (goal in ('lose', 'maintain', 'gain')),
  goal_weight numeric,
  desired_pace text,
  maintenance_calories integer,
  daily_calorie_target integer,
  dietary_preferences text,
  allergies text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.foods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  calories numeric not null check (calories >= 0),
  protein numeric default 0,
  carbs numeric default 0,
  fat numeric default 0,
  serving_size numeric,
  serving_unit text,
  created_at timestamptz not null default now()
);

create table if not exists public.food_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  food_id uuid references public.foods(id),
  food_name text not null,
  quantity numeric not null default 1 check (quantity > 0),
  calories numeric not null check (calories >= 0),
  protein numeric default 0,
  carbs numeric default 0,
  fat numeric default 0,
  meal_type text not null check (meal_type in ('Breakfast', 'Lunch', 'Snack', 'Dinner')),
  logged_at timestamptz not null default now(),
  source text not null default 'manual' check (source in ('manual', 'search', 'ai_photo', 'quick_add'))
);

create table if not exists public.weight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  weight numeric not null check (weight > 0),
  unit text not null default 'kg' check (unit in ('kg', 'lb')),
  logged_at timestamptz not null default now()
);

create table if not exists public.favorite_foods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  food_id uuid not null references public.foods(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, food_id)
);

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;
alter table public.food_logs enable row level security;
alter table public.weight_logs enable row level security;
alter table public.favorite_foods enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;

create policy "Users can manage their profile" on public.user_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage their food logs" on public.food_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage their weight logs" on public.weight_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage their favorites" on public.favorite_foods
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage their conversations" on public.ai_conversations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage messages in their conversations" on public.ai_messages
  for all using (auth.uid() = (select user_id from public.ai_conversations where id = conversation_id));

-- Food catalog is public to signed-in users; writes should be performed by a trusted seed job.
alter table public.foods enable row level security;
create policy "Signed-in users can read foods" on public.foods
  for select using (auth.role() = 'authenticated');
