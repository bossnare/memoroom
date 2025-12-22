import { SectionHeader } from './SectionHeader';

export function HowItWorks() {
  return (
    <section className="py-6 min-h-100 bg-muted/80 dark:bg-transparent">
      <SectionHeader
        title="How It Works ?"
        subtext="From idea to clarity in seconds"
      />
      <div className="flex flex-col items-center gap-4 mx-auto font-bold py-14">
        <div className="rounded-full animate-spin size-10 border-5 border-accent-foreground/90 border-t-transparent"></div>
        Loading content...
      </div>
    </section>
  );
}
