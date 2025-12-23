import { useTheme } from '@/components/theme-provider';
import { SectionHeader } from './SectionHeader';
import { useState } from 'react';

export function HowItWorks() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');
  const toggle = isDark ? 'light' : 'dark';
  return (
    <section className="py-6 min-h-100 bg-muted/80 dark:bg-transparent">
      <SectionHeader
        title="How It Works ?"
        subtext="From idea to clarity in seconds"
      />
      <div className="flex flex-col items-center gap-2 mx-auto font-bold py-14">
        <div className="rounded-full animate-spin size-10 md:size-8 border-5 border-accent-foreground/90 border-t-accent-foreground/10"></div>
        Loading content...
      </div>

      <button
        onClick={() => {
          setTheme(toggle);
          setIsDark(!isDark);
        }}
        className="flex px-2 py-2 mx-auto border rounded-md active:opacity-80 active:scale-99 border-input bg-input/50"
      >
        Toggle | {theme}
      </button>
    </section>
  );
}
