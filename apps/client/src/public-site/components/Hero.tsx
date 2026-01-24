import boxWithLine from '@/assets/box_with_line.png';
import { Button } from '@/components/ui/button';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { heroVariants } from '@/shared/motions/motion.variant';
import { handleWait } from '@/shared/utils/handle-wait';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Hero() {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  const { open: openLogin } = useQueryToggle({ key: 'auth', value: 'login' });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center px-4 overflow-hidden h-dvh"
    >
      <div className="absolute rounded-full brightness-120 -left-5 -top-2 lg:left-12 lg:top-6 bg-primary h-70 w-50 lg:h-90 lg:w-90 -z-1"></div>
      <div className="absolute right-0 rounded-full bg-primary bottom-10 size-60 lg:size-80 -z-1"></div>
      <div className="absolute left-0 rounded-full bg-chart-2 top-20 size-30 lg:size-60 -z-1"></div>
      <div className="absolute rigth-0 rounded-full bg-chart-2 -bottom-20 size-40 lg:size-50 -z-1"></div>

      {/* grainy noise */}
      <span className="absolute z-11 opacity-20 mix-blend-overlay size-full bg-[url('./assets/noise.svg')]"></span>
      {/* overlay blur */}
      <div className="absolute z-10 bg-background/20 backdrop-blur-3xl size-full"></div>
      {/* box with line */}
      <motion.div
        initial="hidden"
        whileInView={mounted ? 'visible' : ''}
        viewport={{ once: false, amount: 0.4 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute bottom-0 transition-transform duration-200 ease-out z-12 size-60 hover:not-focus:scale-98 md:size-50 lg:size-80 right-2"
      >
        <img
          src={boxWithLine}
          fetchPriority="high"
          alt="box-with-line"
          className="dark:invert size-full invert-0"
        />
      </motion.div>

      <AnimatePresence>
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate={mounted ? 'visible' : ''}
          exit="exit"
          transition={{
            duration: 0.9,
            ease: 'easeOut',
          }}
          className="z-20 flex flex-col items-center justify-center max-w-3xl gap-6 px-4 md:px-0 pb-30 sm:pb-0"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-center selection:bg-primary md:font-bold lg:text-5xl scroll-m-20 text-balance">
              {t('hero.title')}
            </h1>
            <Paragraphe className="text-sm font-medium text-center text-foreground/90">
              {t('hero.subtitle')}
            </Paragraphe>
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <Button
              onClick={() => handleWait(openLogin, 300)}
              size="xl"
              className="w-auto font-bold rounded-full md:order-2"
            >
              {t('hero.primaryButton')}
            </Button>
            <a href="#how-it-works">
              <Button
                variant="secondary"
                size="xl"
                className="font-semibold rounded-full"
              >
                {t('hero.secondButton')}
              </Button>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export { Hero };
