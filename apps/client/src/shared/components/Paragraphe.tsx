import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

export function Paragraphe({ children, className, ...props }: Props) {
  return (
    <p {...props} className={cn('leading-7 not-first:mt-6', className)}>
      {children}
    </p>
  );
}
