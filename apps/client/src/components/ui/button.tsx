import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 [&_svg]:size-6! whitespace-nowrap rounded-md text-sm font-medium transition-all duration-100 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:not-focus:bg-primary/90 active:opacity-70',
        destructive:
          'bg-destructive text-white hover:not-focus:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:opacity-60',
        outline:
          'border bg-background shadow-xs hover:not-focus:bg-accent hover:not-focus:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:not-focus:bg-input/50 active:opacity-70',
        secondary:
          'bg-secondary text-secondary-foreground hover:not-focus:bg-secondary/80 active:opacity-70',
        ghost:
          'active:opacity-60 active:bg-muted-foreground/40 hover:not-focus:text-accent-foreground dark:active:bg-accent/50 hover:not-focus:bg-muted-foreground/40 dark:hover:not-focus:bg-accent/50',
        // ghost:
        //   'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 rounded-full [&_svg]:size-auto!',
        'icon-sm': 'size-8 rounded-full [&_svg]:size-5!',
        'icon-lg': 'size-10 rounded-full [&_svg]:size-auto!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
