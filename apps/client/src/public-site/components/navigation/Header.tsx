import { cn } from '@/app/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Back } from '@/public-site/components/navigation/Back';
import { useLabel } from '@/public-site/hooks/use-label';
import { Logo } from '@/shared/components/brand/Logo';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { lineVariants } from '@/shared/motions/motion.variant';
import { handleWait } from '@/shared/utils/handle-wait';
import { TextAlignJustify } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const [scroll, setScroll] = useState(0);
  const [isNeedBg, setIsNeedBg] = useState(false);
  const navbarLabel = useLabel();
  const { t } = useTranslation();
  const { open: openLogin } = useQueryToggle({ key: 'auth', value: 'login' })!;
  const { open: openMobileMenu } = useQueryToggle({
    key: 'menu',
    value: 'mobile',
  })!;

  // Logo optional rendering
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  useEffect(() => {
    window.addEventListener('scroll', () => setScroll(window.scrollY));
    return () =>
      window.removeEventListener('scroll', () => setScroll(window.scrollY));
  }, []);

  useEffect(() => {
    setIsNeedBg(scroll >= 300);
  }, [scroll]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          isHome && !isNeedBg
            ? 'bg-transparent'
            : 'bg-background/80 backdrop-blur-md',
          'flex items-center flex-wrap md:justify-end justify-between transition-colors min-h-12 gap-2 px-2 py-1 pr-1 md:pr-6 md:px-6'
        )}
      >
        <div className="flex items-center shrink-0 lg:min-w-1/5">
          {isHome ? (
            <a href="#hero">
              <Logo />
            </a>
          ) : (
            <Back />
          )}
        </div>

        {/* nav */}
        <div className="hidden md:flex grow">
          <ul className="flex md:gap-4 lg:gap-8 *:px-2 mx-auto text-sm">
            {navbarLabel.map((l) => (
              <li key={l.id}>
                <NavLink to={l.route}>
                  {({ isActive }) => (
                    <button
                      className={cn(
                        isActive
                          ? 'text-foreground font-bold'
                          : 'hover:not-focus:opacity-80 active:text-muted-foreground text-foreground/80 font-medium',
                        'relative flex justify-center transition-colors duration-100 ease-in'
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
                            className="absolute w-1/2 h-1 rounded-full -bottom-2 bg-foreground"
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

        <div className="flex items-center justify-end gap-3 lg:min-w-1/5 md:gap-4">
          <ModeToggle className="hidden md:inline-flex" />

          <div className="flex gap-3 md:gap-4">
            <Button
              onClick={() => handleWait(openLogin, 200)}
              size="sm"
              className="hidden border shadow-xs dark:border-input/50 md:inline-flex bg-background text-foreground"
              variant="ghost"
            >
              {t('auth.button.signin')}
            </Button>
            <Button size="sm" variant="secondary" className="font-bold">
              {t('auth.button.signup')}
            </Button>
          </div>

          {/* mobile menu button */}
          <Button
            size="icon-lg"
            variant="ghost"
            onClick={openMobileMenu}
            className="md:hidden"
          >
            <TextAlignJustify className="size-[26px]" />
          </Button>
        </div>
      </nav>
    </header>
  );
};
