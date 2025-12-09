import { Earth, Trash, Layers } from 'lucide-react';
// import { NavLink } from 'react-router-dom';

export function NavTab() {
  return (
    <>
      <li>
        <button className="flex items-center w-full gap-2 px-2 font-semibold text-white bg-zinc-900 rounded-md cursor-pointer md:px-3 h-9">
          <Earth className="size-5" /> All Notes
        </button>
      </li>
      <li>
        <button className="flex items-center w-full gap-2 px-2 font-medium cursor-pointer md:px-3 md:hover:opacity-80 text-zinc-400 h-9">
          <Layers className="size-5" /> Workspaces
        </button>
      </li>
      <li>
        <button className="flex items-center w-full gap-2 px-2 font-medium cursor-pointer md:px-3 md:hover:opacity-80 text-zinc-400 h-9">
          <Trash className="size-5" /> Trash
        </button>
      </li>
    </>
  );
}
