import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { landingMenuVariants, traitVariants } from '@/motions/motion.variant';
import { Footer } from '@/shared/components/brand/Footer';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { landingPageLabel } from '../../../app/components/navigation/navigation.label';

{
  /* mobile only menu content */
}
export const LandingPageMenu = ({
  open,
  toggleOpen,
}: {
  open?: boolean;
  toggleOpen?: () => void;
}) => {
  return (
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
          className="fixed flex flex-col inset-0 md:hidden bg-background z-100"
        >
          <nav className="flex justify-end px-1 py-1">
            <Button size="icon-lg" variant="ghost" onClick={toggleOpen}>
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
                            ? 'text-primary bg-primary/20 dark:bg-primary/16 w-full'
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

            <div className="py-2 absolute inset-x-0 bottom-0">
              <Footer />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
