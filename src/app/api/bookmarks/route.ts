import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isValidHobbyId } from '@/features/hobby/lib/is-valid-hobby-id';
import { authOptions } from '@/lib/auth';
import { createServiceRoleClient } from '@/lib/supabase/admin';

const bookmarkBodySchema = z.object({
  hobbyId: z.string().min(1, '취미 ID가 필요합니다.'),
});

function validateHobbyId(hobbyId: string): string | null {
  if (!isValidHobbyId(hobbyId)) {
    return '유효하지 않은 취미입니다.';
  }

  return null;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const adminClient = createServiceRoleClient();
    const { data, error } = await adminClient
      .from('bookmarks')
      .select('hobby_id')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[bookmarks GET]', error.message);
      }

      return NextResponse.json(
        { error: '북마크 목록을 불러오지 못했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      hobbyIds: data.map((row) => row.hobby_id),
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[bookmarks GET]', error);
    }

    return NextResponse.json(
      { error: '북마크 목록을 불러오지 못했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = bookmarkBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? '입력값을 확인해 주세요.' },
        { status: 400 },
      );
    }

    const { hobbyId } = parsed.data;
    const hobbyError = validateHobbyId(hobbyId);

    if (hobbyError) {
      return NextResponse.json({ error: hobbyError }, { status: 400 });
    }

    const adminClient = createServiceRoleClient();
    const { error } = await adminClient.from('bookmarks').upsert(
      {
        user_id: session.user.id,
        hobby_id: hobbyId,
      },
      { onConflict: 'user_id,hobby_id', ignoreDuplicates: true },
    );

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[bookmarks POST]', error.message);
      }

      return NextResponse.json(
        { error: '북마크 저장에 실패했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ hobbyId });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[bookmarks POST]', error);
    }

    return NextResponse.json(
      { error: '북마크 저장에 실패했습니다.' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const hobbyId = new URL(request.url).searchParams.get('hobbyId');

    if (!hobbyId) {
      return NextResponse.json(
        { error: '취미 ID가 필요합니다.' },
        { status: 400 },
      );
    }

    const hobbyError = validateHobbyId(hobbyId);

    if (hobbyError) {
      return NextResponse.json({ error: hobbyError }, { status: 400 });
    }

    const adminClient = createServiceRoleClient();
    const { error } = await adminClient
      .from('bookmarks')
      .delete()
      .eq('user_id', session.user.id)
      .eq('hobby_id', hobbyId);

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[bookmarks DELETE]', error.message);
      }

      return NextResponse.json(
        { error: '북마크 해제에 실패했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ hobbyId });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[bookmarks DELETE]', error);
    }

    return NextResponse.json(
      { error: '북마크 해제에 실패했습니다.' },
      { status: 500 },
    );
  }
}
