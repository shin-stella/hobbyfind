'use client';

import Link from 'next/link';
import { Bookmark } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HobbyCardGrid } from '@/features/hobby/components/HobbyCardGrid';
import type { Hobby } from '@/features/hobby/types';
import { cn } from '@/lib/utils';

interface BookmarkListProps {
  hobbies: Hobby[];
  className?: string;
}

export function BookmarkList({ hobbies, className }: BookmarkListProps) {
  if (hobbies.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-bgMuted py-16 text-center',
          className,
        )}
      >
        <Bookmark className="mb-4 h-12 w-12 text-textMuted" aria-hidden />
        <h3 className="mb-2 text-lg font-semibold text-text">
          저장한 취미가 없습니다
        </h3>
        <p className="mb-6 max-w-sm text-sm leading-6 text-textMuted">
          관심 있는 취미를 북마크하면 여기에서 한눈에 확인할 수 있습니다.
        </p>
        <Button asChild>
          <Link href="/">취미 탐색하기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <header className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-text">
          북마크 목록
        </h2>
        <p className="mt-1 text-sm text-textMuted">
          저장한 취미 {hobbies.length}개
        </p>
      </header>
      <HobbyCardGrid hobbies={hobbies} />
    </div>
  );
}
