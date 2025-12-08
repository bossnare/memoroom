import { motion } from 'motion/react';
import { NavTab } from './NavTab';
import { TextAlignJustify, Plus } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '../brand/Logo';

export const TopBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="sticky inset-x-0 top-0 flex items-center gap-2 px-2 py-1 border-b h-13 rounded-b-xl md:px-4 md:h-14 bg-zinc-950/80 border-zinc-900">
      <Logo className="md:hidden" />
      {/* desktop navigation */}
      <ul className="hidden gap-2 md:inline-flex">
        <NavTab />
      </ul>
      <div className="flex items-center justify-end gap-3 md:gap-4 grow">
        <button className="p-2 rounded-full bg-zinc-800 active:opacity-80 active:bg-black/80 md:hover:bg-black/80 md:hover:opacity-80">
          <Plus />
        </button>
        {/* mobile menu button */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 rounded-full bg-zinc-950 md:hidden active:opacity-80 active:bg-black/80 md:hover:bg-black/80 md:hover:opacity-80"
        >
          <TextAlignJustify />
        </button>
      </div>

      {/* mobile navigation tab */}
      {openMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          // transition={{type}}
          className="fixed w-2/3 p-2 rounded-lg shadow-xl bg-zinc-950 top-14 right-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <NavTab />
          </ul>
        </motion.div>
      )}
    </nav>
  );
};
