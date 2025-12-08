import { HomeIcon, Trash, Workflow } from 'lucide-react';
// import { NavLink } from 'react-router-dom';

export function NavTab() {
  return (
    <>
      <li>
        <button className="flex items-center w-full gap-2 px-2 font-semibold text-white rounded-md cursor-pointer md:px-4 md:w-auto hover:opacity-80 h-9 bg-zinc-900">
          <HomeIcon className="size-5" /> Home
        </button>
      </li>
      <li>
        <button className="flex items-center w-full gap-2 px-2 font-medium cursor-pointer md:px-4 md:w-auto hover:opacity-80 text-zinc-400 h-9">
          <Workflow className="size-5" /> Workspace
        </button>
      </li>
      <li>
        <button className="flex items-center w-full gap-2 px-2 font-medium cursor-pointer md:px-4 md:w-auto hover:opacity-80 text-zinc-400 h-9">
          <Trash className="size-5" /> Trash
        </button>
      </li>
    </>
  );
}
