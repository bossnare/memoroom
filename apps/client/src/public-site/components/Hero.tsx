import { Paragraphe } from '@/app/components/Paragraphe';
import boxWithLine from '@/assets/box_with_line.png';
import { Button } from '@/components/ui/button';
import { landingBodyVariants } from '@/motions/motion.variant';
import { motion } from 'motion/react';
import { ArrowDownCircle, Merge } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex items-center justify-center px-4 h-dvh overflow-hidden">
      <div className="absolute rounded-full left-10 top-2 brightness-140 bg-primary h-70 w-50 lg:w-120 lg:h-80 -z-1"></div>
      <div className="absolute right-0 rounded-full bg-primary bottom-10 size-60 lg:size-80 -z-1"></div>
      {/* grainy noise */}
      <span className="absolute z-11 opacity-70 dark:opacity-80 mix-blend-overlay size-full bg-[url('./assets/noise.svg')]"></span>
      {/* box with line */}
      <div className="absolute bottom-0 z-12 size-50 md:size-90 right-2">
        <img
          src={boxWithLine}
          fetchPriority="high"
          alt="box-with-line"
          className="dark:invert size-full invert-0"
        />
      </div>
      {/* overlay blur */}
      <div className="absolute z-10 bg-background/50 backdrop-blur-3xl size-full"></div>

      <motion.div
        variants={landingBodyVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          type: 'spring',
          mass: 0.3,
          stiffness: 600,
          damping: 60,
        }}
        className="flex flex-col items-center justify-center max-w-lg z-20 gap-6"
      >
        <span className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-center scroll-m-20 text-balance">
            Create Your Second Brain
          </h1>
          <Paragraphe className="text-sm text-center text-foreground/80 font-medium">
            Organize ideas, share knowledge, and grow together. Your ideas
            don&apos;t belong alone.
          </Paragraphe>
        </span>

        <div className="flex gap-4">
          <Button variant="secondary" size="lg" className="font-semibold">
            <Merge />
            Explore community
          </Button>
          <Button size="lg" className="font-bold">
            <ArrowDownCircle /> Get started
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
