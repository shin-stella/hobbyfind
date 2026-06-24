'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchUserProfile, updateUsername } from '@/features/mypage/api';

export const profileQueryKey = ['profile'] as const;

export function useProfileQuery() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: async () => {
      const result = await fetchUserProfile();

      if (result.success === false) {
        throw new Error(result.error);
      }

      return result.profile;
    },
  });
}

export function useUpdateUsernameMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      const result = await updateUsername(username);

      if (result.success === false) {
        throw new Error(result.error);
      }

      return result.username;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });
}
