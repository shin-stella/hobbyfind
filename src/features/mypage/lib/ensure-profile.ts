import type { SupabaseClient } from '@supabase/supabase-js';

export type ProfileRow = {
  username: string | null;
  email: string;
  created_at: string;
};

function resolveUsernameFromMetadata(
  userMetadata: Record<string, unknown> | undefined,
  email: string | undefined,
): string | null {
  const fromMetadata = userMetadata?.username;

  if (typeof fromMetadata === 'string' && fromMetadata.length > 0) {
    return fromMetadata;
  }

  if (email) {
    return email.split('@')[0] ?? null;
  }

  return null;
}

export async function ensureUserProfile(
  adminClient: SupabaseClient,
  userId: string,
): Promise<{ profile: ProfileRow | null; error: string | null }> {
  const { data: existing, error: fetchError } = await adminClient
    .from('profiles')
    .select('username, email, created_at')
    .eq('id', userId)
    .maybeSingle();

  if (fetchError) {
    return { profile: null, error: fetchError.message };
  }

  if (existing) {
    return { profile: existing, error: null };
  }

  const { data: authData, error: authError } =
    await adminClient.auth.admin.getUserById(userId);

  if (authError || !authData.user) {
    return { profile: null, error: authError?.message ?? 'User not found' };
  }

  const email = authData.user.email ?? '';
  const username = resolveUsernameFromMetadata(
    authData.user.user_metadata,
    authData.user.email,
  );

  const { data: created, error: insertError } = await adminClient
    .from('profiles')
    .insert({ id: userId, email, username })
    .select('username, email, created_at')
    .single();

  if (insertError) {
    return { profile: null, error: insertError.message };
  }

  return { profile: created, error: null };
}
