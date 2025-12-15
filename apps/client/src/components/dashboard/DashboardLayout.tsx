import { supabase } from '@/auth-services/clients.service';
import { Logo } from '@/components/brand/Logo';
import { NavTab } from '@/components/navigation/NavTab';
import { TopBar } from '@/components/navigation/TopBar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import RefreshWrapper from '@/pull-to-refresh';
import { waitVibrate } from '@/utils/vibration';
import { PenLine, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
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
        <div className="fixed inset-y-0 z-20 hidden w-64 border-r bg-sidebar md:block border-sidebar-border">
          <Logo className="sticky top-0 hidden w-full px-5 py-3 md:flex" />

          <aside className="relative text-sidebar-foreground space-y-1 px-3 w-full h-[calc(100%-8%)] overflow-y-auto scrollbar-none">
            <nav className="mt-1 rounded-md">
              <ul className="flex flex-col space-y-1.5">
                <NavTab />
              </ul>
            </nav>

            <fieldset
              name="theme"
              className="flex border-t border-sidebar-border mt-6 pt-4 flex-col px-3 gap-4 *:flex *:justify-between"
            >
              <h3>Theme</h3>
              <div>
                <input
                  id="system"
                  name="theme"
                  value="system"
                  type="radio"
                  className="cursor-pointer"
                />{' '}
                <label
                  htmlFor="system"
                  className="cursor-pointer text-muted-foreground md:text-sm"
                >
                  System
                </label>
              </div>
              <div>
                <input
                  id="light"
                  name="theme"
                  value="light"
                  type="radio"
                  className="cursor-pointer"
                />{' '}
                <label
                  htmlFor="light"
                  className="cursor-pointer text-muted-foreground md:text-sm"
                >
                  Light
                </label>
              </div>
              <div>
                <input
                  id="dark"
                  name="theme"
                  value="dark"
                  type="radio"
                  className="cursor-pointer"
                />{' '}
                <label
                  htmlFor="dark"
                  className="cursor-pointer text-muted-foreground md:text-sm"
                >
                  Dark
                </label>
              </div>
            </fieldset>

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-4 pb-6 bg-linear-to-b from-transparent via-zinc-950/20 to-zinc-950/80 min-h-15">
              <div className="w-full active:bg-muted">
                <Button size="medium" className="w-full">
                  <Plus /> Create new note
                </Button>
              </div>
              {/* prov logout */}
              <div className="w-full active:bg-muted">
                <Button
                  onClick={async () => await supabase.auth.signOut()}
                  size="medium"
                  className="w-full font-normal border bg-muted text-foreground/90 border-input"
                >
                  Logout
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
          } md:hidden transition-transform will-change-transform duration-200 p-4 z-50 ease-in-out w-5/6 bg-background fixed inset-y-0 border-r border-border rounded-r-2xl overflow-hidden`}
        >
          <aside
            className={`${
              openSide ? 'scale-100' : 'scale-20'
            } size-full tansition-transform will-change-transform duration-250 rounded-xl flex-col space-y-3 *:border *:border-border *:h-20 *:w-full *:bg-muted/60 *:rounded-lg ease-in-out overflow-y-auto flex items-center`}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
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
                }
          }
          className="relative h-full transition-transform duration-200 ease-in-out will-change-transform md:transition-all md:will-change-auto md:duration-50 md:ml-64"
        >
          <TopBar setOpenSide={setOpenSide} openSide={openSide} />
          <RefreshWrapper onRefresh={async () => window.location.reload()}>
            <main className="grid items-start min-h-full grid-cols-4 gap-2 px-4 overflow-y-auto">
              {/* nested routes here */}
              <Outlet />
            </main>
          </RefreshWrapper>
        </div>

        {!openSide && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-24 md:bottom-12 right-4"
          >
            <button className="flex items-center justify-center p-2 text-white rounded-full shadow-md bg-primary size-14 active:opacity-80 md:hover:opacity-80">
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
          className="fixed inset-x-0 bottom-0 z-20 h-16 pb-3 transition-transform duration-200 ease-in-out border-t bg-sidebar backdrop-blur-sm md:hidden border-sidebar-border"
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

export default DashboardLayout;
