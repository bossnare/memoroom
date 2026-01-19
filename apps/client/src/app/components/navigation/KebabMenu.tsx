import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { kebabMenuVariants } from '@/shared/motions/motion.variant';
import { handleWait } from '@/shared/utils/handle-wait';
import { Ellipsis } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { kebabMenuLabel } from './label';

type Props = {
  open?: boolean;
  close: () => void;
  toggle: () => void;
  isOpenMobileSidebar?: boolean;
};

export const KebabMenu = ({
  open,
  close,
  toggle,
  isOpenMobileSidebar,
}: Props) => {
  const kebabMenuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!isMobile) return; // stop click anywhere = close on desktop
      if (
        triggerRef?.current?.contains(target) ||
        kebabMenuRef?.current?.contains(target)
      )
        return;
      close();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close, isMobile]);

  return (
    <>
      {/* trigger button */}
      <Button
        variant="ghost"
        size="icon-lg"
        ref={triggerRef}
        onClick={toggle}
        className="duration-300 md:hidden"
      >
        <Ellipsis />
      </Button>
      {/* Kebab menu */}
      {!isOpenMobileSidebar && open && (
        <motion.div
          variants={kebabMenuVariants}
          ref={kebabMenuRef}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed w-3/4 py-2 rounded-lg shadow-xl sm:w-3/4 bg-background dark:bg-sidebar top-16 right-3 md:hidden"
        >
          <ul className="flex flex-col gap">
            {kebabMenuLabel.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => handleWait(() => close(), 230)}
                  className="flex items-center w-full h-12 gap-3 px-4 text-foreground/90 active:bg-muted dark:active:bg-muted-foreground/30 active:opacity-70"
                >
                  <m.icon className="size-5" /> {m.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
};
