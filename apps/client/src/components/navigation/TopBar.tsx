import { motion } from 'motion/react';
import { NavTab } from './NavTab';
import { TextAlignJustify } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '../brand/Logo';

export const TopBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="sticky inset-x-0 top-0 flex items-center justify-between h-12 gap-2 px-2 py-1 border-b rounded-b-xl md:px-4 md:h-14 bg-zinc-950/80 border-zinc-900">
      <Logo className="md:hidden" />

      <div className="flex grow">
        <ul className="hidden gap-2 md:inline-flex">
          <NavTab />
        </ul>

        <div className="ml-auto size-8 bg-zinc-950"></div>
        {/* mobile menu button */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 ml-auto rounded-full bg-zinc-950 md:hidden active:opacity-80 active:bg-black/80 md:hover:bg-black/80 md:hover:opacity-80"
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
          className="fixed w-1/2 p-2 rounded-lg shadow-md bg-zinc-950 top-14 right-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <NavTab />
          </ul>
        </motion.div>
      )}
    </nav>
  );
};
