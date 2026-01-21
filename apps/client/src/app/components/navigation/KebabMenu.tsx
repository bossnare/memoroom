import { Button } from '@/components/ui/button';
import { kebabMenuVariants } from '@/shared/motions/motion.variant';
import { handleWait } from '@/shared/utils/handle-wait';
import { Ellipsis } from 'lucide-react';
import { motion } from 'motion/react';
import { kebabMenuLabel } from './label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsDesktop } from '@/shared/hooks/use-desktop';

type Props = {
  open?: boolean;
  close: () => void;
  toggle: () => void;
};

export const KebabMenu = ({ open, close, toggle }: Props) => {
  // const kebabMenuRef = useRef<HTMLDivElement | null>(null);
  // const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isDesktop = useIsDesktop();

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     const target = e.target as Node;
  //     if (!isMobile) return; // stop click anywhere = close on desktop
  //     if (
  //       triggerRef?.current?.contains(target) ||
  //       kebabMenuRef?.current?.contains(target)
  //     )
  //       return;
  //     close();
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [close, isMobile]);
  if (isDesktop) return null;

  return (
    <>
      {/* trigger button */}

      {/* Kebab menu */}
      <DropdownMenu
        open={open}
        onOpenChange={(nextOpen) => (nextOpen ? toggle() : close())}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-lg"
            className="duration-300 md:hidden"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="px-0 bg-transparent border-0 w-80 md:hidden"
        >
          <motion.div
            variants={kebabMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full py-2 overflow-hidden rounded-lg shadow-xl bg-background dark:bg-sidebar"
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
        </DropdownMenuContent>
      </DropdownMenu>
      {/* {!isOpenMobileSidebar && open && (
        
      )} */}
    </>
  );
};
