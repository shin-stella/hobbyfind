'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  useIsBookmarked,
  useToggleBookmarkMutation,
} from '@/features/hobby/hooks/use-bookmarks';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  hobbyId: string;
  hobbyName: string;
  className?: string;
}

export function BookmarkButton({
  hobbyId,
  hobbyName,
  className,
}: BookmarkButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);
  const isBookmarked = useIsBookmarked(hobbyId, isAuthenticated);
  const toggleBookmarkMutation = useToggleBookmarkMutation();

  const handleClick = () => {
    if (!session?.user) {
      router.push('/login');
      return;
    }

    toggleBookmarkMutation.mutate(
      { hobbyId, isBookmarked },
      {
        onSuccess: ({ isAdded }) => {
          toast({
            description: isAdded
              ? `${hobbyName} 북마크 저장됨`
              : `${hobbyName} 북마크 해제됨`,
          });
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            description:
              error instanceof Error
                ? error.message
                : '북마크 처리에 실패했습니다.',
          });
        },
      },
    );
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? '북마크 해제' : '북마크 저장'}
      onClick={handleClick}
      disabled={toggleBookmarkMutation.isPending}
      className={cn(
        'rounded-full focus-visible:ring-primary',
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
