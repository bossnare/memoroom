import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('inline-flex rounded-full animate-spin', {
  variants: {
    variant: {
      default:
        'border-secondary border-t-secondary/14 dark:border-t-secondary/12',
      half: 'border-secondary border-t-secondary/14 dark:border-t-secondary/12 border-r-secondary/14 dark:border-r-secondary/12',
      invert:
        'border-secondary/14 dark:border-secondary/12 border-t-secondary dark:border-t-secondary',
    },
    size: {
      default: 'size-6 border-4',
      sm: 'size-5 border-3',
      lg: 'size-8 border-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Spinner({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof spinnerVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="div"
      data-variant={variant}
      data-size={size}
      className={cn(spinnerVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Spinner, spinnerVariants };
