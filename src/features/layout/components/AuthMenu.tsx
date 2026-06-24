'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthMenuProps {
  className?: string;
  onNavigate?: () => void;
}

export function AuthMenu({ className, onNavigate }: AuthMenuProps) {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/mypage" onClick={onNavigate}>
            마이페이지
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onNavigate?.();
            signOut({ callbackUrl: '/' });
          }}
        >
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login" onClick={onNavigate}>
          로그인
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/signup" onClick={onNavigate}>
          회원가입
        </Link>
      </Button>
    </div>
  );
}
