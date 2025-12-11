import { Earth, PenLine, Plus } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { TopBar } from '../navigation/TopBar';
import { Button } from '../ui/button';
import { NavTab } from '../navigation/NavTab';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { motion } from 'motion/react';
import { waitVibrate } from '../../utils/vibration';

// type Note = {
//   id: string;
//   title: string;
//   content: string;
// };

function Overview() {
  const [openSide, setOpenSide] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (sideBarRef.current) {
      setSidebarWidth(sideBarRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      <div className="relative max-h-screen overflow-hidden h-dvh">
        {/* sidebar */}
        <div className="fixed inset-y-0 z-20 hidden w-64 overflow-y-auto border-r md:block border-zinc-800">
          <aside className="relative px-2 space-y-1 size-full">
            <Logo className="sticky top-0 hidden w-full py-3 bg-black/80 backdrop-blur-sm md:flex" />
            <nav className="pb-2 rounded-md bg-muted">
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

        <div
          onClick={() => {
            waitVibrate(200, 'low');
            setOpenSide(false);
          }}
          className={`${
            openSide
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          } inset-0 transition-opacity duration-300 ease-in-out bg-black/50 cursor-pointer fixed z-40 md:hidden`}
        ></div>

        {/* sidebar mobile */}
        <div
          ref={sideBarRef}
          className={`${
            openSide ? 'translate-x-0' : '-translate-x-full'
          } md:hidden transition-transform will-change-transform duration-200 z-50 ease-in-out w-6/7 bg-black fixed inset-y-0 border-r border-zinc-800 rounded-r-2xl overflow-hidden`}
        >
          <aside
            className={`${
              openSide ? 'scale-100' : 'scale-0'
            } size-full tansition-transform will-change-transform duration-300 ease-in-out overflow-y-auto flex items-center justify-center`}
          >
            <div className="border-4 rounded-full border-zinc-100 size-20 animate-spin border-t-transparent"></div>
          </aside>
        </div>

        {/* main content */}
        <div
          style={
            !isMobile
              ? {}
              : {
                  transform: openSide
                    ? `translateX(${sidebarWidth}px)`
                    : 'translateX(0)',
                  backgroundColor: 'black',
                }
          }
          className="relative h-full transition-transform duration-200 ease-in-out will-change-transform md:transition-all md:will-change-auto md:duration-50 md:ml-64"
        >
          <TopBar setOpenSide={setOpenSide} openSide={openSide} />

          <main className="h-[calc(100dvh-3.5rem)] bg-linear-to-b from-background to-background/20 overflow-y-auto px-2 grid grid-cols-4 items-start gap-2">
            <div className="flex justify-center py-6 col-span-full">
              <div className="flex flex-col items-center justify-center w-full gap-4 p-10 rounded-lg md:w-2/3 bg-muted">
                <h4 className="text-lg font-black">Browse your notes</h4>
                <p className="text-sm text-center text-muted-foreground">
                  If you click this browse button, your Overview system down
                  instead, and keep click, calm. As a JS dev, click this button
                  please.
                </p>
                <Button>
                  <Earth /> Browse notes
                </Button>
              </div>
            </div>
          </main>
        </div>

        {!openSide && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-24 md:bottom-6 right-4"
          >
            <button className="flex items-center justify-center p-2 bg-blue-800 rounded-full shadow-lg shadow-blue-800/20 size-14 active:opacity-80 md:hover:opacity-80">
              <PenLine className="size-auto" />
            </button>
          </motion.div>
        )}

        {/* BottomBar */}
        <div
          style={
            !isMobile
              ? {}
              : {
                  transform: openSide
                    ? `translateX(${sidebarWidth}px)`
                    : 'translateX(0)',
                }
          }
          className="fixed inset-x-0 bottom-0 z-20 h-16 px-2 transition-transform duration-200 ease-in-out border-t bg-zinc-950/94 backdrop-blur-sm md:hidden border-zinc-800"
        >
          <nav className="select-none size-full">
            <ul className="flex items-center justify-around size-full">
              <NavTab />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Overview;
