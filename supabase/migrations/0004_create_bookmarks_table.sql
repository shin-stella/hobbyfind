-- User hobby bookmarks linked to Supabase Auth users
BEGIN;

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hobby_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT bookmarks_user_hobby_unique UNIQUE (user_id, hobby_id)
);

CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON public.bookmarks (user_id);
CREATE INDEX IF NOT EXISTS bookmarks_hobby_id_idx ON public.bookmarks (hobby_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'bookmarks_set_updated_at'
  ) THEN
    CREATE TRIGGER bookmarks_set_updated_at
    BEFORE UPDATE ON public.bookmarks
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
  END IF;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookmarks'
      AND policyname = 'Users can view own bookmarks'
  ) THEN
    CREATE POLICY "Users can view own bookmarks"
    ON public.bookmarks
    FOR SELECT
    USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookmarks'
      AND policyname = 'Users can insert own bookmarks'
  ) THEN
    CREATE POLICY "Users can insert own bookmarks"
    ON public.bookmarks
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookmarks'
      AND policyname = 'Users can delete own bookmarks'
  ) THEN
    CREATE POLICY "Users can delete own bookmarks"
    ON public.bookmarks
    FOR DELETE
    USING (auth.uid() = user_id);
  END IF;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

COMMIT;
