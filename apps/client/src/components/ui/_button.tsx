import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  size?: 'medium' | 'large';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, size = 'large', className, ...props }, ref) => {
    const variants = size === 'large' ? 'h-10 px-6 font-semibold' : 'h-9 px-5';

    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          'flex transition-opacity will-change-opacity text-white duration-300 ease-in-out items-center justify-center font-medium px-6 gap-3 bg-primary rounded-md  md:active:opacity-60 md:hover:opacity-80 active:opacity-60',
          variants,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          'flex items-center justify-center transition-colors will-change-colors duration-300 ease-in-out p-2 rounded-full md:hover:opacity-90 active:opacity-80 md:active:opacity-60 active:bg-muted-foreground/40 md:hover:bg-muted-foreground/40',
          className
        )}
      >
        {children}
      </button>
    );
  }
);
