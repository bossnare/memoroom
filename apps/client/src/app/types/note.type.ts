import type { JSONContent } from '@tiptap/react';

export interface NoteInterface {
  id: string;
  title: string;
  content: JSONContent;
  edited: boolean;
  numberOfEdits: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type Create = {
  title: string;
  content: JSONContent;
  color?: string;
};

export type Update = Partial<NoteInterface>; // for softDelete, updateNote, ...
