import type { UserInterface } from '@/app/types/user.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as userApi from '@/app/api/user.api';

export function useUser() {
  return useQuery<UserInterface>({
    queryKey: ['user'],
    queryFn: () => userApi.getUser(),
  });
}

export function useUserProfile(username?: string) {
  return useQuery<UserInterface>({
    queryKey: ['user-profile'],
    queryFn: () => userApi.getUserProfile(username),
    enabled: !!username,
  });
}

export function useUserCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<UserInterface>({
    queryKey: ['user-profiles'],
  });
}
