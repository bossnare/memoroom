import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/shared/hooks/use-button-size';
// import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { Folder, Trash2 } from 'lucide-react';

type Props = React.HTMLAttributes<HTMLDivElement> & { disabled?: boolean };

export function SelectModeNoteTooltip({ className, disabled }: Props) {
  // const { close: closeSelectionMode } = useQueryToggle({
  //   key: 'select',
  //   value: 'selectNotes',
  // })!;
  const buttonSize = useButtonSize({ mobile: 'lg', landscape: 'default' });
  const toolTipLabel = [
    {
      id: 1,
      label: 'Move to',
      icon: Folder,
    },
    {
      id: 2,
      label: 'Delete',
      icon: Trash2,
    },
  ];

  return (
    <div className={cn(className)}>
      {toolTipLabel.map((t) => (
        <Button
          key={t.id}
          disabled={disabled}
          className="inline-flex gap-1 hover:bg-transparent! active:opacity-50 dark:lg:active:bg-accent/40! lg:active:bg-muted-foreground/40! hover:not-focus:opacity-70 lg:gap-1.5 flex-col lg:flex-row"
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
