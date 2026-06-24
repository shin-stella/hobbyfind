function trimEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function assertValidSupabaseUrl(url: string, source: string): string {
  if (url.startsWith('sb_publishable_') || url.startsWith('sb_secret_')) {
    throw new Error(
      `${source} appears to be an API key, not a project URL. Set it to https://<project-ref>.supabase.co in .env.local.`,
    );
  }

  if (!/^https?:\/\//i.test(url)) {
    throw new Error(
      `${source} must start with http:// or https://. Check .env.local configuration.`,
    );
  }

  return url;
}

export function getSupabaseUrl(): string {
  const url = trimEnv(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
  );

  if (!url) {
    throw new Error(
      'SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL is not set in .env.local',
    );
  }

  return assertValidSupabaseUrl(url, 'SUPABASE_URL');
}

export function getSupabaseAnonKey(): string {
  const key = trimEnv(
    process.env.SUPABASE_PUBLISHABLE_KEY ??
      process.env.SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!key) {
    throw new Error(
      'SUPABASE_PUBLISHABLE_KEY, SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in .env.local',
    );
  }

  return key;
}
