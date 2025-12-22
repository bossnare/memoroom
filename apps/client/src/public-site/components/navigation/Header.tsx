import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { lineVariants } from '@/motions/motion.variant';
import { Logo } from '@/shared/components/brand/Logo';
import { TextAlignJustify } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { landingPageLabel } from './label';

export const Header = ({ toggleOpenMenu }: { toggleOpenMenu?: () => void }) => {
  const [scroll, setScroll] = useState(0);
  const [isNeedBg, setIsNeedBg] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setScroll(window.scrollY));
    return () =>
      window.removeEventListener('scroll', () => setScroll(window.scrollY));
  }, []);

  useEffect(() => {
    setIsNeedBg(scroll >= 300);
  }, [scroll]);

  return (
    <header className="fixed inset-x-0 top-0 z-99">
      <nav
        className={cn(
          isNeedBg ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent',
          'flex items-center justify-between transition-colors h-12 gap-2 px-2 py-1 pr-1 md:pr-6 md:px-6'
        )}
      >
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
                        'transition-colors duration-100 ease-infont-medium'
                      )}
                    >
                      {l.label}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            variants={lineVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute w-1/2 h-1 rounded-full -bottom-3 bg-primary"
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
              className="hidden shadow-xs md:inline-flex bg-background text-foreground"
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
  );
};
