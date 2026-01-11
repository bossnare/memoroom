import { fetcher } from '@/app/lib/fetcher';
import type { NoteInterface } from '@/app/types/note.interface';
import { useQuery } from '@tanstack/react-query';

export function useNoteId(id?: string) {
  return useQuery<NoteInterface>({
    queryKey: ['notes', id],
    queryFn: async () => {
      const res = await fetcher(`/notes/${id}`);
      return res.data; // return {.., data}
    },
    enabled: !!id,
  });
}
