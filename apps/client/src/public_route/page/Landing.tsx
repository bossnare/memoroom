import { Logo } from '@/components/brand/Logo';
import { Button, ButtonIcon } from '@/components/ui/_button';
import { useToggle } from '@/hooks/use-toggle';
import { landingMenuVariants } from '@/motions/motion.variant';
import { TextAlignJustify, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Login } from './Login';

export const LandingPage = () => {
  const { value: openMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative h-screen">
      <header className="sticky">
        <nav className="sticky inset-x-0 top-0 flex items-center h-12 gap-2 px-2 py-1 border-b shadow-lg z-99 md:px-3 bg-sidebar border-sidebar-border">
          <div className="flex items-center gap-2 shrink-0">
            <Logo />
          </div>

          <div className="flex items-center justify-end gap-3 md:gap-4 grow">
            {/* mobile menu button */}
            <ButtonIcon onClick={toggleOpenMenu} className="md:hidden">
              <TextAlignJustify className="size-[26px]" />
            </ButtonIcon>

            <div className="hidden gap-3 md:flex">
              <Button
                size="medium"
                className="shadow-xs bg-background text-foreground"
              >
                Sign up
              </Button>
              <Button
                size="medium"
                className="bg-secondary text-secondary-foreground"
              >
                Sign in
              </Button>
            </div>
          </div>
        </nav>
      </header>
      {/* main */}
      <main>
        <div className="flex flex-col items-center justify-center gap-6 px-2 h-[calc(100dvh-48px)]">
          <h1 className="text-4xl font-extrabold tracking-tight text-center scroll-m-20 text-balance">
            Create Your Second Brain
          </h1>

          <div className="flex gap-3">
            <Button className="bg-secondary text-secondary-foreground">
              About us
            </Button>
            <Button className="bg-primary text-white/90">Get started</Button>
          </div>
        </div>
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
            className="fixed inset-0 bg-sidebar z-100"
          >
            <div className="flex justify-end px-1 py-1">
              <ButtonIcon onClick={toggleOpenMenu} className="md:hidden">
                <X className="size-8" />
              </ButtonIcon>
            </div>
            <Login />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
