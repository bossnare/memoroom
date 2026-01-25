export type SelectionActionKey = 'move' | 'delete';
export type EditorToolbarActionKey = 'bold' | 'heading' | 'italic';

export type ActionLabelBase = {
  label: string;
  icon: React.ElementType;
};

export type SelectionActionLabel = ActionLabelBase & {
  key: SelectionActionKey;
};

export type EditorToolbarActionLabel = ActionLabelBase & {
  key: EditorToolbarActionKey;
};
