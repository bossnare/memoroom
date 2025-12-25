import { NotebookPen, Brain, Globe } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  content?: string;
  Icon?: React.ElementType;
};

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
      className="p-4 space-y-4 transition-transform duration-100 ease-in-out border rounded-md hover:shadow-sm lg:duration-300 will-change-transform active:-translate-y-2 lg:hover:-translate-y-3 border-input bg-background/80 dark:bg-card/20"
    >
      <header className="space-y-3">
        {Icon ? <Icon sr-only /> : null}
        <h3 className="space-y-3 text-xl font-semibold tracking-tight md:text-lg scroll-m-20">
          {title}
        </h3>
      </header>
      <p className="text-secondary/80 md:text-sm">{content}</p>
    </motion.article>
  );
}

export const WhyItMatters = () => {
  const { t } = useTranslation();
  const cardContents = [
    {
      title: t('section.whyItMatters.card1.title'),
      content: t('section.whyItMatters.card1.description'),
      icon: NotebookPen,
    },
    {
      title: t('section.whyItMatters.card2.title'),
      content: t('section.whyItMatters.card2.description'),
      icon: Brain,
    },
    {
      title: t('section.whyItMatters.card3.title'),
      content: t('section.whyItMatters.card3.description'),
      icon: Globe,
    },
  ];

  return (
    <section
      id="why-it-matters"
      className="px-2 py-14 min-h-100 bg-muted/80 dark:bg-transparent md:px-4"
    >
      {/* heading 2 */}
      <SectionHeader
        title={t('section.whyItMatters.title')}
        subtext={t('section.whyItMatters.subtitle')}
      />
      {/* cards */}
      <div className="flex max-w-6xl mx-auto gap-4 mt-10 flex-col md:flex-row flex-wrap md:justify-center md:items-center w-full md:*:w-[calc(100%/3-1rem)]">
        {cardContents.map((c) => (
          <Card title={c.title} content={c.content} Icon={c.icon} />
        ))}
      </div>
    </section>
  );
};
