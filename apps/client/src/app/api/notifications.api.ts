import { fetcher } from '@/app/lib/fetcher';
import type { NotificationInterface } from '@/app/types/notification.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useNotification() {
  return useQuery<NotificationInterface[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await fetcher('/notifications');
      return res.data; // return {.., data}
    },
  });
}

export function useNotificationCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NotificationInterface[]>({
    queryKey: ['notifications'],
  });
}
