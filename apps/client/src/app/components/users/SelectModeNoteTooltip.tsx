import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { Folder, Trash2 } from 'lucide-react';

export type ActionKey = 'move' | 'delete';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  onAction?: (actionKey: ActionKey) => void;
};

export function SelectModeNoteTooltip({
  onAction,
  className,
  disabled,
}: Props) {
  const buttonSize = useButtonSize({ mobile: 'lg', landscape: 'default' });
  const toolTipLabel = [
    {
      id: 1,
      label: 'Move to',
      icon: Folder,
      key: 'move',
    },
    {
      id: 2,
      label: 'Delete',
      icon: Trash2,
      key: 'delete',
    },
  ];

  return (
    <div className={cn(className)}>
      {toolTipLabel.map((t) => (
        <Button
          key={t.id}
          disabled={disabled}
          onClick={() => {
            onAction?.(t.key as ActionKey);
          }}
          className="inline-flex gap-1 hover:bg-transparent! active:opacity-50 dark:lg:active:bg-accent/40! lg:active:bg-muted-foreground/40! hover:not-focus:opacity-70 md:gap-1.5 flex-col md:flex-row"
          size={buttonSize}
          variant="ghost"
        >
          <t.icon className="size-5 lg:size-4" />
          <span>{t.label}</span>
        </Button>
      ))}
    </div>
  );
}
