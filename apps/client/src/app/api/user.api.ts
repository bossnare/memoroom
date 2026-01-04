import { fetcher } from '@/app/lib/fetcher';
import type { NoteInterface } from '@/app/types/note.interface';

import { useQuery, useQueryClient } from '@tanstack/react-query';

type NoteResponse = {
  data: NoteInterface[];
};

export function useMe() {
  return useQuery<NoteResponse>({
    queryKey: ['notes'],
    queryFn: async () => fetcher('/notes'),
    staleTime: 0,
    gcTime: 2 * 60 * 100, // 2min
    refetchOnWindowFocus: true,
  });
}

export function useMeCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NoteResponse>({
    queryKey: ['notes'],
  });
}
