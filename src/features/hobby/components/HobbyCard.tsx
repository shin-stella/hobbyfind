'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { CategoryBadge } from '@/features/hobby/components/CategoryBadge';
import { useBookmarkToggle } from '@/features/hobby/hooks/use-bookmark-toggle';
import type { Hobby } from '@/features/hobby/types';
import { cn } from '@/lib/utils';

interface HobbyCardProps {
  hobby: Hobby;
  className?: string;
}

export function HobbyCard({ hobby, className }: HobbyCardProps) {
  const { isBookmarked, isPending, toggleBookmark } = useBookmarkToggle(
    hobby.id,
    hobby.name,
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    toggleBookmark();
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={isBookmarked}
      aria-label={
        isBookmarked
          ? `${hobby.name} 북마크 해제`
          : `${hobby.name} 북마크 저장`
      }
      aria-disabled={isPending}
      onClick={toggleBookmark}
      onKeyDown={handleKeyDown}
      className={cn(
        'group flex cursor-pointer flex-col overflow-hidden rounded-2xl border-border bg-white shadow-md transition-shadow duration-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isPending && 'pointer-events-none opacity-70',
        className,
      )}
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-bgMuted">
        <Image
          src={hobby.thumbnail}
          alt={hobby.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3">
          <CategoryBadge
            category={hobby.category}
            className="shadow-sm backdrop-blur-sm"
          />
          <span
            aria-hidden
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm',
              isBookmarked && 'text-primary',
            )}
          >
            <Heart
              className={cn(
                'h-3.5 w-3.5',
                isBookmarked && 'fill-primary text-primary',
              )}
            />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-white px-4 py-3">
        <h3 className="text-base font-semibold leading-snug text-black">
          {hobby.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-black/80">
          {hobby.description}
        </p>
      </div>
    </Card>
  );
}
