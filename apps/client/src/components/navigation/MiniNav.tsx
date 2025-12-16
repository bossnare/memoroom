import { motion } from 'motion/react';
import { miniNavLabel } from './navigation.label';
import { useEffect, useRef, useState } from 'react';
import { ButtonIcon } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

export const MiniNav = () => {
  const kebabMenuRef = useRef<HTMLDivElement | null>(null);
  const [openKebabMenu, setOpenKebabMenu] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef?.current?.contains(target) ||
        kebabMenuRef?.current?.contains(target)
      )
        return;
      setOpenKebabMenu(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenKebabMenu]);

  return (
    <>
      {/* trigger button */}
      <ButtonIcon
        ref={triggerRef}
        onClick={() => setOpenKebabMenu(!openKebabMenu)}
        className="md:hidden"
      >
        <Ellipsis />
      </ButtonIcon>
      {/* Kebab menu */}
      {openKebabMenu && (
        <motion.div
          ref={kebabMenuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          // transition={{type}}
          className="fixed w-3/4 p-2 rounded-lg shadow-xl sm:w-3/4 bg-background top-16 right-3 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {miniNavLabel.map((m) => (
              <li key={m.id}>
                <button className="flex items-center w-full h-9.5 gap-3 px-2 rounded-md text-foreground/90 active:bg-muted active:opacity-70">
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
