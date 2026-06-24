import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { usernameSchema } from '@/features/auth/constants/auth-schemas';
import { mapAuthError } from '@/features/auth/lib/map-auth-error';
import { ensureUserProfile } from '@/features/mypage/lib/ensure-profile';
import { authOptions } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/admin';

const updateProfileSchema = z.object({
  username: usernameSchema,
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const adminClient = createServiceRoleClient();
    const { profile, error } = await ensureUserProfile(
      adminClient,
      session.user.id,
    );

    if (error || !profile) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[profile GET]', error);
      }

      return NextResponse.json(
        { error: '프로필 정보를 불러오지 못했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      username: profile.username,
      email: profile.email,
      createdAt: profile.created_at,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[profile GET]', error);
    }

    return NextResponse.json(
      { error: '프로필 정보를 불러오지 못했습니다.' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? '입력값을 확인해 주세요.' },
        { status: 400 },
      );
    }

    const { username } = parsed.data;
    const adminClient = createServiceRoleClient();

    const { profile: currentProfile, error: profileFetchError } =
      await ensureUserProfile(adminClient, session.user.id);

    if (profileFetchError || !currentProfile) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[profile PATCH] profile fetch:', profileFetchError);
      }

      return NextResponse.json(
        { error: '프로필 정보를 불러오지 못했습니다.' },
        { status: 500 },
      );
    }

    if (username === currentProfile.username) {
      return NextResponse.json({ username });
    }

    const { data: existingProfile, error: usernameLookupError } =
      await adminClient
        .from('profiles')
        .select('id')
        .eq('username', username)
        .neq('id', session.user.id)
        .maybeSingle();

    if (usernameLookupError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[profile PATCH] username lookup:', usernameLookupError.message);
      }

      return NextResponse.json(
        { error: '사용자명 변경 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    if (existingProfile) {
      return NextResponse.json(
        { error: '이미 사용 중인 사용자명입니다.' },
        { status: 400 },
      );
    }

    const previousUsername = currentProfile.username;

    const { error: profileUpdateError } = await adminClient
      .from('profiles')
      .update({ username })
      .eq('id', session.user.id);

    if (profileUpdateError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[profile PATCH] profile update:', profileUpdateError.message);
      }

      return NextResponse.json(
        { error: mapAuthError(profileUpdateError.message) },
        { status: 400 },
      );
    }

    const { error: authUpdateError } =
      await adminClient.auth.admin.updateUserById(session.user.id, {
        user_metadata: { username },
      });

    if (authUpdateError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[profile PATCH] auth update:', authUpdateError.message);
      }

      await adminClient
        .from('profiles')
        .update({ username: previousUsername })
        .eq('id', session.user.id);

      return NextResponse.json(
        { error: '사용자명 변경 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ username });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[profile PATCH]', error);
    }

    return NextResponse.json(
      { error: '사용자명 변경 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
