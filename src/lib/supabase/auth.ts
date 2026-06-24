import { createServerClient } from '@supabase/ssr';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';

export function createAuthClient() {
  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
