import { NotebookPen, Brain, Globe } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { motion } from 'motion/react';

type Props = {
  title?: string;
  content?: string;
  Icon?: React.ElementType;
};

const cardContents = [
  {
    title: 'Capture Ideas Fast',
    content:
      'Write notes instantly, without friction. Focus on thoughts, not tools.',
    icon: NotebookPen,
  },
  {
    title: 'Organize Your Mind',
    content:
      'Structure your notes with clarity. Your ideas stay clean, searchable, and connected.',
    icon: Brain,
  },
  {
    title: 'Share with the Community',
    content:
      'Turn private notes into shared knowledge. Learn from others. Contribute when ready.',
    icon: Globe,
  },
];

function Card({ title, content, Icon }: Props) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="p-4 space-y-4 transition-transform duration-100 ease-in-out border rounded-md hover:shadow-sm lg:duration-300 will-change-transform active:-translate-y-4 lg:hover:-translate-y-3 border-input bg-background/80 dark:bg-card/20"
    >
      <header className="space-y-3">
        {Icon ? <Icon sr-only /> : null}
        <h3 className="space-y-3 text-xl font-semibold tracking-tight md:text-lg scroll-m-20">
          {title}
        </h3>
      </header>
      <p className="text-secondary/80">{content}</p>
    </motion.article>
  );
}

export const WhyItMatters = () => {
  return (
    <section
      id="why-it-matters"
      className="px-2 py-14 min-h-100 bg-muted/80 dark:bg-transparent md:px-4"
    >
      {/* heading 2 */}
      <SectionHeader
        title="A space built for thinking, not just typing"
        subtext="Write freely. Organize ideas. Share knowledge with purpose."
      />
      {/* cards */}
      <div className="flex max-w-6xl mx-auto gap-4 mt-10 flex-col md:flex-row flex-wrap justify-center items-center w-full md:*:w-[calc(100%/3-1rem)]">
        {cardContents.map((c) => (
          <Card title={c.title} content={c.content} Icon={c.icon} />
        ))}
      </div>
    </section>
  );
};
