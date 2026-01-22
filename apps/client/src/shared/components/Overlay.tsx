import { cn } from '@/app/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';

type OverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  children?: React.ReactNode;
  close?: () => void;
};

export const Overlay = ({ open, className, ...props }: OverlayProps) => {
  return (
    <div
      {...props}
      className={cn(
        open
          ? 'opacity-100 pointer-events-auto active:invert lg:active:invert-0'
          : 'opacity-0 pointer-events-none',
        'inset-0 transition-opacity duration-300  ease-in-out bg-black/50 fixed',
        className
      )}
    ></div>
  );
};

export const DialogOverlay = ({
  open,
  close,
  className,
  children,
}: OverlayProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            open ? 'opacity-100 active:invert lg:active:invert-0' : 'opacity-0',
            'inset-0 transition-opacity duration-300 ease-in-out z-100 bg-black/50 fixed',
            className
          )}
        ></Dialog.Overlay>
        <Dialog.Content className="fixed inset-0 z-200 pointer-events-none! *:pointer-events-auto">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
      <div></div>
    </Dialog.Root>
  );
};
