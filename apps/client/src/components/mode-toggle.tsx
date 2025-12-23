import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      onClick={() => {
        setTheme(set);
        setToggle((prev) => !prev);
      }}
      className={cn(
        'w-20 border rounded-full bg-background dark:border-input',
        className
      )}
    >
      <Button
        variant="ghost"
        className="transition-transform duration-100 ease-out translate-x-0 bg-muted/20! backdrop-blur-sm rounded-full dark:translate-x-[2.86rem] bg-"
        size="icon"
      >
        <Sun className="transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
