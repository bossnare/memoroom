export type SelectionModeActionKey = 'move' | 'delete';

export type BaseItem = {
  label: string;
  icon: React.ElementType;
};

export type SelectionModeLabel = BaseItem & {
  key: SelectionModeActionKey;
};

export type EditorToolbarItem = BaseItem & {
  action: () => void;
};
