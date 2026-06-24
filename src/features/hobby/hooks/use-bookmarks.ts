'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addBookmark,
  fetchBookmarks,
  removeBookmark,
} from '@/features/hobby/api';

export const bookmarksQueryKey = ['bookmarks'] as const;

export function useBookmarksQuery(enabled = true) {
  return useQuery({
    queryKey: bookmarksQueryKey,
    queryFn: async () => {
      const result = await fetchBookmarks();

      if (result.success === false) {
        throw new Error(result.error);
      }

      return result.hobbyIds;
    },
    enabled,
  });
}

export function useIsBookmarked(hobbyId: string, enabled = true) {
  const { data: hobbyIds = [] } = useBookmarksQuery(enabled);
  return hobbyIds.includes(hobbyId);
}

export function useToggleBookmarkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      hobbyId,
      isBookmarked,
    }: {
      hobbyId: string;
      isBookmarked: boolean;
    }) => {
      const result = isBookmarked
        ? await removeBookmark(hobbyId)
        : await addBookmark(hobbyId);

      if (result.success === false) {
        throw new Error(result.error);
      }

      return { hobbyId, isAdded: !isBookmarked };
    },
    onMutate: async ({ hobbyId, isBookmarked }) => {
      await queryClient.cancelQueries({ queryKey: bookmarksQueryKey });

      const previousHobbyIds = queryClient.getQueryData<string[]>(
        bookmarksQueryKey,
      );

      queryClient.setQueryData<string[]>(bookmarksQueryKey, (current = []) => {
        if (isBookmarked) {
          return current.filter((id) => id !== hobbyId);
        }

        return current.includes(hobbyId) ? current : [...current, hobbyId];
      });

      return { previousHobbyIds };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousHobbyIds) {
        queryClient.setQueryData(bookmarksQueryKey, context.previousHobbyIds);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksQueryKey });
    },
  });
}
