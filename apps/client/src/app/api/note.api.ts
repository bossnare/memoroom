import type * as Note from '@/app/types/note.type';
import api from '../lib/api';
import { fetcher } from '../lib/fetcher';

export const getNotes = async (params?: URLSearchParams) => {
  const res = await fetcher(`/notes?${params}`);
  return res.data; // return {.., data}
};

export const getNoteById = async (id?: string) => {
  const res = await fetcher(`/notes/${id}`);
  return res.data; // return {.., data}
};

export const createNote = async (data: Note.Create) => {
  const res = await api.post('/notes', data);

  return res.data;
};

export const updateNote = async (id: string, data: Note.Update) => {
  const res = await api.patch(`/notes/${id}`, data);

  return res.data;
};

export const updateManyNote = async (dataId: string[]) => {
  const res = await api.patch('/notes', {
    ids: dataId,
  });

  return res.data;
};

export const softDeleteOne = async (id: string) => {
  const res = await api.patch(`/notes/${id}`);

  return res.data;
};

export const softDeleteMany = async (data: Record<string, string[]>) => {
  const res = await api.patch('/notes', data);

  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);

  return res.data;
};
// export const deleteManyNote = (dataId: string[]) =>
//   api.delete('/notes', {
//     ids: dataId,
//   });
