import { fetcher } from '@/app/lib/fetcher';
import type { NoteInterface } from '@/app/types/note.interface';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useNote() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? 'updatedAt';
  const order = searchParams.get('order') ?? 'desc';
  const params = new URLSearchParams();
  params.set('sort', sort);
  params.set('order', order);

  return useQuery<NoteInterface[]>({
    queryKey: ['notes', sort, order],
    queryFn: async () => {
      const res = await fetcher(`/notes?${params}`);
      return res.data; // return {.., data}
    },
    staleTime: 0,
  });
}

export function useNoteCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NoteInterface[]>({
    queryKey: ['notes'],
  });
}
