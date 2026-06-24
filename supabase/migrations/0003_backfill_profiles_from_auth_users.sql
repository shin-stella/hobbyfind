-- Backfill profiles for auth users created before the profiles trigger existed
BEGIN;

INSERT INTO public.profiles (id, email, username)
SELECT
  u.id,
  COALESCE(u.email, ''),
  COALESCE(
    u.raw_user_meta_data ->> 'username',
    split_part(COALESCE(u.email, ''), '@', 1)
  )
FROM auth.users AS u
WHERE NOT EXISTS (
  SELECT 1
  FROM public.profiles AS p
  WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
