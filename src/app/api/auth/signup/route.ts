import { NextResponse } from 'next/server';
import { z } from 'zod';

import { mapAuthError } from '@/features/auth/lib/map-auth-error';
import { createServiceRoleClient } from '@/lib/supabase/admin';

const usernameSchema = z
  .string()
  .min(2)
  .max(20)
  .regex(/^[a-zA-Z0-9_가-힣]+$/);

const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: usernameSchema,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: '입력값을 확인해 주세요.' },
        { status: 400 },
      );
    }

    const adminClient = createServiceRoleClient();
    const { username } = parsed.data;

    const { data: existingProfile, error: usernameLookupError } =
      await adminClient
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle();

    if (usernameLookupError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[signup] username lookup error:', usernameLookupError.message);
      }

      return NextResponse.json(
        { error: '회원가입 처리 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    if (existingProfile) {
      return NextResponse.json(
        { error: '이미 사용 중인 사용자명입니다.' },
        { status: 400 },
      );
    }

    const { data, error } = await adminClient.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      email_confirm: true,
      user_metadata: {
        username,
      },
    });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[signup] supabase error:', error.message);
      }

      return NextResponse.json(
        { error: mapAuthError(error.message) },
        { status: 400 },
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: '회원가입에 실패했습니다.' },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[signup]', error);
    }

    const message =
      error instanceof Error ? error.message : '회원가입 처리 중 오류가 발생했습니다.';

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? message
            : '회원가입 처리 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
