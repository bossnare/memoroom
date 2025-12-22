import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { useToggle } from '@/hooks/use-toggle';
import {
  landingMenuVariants,
  landingBodyVariants,
} from '@/motions/motion.variant';
import { Merge, TextAlignJustify, X, ArrowDownCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Login } from './Login';
import { Paragraphe } from '@/components/Paragraphe';
import { landingPageLabel } from '@/components/navigation/navigation.label';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
                        {isActive && (
                          <span className="absolute rounded-full -bottom-3 size-2 bg-primary"></span>
                        )}
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
        <div className="absolute rounded-full left-10 top-2 bg-primary h-70 w-50 lg:w-120 lg:h-80 -z-1"></div>
        <div className="absolute right-0 rounded-full bg-primary/80 bottom-10 size-60 lg:size-80 -z-1"></div>
        <div className="absolute bottom-0 z-11 size-50 md:size-90 right-2">
          <img
            src="/landing_cover.png"
            alt="landing-cover"
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
              mass: 0.5,
              stiffness: 600,
              damping: 60,
              duration: 4000,
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
            className="fixed inset-0 md:hidden bg-sidebar z-100"
          >
            <div className="flex justify-end px-1 py-1">
              <Button
                size="icon-lg"
                variant="ghost"
                onClick={toggleOpenMenu}
                className="md:hidden"
              >
                <X />
              </Button>
            </div>
            <Login />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
