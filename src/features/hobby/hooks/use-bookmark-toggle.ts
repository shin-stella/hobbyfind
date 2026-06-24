'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  useIsBookmarked,
  useToggleBookmarkMutation,
} from '@/features/hobby/hooks/use-bookmarks';
import { useToast } from '@/hooks/use-toast';

export function useBookmarkToggle(hobbyId: string, hobbyName: string) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);
  const isBookmarked = useIsBookmarked(hobbyId, isAuthenticated);
  const toggleBookmarkMutation = useToggleBookmarkMutation();

  const toggleBookmark = () => {
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

  return {
    isBookmarked,
    isPending: toggleBookmarkMutation.isPending,
    toggleBookmark,
  };
}
