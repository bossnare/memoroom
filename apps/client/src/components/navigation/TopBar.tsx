import { motion } from 'motion/react';
import { TextAlignJustify, Ellipsis, Search, BellIcon } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { useId, useState } from 'react';
import { ButtonIcon } from '@/components/ui/button';
import { waitVibrate } from '@/utils/vibration';

export const TopBar = ({
  setOpenSide,
  openSide,
}: {
  setOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
  openSide: boolean;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const inputId = useId();

  return (
    <nav className="sticky inset-x-0 top-0 flex items-center gap-2 px-2 py-1 pl-1 border-b shadow-lg h-14 md:px-3 bg-background border-border">
      <div className="flex items-center gap-2 shrink-0">
        {/* mobile menu button */}
        <ButtonIcon
          onClick={() => {
            waitVibrate(200, 'low');
            setOpenSide(!openSide);
          }}
          className="md:hidden"
        >
          <TextAlignJustify className="size-[26px]" />
        </ButtonIcon>
        <Logo className="md:hidden" />
      </div>
      {/* desktop navigation */}
      <div className="hidden h-10 py-1 px-2 rounded-md bg-input gap-2 md:inline-flex w-[36%] items-center shrink-0">
        <label htmlFor={inputId}>
          <Search className="text-muted-foreground" />
        </label>
        <input
          id={inputId}
          type="text"
          name="current-search"
          className="focus:outline-none pl-0.5 text-foreground/80 grow placeholder:text-sm placeholder:text-muted-foreground"
          placeholder="Search a note..."
        />
      </div>
      <div className="flex items-center justify-end gap-3 md:gap-4 grow">
        <ButtonIcon className="relative">
          <BellIcon />
          {/* badge */}
          <span className="absolute p-1 rounded-full top-1 size-2 right-0.5 bg-destructive"></span>
        </ButtonIcon>

        <div className="hidden rounded-full size-10 md:flex bg-input"></div>
        <ButtonIcon
          onClick={() => setOpenMenu(!openMenu)}
          className="md:hidden"
        >
          <Ellipsis />
        </ButtonIcon>
      </div>

      {/* mobile navigation tab */}
      {openMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          // transition={{type}}
          className="fixed w-4/5 p-2 rounded-lg shadow-xl z-100! sm:w-3/4 bg-background top-16 right-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <button className="flex w-full gap-2 px-2 h-9">
                Workspaces settings
              </button>
            </li>
            <li>
              <button className="flex w-full gap-2 px-2 h-9">
                Account health
              </button>
            </li>
            <li>
              <button className="flex w-full gap-2 px-2 h-9">Archives</button>
            </li>
            <li>
              <button className="flex w-full gap-2 px-2 h-9">Trash</button>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};
