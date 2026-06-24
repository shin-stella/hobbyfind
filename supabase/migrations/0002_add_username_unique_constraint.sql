-- Enforce unique usernames on profiles
BEGIN;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_unique_idx
ON public.profiles (username)
WHERE username IS NOT NULL;

COMMIT;
