import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { landingMenuVariants, lineVariants } from '@/motions/motion.variant';
import { Footer } from '@/shared/components/brand/Footer';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { useLabel } from '@/public-site/hooks/use-label';
import { handleWait } from '@/utils/handle-wait';

{
  /* mobile only menu content */
}
export const MobileMenu = ({
  open,
  close,
}: {
  open?: boolean;
  close: () => void;
}) => {
  const menuLabel = useLabel();

  return (
    <>
      <AnimatePresence>
        {open && (
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
            className="fixed inset-0 flex flex-col gap-2 md:hidden bg-background z-100"
          >
            <nav className="flex items-center justify-between px-1 py-1 pl-4">
              <ModeToggle />

              <Button size="icon-lg" variant="ghost" onClick={close}>
                <X />
              </Button>
            </nav>

            <div className="relative px-4 grow">
              <ul className="space-y-4">
                {menuLabel.map((l) => (
                  <li key={l.id}>
                    <NavLink to={l.route}>
                      {({ isActive }) => (
                        <button
                          onClick={() => handleWait(close, 200)}
                          className={cn(
                            isActive
                              ? 'text-primary bg-primary/20 dark:bg-primary/16'
                              : 'active:text-muted-foreground',
                            'relative flex justify-center',
                            'transition-colors duration-100 w-full font-semibold rounded-sm text-2xl ease px-2 flex items-center justify-start h-10'
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

              <div className="absolute inset-x-0 bottom-0 px-2 py-2 bg-sidebar/20">
                <Footer content="noContent" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
