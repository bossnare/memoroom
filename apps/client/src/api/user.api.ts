import { fetcher } from '@/lib/fetcher';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { UserInterface } from '@/types/user.interface';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => fetcher('/users/me'),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUserCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<UserInterface>({
    queryKey: ['user'],
  });
}
