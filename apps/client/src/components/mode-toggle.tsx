import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [toggle, setToggle] = useState(theme === 'dark');
  const set = toggle ? 'light' : 'dark';

  return (
    <div
      role="button"
      title="toggle theme"
      onClick={() => {
        setTheme(set);
        setToggle((prev) => !prev);
      }}
      className={cn(
        'hover:opacity-90 w-14 h-[1.40rem] inline-flex shadow-xs items-center dark:justify-end active:bg-input dark:active:bg-muted border rounded-full bg-background dark:bg-input/30 border-input',
        className
      )}
    >
      <button className="size-[1.4rem] inline-flex items-center active:opacity-80 justify-center -ml-0.5 dark:-mr-0.5 bg-secondary text-secondary-foreground dark:text-inherit dark:bg-sidebar dark:border-input dark:border rounded-full">
        <Sun className="transition-all scale-100 rotate-0 size-[1.2rem] dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute transition-all scale-0 rotate-90 size-[1.2rem] dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
