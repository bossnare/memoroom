import { fetcher } from '@/app/lib/fetcher';
import type { UserInterface } from '@/app/types/user.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type UseMeResponse = {
  data: UserInterface;
};

export function useMe() {
  return useQuery<UseMeResponse>({
    queryKey: ['me'],
    queryFn: async () => fetcher('/users/me'),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMeCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<UseMeResponse>({
    queryKey: ['me'],
  });
}
