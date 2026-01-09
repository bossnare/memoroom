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
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });

  return (
    <div className={cn(className)}>
      <Button disabled={disabled} size={buttonSize} variant="ghost">
        <Folder />
      </Button>
      <Button disabled={disabled} size={buttonSize} variant="ghost">
        <Trash2 />
      </Button>
    </div>
  );
}
