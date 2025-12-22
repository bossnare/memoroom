import { Button } from '@/components/ui/button';
import { useToggle } from '@/hooks/use-toggle';
import { kebabMenuVariants } from '@/motions/motion.variant';
import { useLayoutStore } from '@/stores/layoutStore';
import { handleWait } from '@/utils/handle-wait';
import { Ellipsis } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { kebabMenuLabel } from './navigation.label';

export const KebabMenu = () => {
  const {
    value: openKebabMenu,
    toggle: toggleOpenKebabMenu,
    setFalse: setOpenKebabToFalse,
  } = useToggle();
  const isOpenMobileSidebar = useLayoutStore((s) => s.isOpenMobileSidebar);

  const kebabMenuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef?.current?.contains(target) ||
        kebabMenuRef?.current?.contains(target)
      )
        return;
      setOpenKebabToFalse();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenKebabToFalse]);

  return (
    <>
      {/* trigger button */}
      <Button
        variant="ghost"
        size="icon-lg"
        ref={triggerRef}
        onClick={toggleOpenKebabMenu}
        className="md:hidden duration-300"
      >
        <Ellipsis />
      </Button>
      {/* Kebab menu */}
      {!isOpenMobileSidebar && openKebabMenu && (
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
                  onClick={() => handleWait(setOpenKebabToFalse, 230)}
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
