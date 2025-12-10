import { motion } from 'motion/react';
import { TextAlignJustify, Ellipsis, Search } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useState } from 'react';
import { ButtonIcon } from '../ui/button';
import { waitVibrate } from '../../utils/vibration';

export const TopBar = ({
  setOpenSide,
  openSide,
}: {
  setOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
  openSide: boolean;
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="sticky inset-x-0 top-0 flex items-center gap-2 px-2 py-1 pl-1 border-b h-14 md:px-3 bg-zinc-950 border-zinc-800">
      <div className="flex items-center gap-2 shrink-0">
        {/* mobile menu button */}
        <ButtonIcon
          onClick={() => {
            waitVibrate(150, 'subtle');
            setOpenSide(!openSide);
          }}
          className="md:hidden"
        >
          <TextAlignJustify />
        </ButtonIcon>
        <Logo className="md:hidden" />
      </div>
      {/* desktop navigation */}
      <div className="hidden h-10 py-1 px-2 rounded-md bg-zinc-900 gap-2 md:inline-flex w-[36%] items-center shrink-0">
        <Search className="text-zinc-500" />
        <input
          type="text"
          name="current-search"
          className="focus:outline-none pl-0.5 text-zinc-300 grow placeholder:text-sm placeholder:text-zinc-500"
          placeholder="Search a note..."
        />
      </div>
      <div className="flex items-center justify-end gap-3 md:gap-4 grow">
        <div className="hidden rounded-full size-10 md:flex bg-zinc-900"></div>
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
          className="fixed w-1/2 p-2 rounded-lg shadow-xl sm:w-1/2 bg-zinc-950 top-16 right-3 md:hidden"
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
