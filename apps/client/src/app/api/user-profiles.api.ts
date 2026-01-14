import { fetcher } from '@/app/lib/fetcher';
import type { UserInterface } from '@/app/types/user.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserProfile() {
  return useQuery<UserInterface>({
    queryKey: ['user-profiles'],
    queryFn: async () => {
      const res = await fetcher('/profiles/me');
      return res.data; // return {.., data}
    },
  });
}

export function useUserProfileCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<UserInterface>({
    queryKey: ['user-profiles'],
  });
}
