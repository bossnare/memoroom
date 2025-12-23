import { SectionHeader } from './SectionHeader';
import { motion } from 'motion/react';

type Props = {
  title?: string;
  content?: string;
  number?: number;
};

const cardContents = [
  {
    title: 'Create',
    content: 'Open a space for your ideas.',
  },
  {
    title: 'Think',
    content: 'Write freely, organize naturally.',
  },
  {
    title: 'Share',
    content: "Publish when you're ready.",
  },
];

function Card({ title, content, number }: Props) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
      variants={{
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="p-4 space-y-4 transition-transform duration-100 ease-in-out border rounded-md shadow-lg border-input/50 dark:border-0 card hover:shadow-sm lg:duration-300 will-change-transform active:-translate-y-4 bg-card dark:bg-card/40"
    >
      <header className="space-y-3 md:space-y-0 md:gap-2 md:flex md:items-center">
        <div className="flex items-center justify-center rounded-full bg-primary dark:bg-secondary size-8">
          <span className="font-black tracking-tight text-secondary-foreground">
            0{number}
          </span>
        </div>
        <h3 className="space-y-3 text-xl font-semibold tracking-tight md:text-lg scroll-m-20">
          {title}
        </h3>
      </header>
      <p className="text-sm text-secondary/80">{content}</p>
    </motion.article>
  );
}

export function HowItWorks() {
  return (
    <section className="px-2 py-10 pb-12 min-h-100 bg-muted/80 dark:bg-transparent">
      <SectionHeader
        title="How It Works ?"
        subtext="From idea to clarity in seconds"
      />

      <div className="flex max-w-6xl mx-auto gap-2 md:gap-4 mt-10 lg:[&_.card]:not-last:hover:translate-x-2 [&_.divide]:last:hidden md:[&_.divide]:last:block flex-col md:flex-row flex-wrap justify-center md:items-center w-full md:*:w-[calc(100%/3-1rem)]">
        {cardContents.map((c, i) => (
          <>
            <Card title={c.title} content={c.content} number={i + 1} />
            <span className="w-px h-12 ml-10 border-l-2 divide md:ml-0 md:border-b md:h-auto md:w-auto border-foreground/90 dark:border-input"></span>
          </>
        ))}
      </div>
    </section>
  );
}
