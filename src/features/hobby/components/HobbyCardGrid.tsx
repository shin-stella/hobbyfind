'use client';

import { HobbyCard } from '@/features/hobby/components/HobbyCard';
import type { Hobby } from '@/features/hobby/types';
import { cn } from '@/lib/utils';

interface HobbyCardGridProps {
  hobbies: Hobby[];
  className?: string;
}

export function HobbyCardGrid({ hobbies, className }: HobbyCardGridProps) {
  if (hobbies.length === 0) {
    return (
      <p className="py-16 text-center text-textMuted">
        선택한 카테고리에 해당하는 취미가 없습니다.
      </p>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {hobbies.map((hobby) => (
        <HobbyCard key={hobby.id} hobby={hobby} />
      ))}
    </div>
  );
}
