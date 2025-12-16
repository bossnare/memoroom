import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTheme, type Theme } from '@/hooks/use-theme';
import { useToggle } from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';

export const ToggleTheme = () => {
  const { value: isOpen, toggle: toggleOpen } = useToggle(true);
  const { setTheme, theme } = useTheme();

  return (
    <div className="px-2">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-1 py-2 duration-200 rounded md:active:bg-muted-foreground/40 tansition-colors active:bg-muted md:hover:bg-muted"
      >
        <span className="font-bold">Theme</span>
        <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </button>
      <form
        onChange={(e) =>
          setTheme((e.target as HTMLInputElement).value as Theme)
        }
        className={cn(
          isOpen ? 'h-26 md:h-24' : 'h-0',
          'flex transition-all duration-200 ease-in-out overflow-hidden flex-col px-1 mt-2 gap-4 *:flex *:justify-between'
        )}
      >
        <div>
          <input
            id="system"
            name="theme"
            value="system"
            type="radio"
            checked={theme === 'system'}
            className="cursor-pointer"
          />{' '}
          <label
            htmlFor="system"
            className="font-medium cursor-pointer text-muted-foreground md:text-sm"
          >
            System
          </label>
        </div>
        <div>
          <input
            id="light"
            name="theme"
            value="light"
            type="radio"
            checked={theme === 'light'}
            className="cursor-pointer"
          />{' '}
          <label
            htmlFor="light"
            className="font-medium cursor-pointer text-muted-foreground md:text-sm"
          >
            Light
          </label>
        </div>
        <div>
          <input
            id="dark"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            type="radio"
            className="cursor-pointer"
          />{' '}
          <label
            htmlFor="dark"
            className="font-medium cursor-pointer text-muted-foreground md:text-sm"
          >
            Dark
          </label>
        </div>
      </form>
    </div>
  );
};
