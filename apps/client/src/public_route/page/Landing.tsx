import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { useToggle } from '@/hooks/use-toggle';
import {
  landingMenuVariants,
  landingBodyVariants,
  traitVariants,
} from '@/motions/motion.variant';
import { Merge, TextAlignJustify, X, ArrowDownCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Paragraphe } from '@/components/Paragraphe';
import { landingPageLabel } from '@/components/navigation/navigation.label';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import boxWithLine from '@/assets/box_with_line.png';

export const LandingPage = () => {
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative h-screen">
      <header className="fixed inset-x-0 top-0 z-99">
        <nav className="inset-x-0 top-0 flex items-center justify-between h-12 gap-2 px-2 py-1 pr-1 md:pr-6 md:px-6">
          <div className="flex items-center gap-2 shrink-0">
            <Logo />
          </div>

          {/* nav */}
          <div className="hidden md:flex grow">
            <ul className="flex md:gap-4 lg:gap-8 text-accent-foreground *:px-2 mx-auto text-sm">
              {landingPageLabel.map((l) => (
                <li key={l.id}>
                  <NavLink to={l.route}>
                    {({ isActive }) => (
                      <button
                        className={cn(
                          isActive
                            ? 'text-primary'
                            : 'hover:not-focus:opacity-80 active:text-muted-foreground',
                          'relative flex justify-center',
                          'transition-colors duration-100 ease font-medium'
                        )}
                      >
                        {l.label}
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              variants={landingBodyVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="absolute rounded-full -bottom-3 size-2 bg-primary"
                            ></motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3 md:gap-4">
            <div className="flex gap-3 md:gap-4">
              <Button
                size="sm"
                className="shadow-xs hidden md:inline-flex bg-background text-foreground"
                variant="ghost"
              >
                Sign up
              </Button>
              <Button size="sm" variant="secondary" className="font-bold">
                Sign in
              </Button>
            </div>

            {/* mobile menu button */}
            <Button
              size="icon-lg"
              variant="ghost"
              onClick={toggleOpenMenu}
              className="md:hidden"
            >
              <TextAlignJustify className="size-[26px]" />
            </Button>
          </div>
        </nav>
      </header>
      {/* main */}
      <main className="relative overflow-hidden">
        <div className="absolute rounded-full left-10 top-2 brightness-140 bg-primary h-70 w-50 lg:w-120 lg:h-80 -z-1"></div>
        <div className="absolute right-0 rounded-full bg-primary bottom-10 size-60 lg:size-80 -z-1"></div>
        {/* grainy noise */}
        <span className="absolute z-11 opacity-60 dark:opacity-80 mix-blend-overlay size-full bg-[url('./assets/noise.svg')]"></span>
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

        <section className="relative flex items-center justify-center px-4 z-12 h-dvh">
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
            className="flex flex-col items-center justify-center max-w-lg gap-6"
          >
            <span className="space-y-2">
              <h1 className="text-4xl italic font-extrabold tracking-tight text-center scroll-m-20 text-balance">
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
      </main>

      {/* mobile menu content */}
      <AnimatePresence>
        {openMenu && (
          <motion.nav
            variants={landingMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: 'spring',
              mass: 0.3,
              stiffness: 100,
              damping: 10,
            }}
            className="fixed flex flex-col inset-0 md:hidden bg-background z-100"
          >
            <nav className="flex justify-end px-1 py-1">
              <Button size="icon-lg" variant="ghost" onClick={toggleOpenMenu}>
                <X />
              </Button>
            </nav>

            <div className="px-4 relative grow">
              <ul className="space-y-4">
                {landingPageLabel.map((l) => (
                  <li key={l.id}>
                    <NavLink to={l.route}>
                      {({ isActive }) => (
                        <button
                          className={cn(
                            isActive
                              ? 'text-primary ng-primary/20 dark:bg-primary/16 w-full'
                              : 'active:text-muted-foreground',
                            'relative flex justify-center',
                            'transition-colors duration-100 font-bold rounded-sm text-lg ease px-2 flex items-center justify-start h-10'
                          )}
                        >
                          {l.label}
                          <AnimatePresence>
                            {isActive && (
                              <motion.span
                                variants={traitVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute bottom-0 w-10 h-1 bg-primary"
                              ></motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="text-center text-sm text-balance py-2 absolute inset-x-0 bottom-0 text-muted-foreground">
                &copy; {new Date().getFullYear()}{' '}
                <span className="tracking-tighter text-foreground">
                  Memoroom
                </span>{' '}
                Powered by{' '}
                <a href="https://github/bossnare">
                  <Button className="p-0 text-foreground" variant="link">
                    Christo Razafimanga
                  </Button>
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
