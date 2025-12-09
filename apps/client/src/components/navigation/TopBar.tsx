import { motion } from 'motion/react';
import { NavTab } from './NavTab';
import { TextAlignJustify, Plus, Search } from 'lucide-react';
import { Logo } from '../brand/Logo';

export const TopBar = ({
  setOpenSide,
  openSide,
}: {
  setOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
  openSide: boolean;
}) => {
  return (
    <nav className="sticky inset-x-0 top-0 flex items-center gap-2 px-2 py-1 pl-1 border-b h-13 rounded-b-xl md:px-4 md:h-14 bg-zinc-950/80 border-zinc-900">
      <div className="flex items-center gap-2 shrink-0">
        {/* mobile menu button */}
        <button
          onClick={() => setOpenSide(!openSide)}
          className="p-2 rounded-full bg-zinc-950 md:hidden active:opacity-80 active:bg-black/80 md:hover:bg-black/80 md:hover:opacity-80"
        >
          <TextAlignJustify />
        </button>
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
        <button className="p-2 rounded-full md:hidden bg-zinc-800 active:opacity-80 active:bg-black/80 md:hover:bg-black/80 md:hover:opacity-80">
          <Plus />
        </button>
      </div>

      {/* mobile navigation tab */}
      {openSide && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          // transition={{type}}
          className="fixed w-2/3 p-2 rounded-lg shadow-xl sm:w-1/2 bg-zinc-950 top-14 right-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <NavTab />
          </ul>
        </motion.div>
      )}
    </nav>
  );
};
