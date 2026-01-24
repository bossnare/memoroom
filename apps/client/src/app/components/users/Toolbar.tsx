import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import type React from 'react';

export type ActionKey = 'move' | 'delete';
type ActionLabel = {
  label: string;
  icon: React.ElementType;
  key: ActionKey;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  onAction?: (actionKey: ActionKey) => void;
  actionLabel?: ActionLabel[];
};

export function Toolbar({ onAction, className, disabled, actionLabel }: Props) {
  const buttonSize = useButtonSize({ mobile: 'lg', landscape: 'default' });

  return (
    <div className={cn(className)}>
      {actionLabel?.map((t) => (
        <Button
          key={t.key}
          disabled={disabled}
          onClick={() => {
            onAction?.(t.key);
          }}
          className="inline-flex gap-1 hover:bg-transparent! active:opacity-50 dark:lg:active:bg-accent/40! lg:active:bg-muted-foreground/40! hover:not-focus:opacity-70 md:gap-2 flex-col md:flex-row"
          size={buttonSize}
          variant="ghost"
        >
          <t.icon className="size-6 md:size-4" />
          <span className="font-normal">{t.label}</span>
        </Button>
      ))}
    </div>
  );
}
