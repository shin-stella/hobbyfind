'use client';

import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { BookmarkButton } from '@/features/hobby/components/BookmarkButton';
import { CategoryBadge } from '@/features/hobby/components/CategoryBadge';
import type { Hobby } from '@/features/hobby/types';
import { cn } from '@/lib/utils';

interface HobbyCardProps {
  hobby: Hobby;
  className?: string;
}

export function HobbyCard({ hobby, className }: HobbyCardProps) {
  return (
    <Card
      className={cn(
        'group overflow-hidden rounded-2xl border-border shadow-md transition-shadow duration-200 hover:shadow-lg',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bgMuted">
        <Image
          src={hobby.thumbnail}
          alt={hobby.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 active:opacity-90"
        />
      </div>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text">{hobby.name}</h3>
          <CategoryBadge category={hobby.category} />
        </div>
        <BookmarkButton hobbyId={hobby.id} hobbyName={hobby.name} />
      </CardContent>
    </Card>
  );
}
