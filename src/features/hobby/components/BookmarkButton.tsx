'use client';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useBookmarkToggle } from '@/features/hobby/hooks/use-bookmark-toggle';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  hobbyId: string;
  hobbyName: string;
  className?: string;
  stopPropagation?: boolean;
}

export function BookmarkButton({
  hobbyId,
  hobbyName,
  className,
  stopPropagation = false,
}: BookmarkButtonProps) {
  const { isBookmarked, isPending, toggleBookmark } = useBookmarkToggle(
    hobbyId,
    hobbyName,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    toggleBookmark();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? '북마크 해제' : '북마크 저장'}
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        'rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white focus-visible:ring-primary',
        isBookmarked && 'text-primary hover:text-primary',
        className,
      )}
    >
      <Heart
        className={cn('h-5 w-5', isBookmarked && 'fill-primary text-primary')}
      />
    </Button>
  );
}
