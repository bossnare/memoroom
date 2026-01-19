import { fetcher } from '@/app/lib/fetcher';
import type { NoteInterface, CreateNote } from '@/app/types/note.interface';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import * as noteApi from '@/app/api/note.api';

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

export function useCreateNote() {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data: CreateNote) => noteApi.createNote(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return create;
}

export function useUpdateNote() {
  const qc = useQueryClient();

  useMutation({
    mutationFn: ({ id, data }: { id: string; data: NoteInterface }) =>
      noteApi.updateNote(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useSoftDeleteMany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, string[]>) =>
      noteApi.softDeleteMany(data),
    onSuccess: () => {
      qc.refetchQueries({ queryKey: ['notes'] });
    },
  });
}

export function useNoteCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<NoteInterface[]>({
    queryKey: ['notes'],
  });
}
