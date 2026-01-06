import { t } from 'elysia';

export const NotesQuery = t.Object({
  sort: t.Optional(
    t.Union([
      t.Literal('createdAt'),
      t.Literal('updatedAt'),
      t.Literal('title'),
    ])
  ),
  order: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')])),
});

export type NotesQueryType = typeof NotesQuery.static;
