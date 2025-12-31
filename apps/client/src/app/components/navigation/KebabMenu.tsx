import { Button } from '@/components/ui/button';
import { kebabMenuVariants } from '@/motions/motion.variant';
import { handleWait } from '@/utils/handle-wait';
import { Ellipsis } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { kebabMenuLabel } from './label';
import { useIsMobile } from '@/hooks/use-mobile';

type Props = {
  open?: boolean;
  close: () => void;
  toggle: () => void;
  openMobileSidebar?: boolean;
};

export const KebabMenu = ({
  open,
  close,
  toggle,
  openMobileSidebar,
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
        className="md:hidden duration-300"
      >
        <Ellipsis />
      </Button>
      {/* Kebab menu */}
      {!openMobileSidebar && open && (
        <motion.div
          variants={kebabMenuVariants}
          ref={kebabMenuRef}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed w-3/4 p-2 rounded-lg shadow-xl sm:w-3/4 bg-background dark:bg-sidebar top-16 right-3 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {kebabMenuLabel.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => handleWait(() => close(), 230)}
                  className="flex items-center w-full h-9.5 gap-3 px-2 rounded-md text-foreground/90 active:bg-muted active:opacity-70"
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
