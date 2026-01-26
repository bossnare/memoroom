import type * as Note from '@/app/types/note.type';

import * as noteApi from '@/app/api/note.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export function useNote() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? 'updatedAt';
  const order = searchParams.get('order') ?? 'desc';
  const params = new URLSearchParams();
  params.set('sort', sort);
  params.set('order', order);

  return useQuery<Note.NoteInterface[]>({
    queryKey: ['notes', sort, order],
    queryFn: () => noteApi.getNotes(params),
    staleTime: 0,
  });
}

export function useNoteId(id?: string) {
  return useQuery<Note.NoteInterface>({
    queryKey: ['notes', id],
    queryFn: () => noteApi.getNoteById(id),
    enabled: !!id,
    staleTime: 0,
  });
}

export function useCreateNote() {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data: Note.Create) => noteApi.createNote(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return create;
}

export function useUpdateNote() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Note.Update }) =>
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
  return queryClient.getQueriesData<Note.NoteInterface[]>({
    queryKey: ['notes'],
  });
}
