import { useTranslation } from 'react-i18next';
import { SectionHeader } from './SectionHeader';
import { motion } from 'motion/react';

type Props = {
  title?: string;
  content?: string;
  number?: number;
};

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
      className="p-4 space-y-4 transition-transform duration-100 ease-in-out border rounded-md border-input dark:border-0 hover:shadow-sm lg:duration-300 will-change-transform active:translate-x-4 bg-card dark:bg-card/40"
    >
      <header className="flex flex-col gap-3 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center justify-center rounded-full border border-primary bg-primary dark:bg-primary/80 size-8 md:size-7">
          <span className="font-black tracking-tight text-primary-foreground">
            0{number}
          </span>
        </div>
        <h3 className="space-y-3 text-xl font-semibold tracking-tight md:text-lg scroll-m-20">
          {title}
        </h3>
      </header>
      <p className="text-sm lg:ml-9 text-secondary/80">{content}</p>
    </motion.article>
  );
}

export function HowItWorks() {
  const { t } = useTranslation();
  const cardContents = [
    {
      title: t('section.howItWorks.card1.title'),
      content: t('section.howItWorks.card1.description'),
    },
    {
      title: t('section.howItWorks.card2.title'),
      content: t('section.howItWorks.card2.description'),
    },
    {
      title: t('section.howItWorks.card3.title'),
      content: t('section.howItWorks.card3.description'),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="px-2 py-10 md:pb-5 pb-12 min-h-100 bg-muted/80 dark:bg-transparent"
    >
      <SectionHeader
        title={t('section.howItWorks.title')}
        subtext={t('section.howItWorks.subtitle')}
      />

      <div className="flex max-w-6xl mx-auto gap-2 md:gap-4 mt-10 lg:[&_.card]:not-last:hover:translate-x-2 [&_.divide]:last:hidden lg:[&_.divide]:last:block flex-col md:flex-row flex-wrap md:justify-center md:items-center lg:*:w-[calc(100%/3-1rem)]">
        {cardContents.map((c, i) => (
          <>
            <Card title={c.title} content={c.content} number={i + 1} />
            <span className="h-8 ml-8 border-l-2 border-dashed divide md:ml-0 md:border-b md:h-auto md:w-8 lg:w-auto border-primary dark:border-input"></span>
          </>
        ))}
      </div>
    </section>
  );
}
