import { cn } from '@/lib/utils';

type OverlayProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  open: boolean;
};

export const Overlay = ({ open, className, ...props }: OverlayProps) => {
  return (
    <div
      {...props}
      role="button"
      className={cn(
        open
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
        'inset-0 transition-opacity duration-300 ease-in-out bg-black/50 cursor-pointer fixed',
        className
      )}
    ></div>
  );
};
