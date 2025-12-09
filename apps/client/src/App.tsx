import { Earth, PenLine, Plus } from 'lucide-react';
import { Logo } from './components/brand/Logo';
import { TopBar } from './components/navigation/TopBar';
import { Button } from './components/ui/button';
import { NavTab } from './components/navigation/NavTab';
import { useState } from 'react';

// type Note = {
//   id: string;
//   title: string;
//   content: string;
// };

function App() {
  const [openSide, setOpenSide] = useState(false);

  return (
    <div className="relative max-h-screen h-dvh">
      {/* sidebar */}
      <div className="fixed inset-y-0 hidden w-64 overflow-y-auto border-r md:block border-zinc-900">
        <aside className="relative px-2 space-y-1 size-full">
          <Logo className="sticky top-0 hidden w-full py-3 bg-black/80 backdrop-blur-sm md:flex" />
          <nav className="pb-2 rounded-md bg-zinc-950">
            <ul className="flex flex-col space-y-2">
              <NavTab />
            </ul>
          </nav>

          <div className="absolute inset-x-0 bottom-0 flex items-center px-2 bg-linear-to-b from-transparent via-zinc-950/20 to-zinc-950 h-15">
            <div className="w-full active:bg-zinc-900">
              <Button size="medium" className="w-full">
                <Plus /> Create new note
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <div className="relative h-full md:ml-64 md:transition-all">
        <TopBar setOpenSide={setOpenSide} openSide={openSide} />
        <div
          onClick={() => setOpenSide(false)}
          className={`${
            openSide
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          } inset-0 transition-opacity duration-300 ease-in-out bg-black/50 cursor-pointer fixed z-8 md:hidden`}
        ></div>
        <aside
          className={`${
            openSide ? 'translate-x-0' : '-translate-x-full'
          } md:hidden transition-transform duration-100 ease-in-out w-7/8 bg-black z-50 fixed inset-y-0 border-r border-zinc-900 rounded-r-2xl flex items-center justify-center`}
        >
          <div className="border-4 rounded-full border-zinc-100 size-20 animate-spin border-t-transparent"></div>
        </aside>

        <main className="h-[calc(100dvh-3.5rem)] bg-linear-to-b from-zinc-950/50 to-zinc-950/20 overflow-y-auto px-2 grid grid-cols-4 mt-[3.4px] md:mt-1 rounded-t-xl border-t border-zinc-900 items-start gap-2">
          <div className="flex justify-center py-6 col-span-full">
            <div className="flex flex-col items-center justify-center w-full gap-4 p-10 rounded-lg md:w-2/3 bg-zinc-950">
              <h4 className="text-lg font-black">Browse your notes</h4>
              <p className="text-sm text-center text-zinc-600">
                If you click this browse button, your app system down instead,
                and keep click, calm. As a JS dev, click this button please.
              </p>
              <Button>
                <Earth /> Browse notes
              </Button>
            </div>
          </div>
        </main>
      </div>

      <div className="fixed bottom-6 right-4">
        <button className="flex items-center justify-center p-2 bg-blue-800 rounded-full size-14 active:opacity-80 md:hover:opacity-80">
          <PenLine className="size-auto" />
        </button>
      </div>
    </div>
  );
}

export default App;
