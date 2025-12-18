import { Logo } from '@/components/brand/Logo';
import { NavTab } from '@/components/navigation/NavTab';
import { Overlay } from '@/components/navigation/Overlay';
// import { SideOver } from '@/components/navigation/SideOver';
import { TopBar } from '@/components/navigation/TopBar';
import { Button, ButtonIcon } from '@/components/ui/button';
import { ToggleTheme } from '@/components/ui/toggle-theme';
import { MiniProfile } from '@/components/users/MiniProfile';
import { useIsMobile } from '@/hooks/use-mobile';
import { fabButtonVariants } from '@/motions/motion.variant';
import RefreshWrapper from '@/pull-to-refresh';
import { supabase } from '@/services/auth-client.service';
import { waitVibrate } from '@/utils/vibration';
import { PenLine, Plus, Settings } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
        <div className="fixed inset-y-0 z-20 hidden w-64 border-r text-sidebar-foreground bg-sidebar md:block border-sidebar-border">
          <Logo className="sticky top-0 hidden w-full px-5 py-3 md:flex" />

          <aside className="relative space-y-4 px-3 w-full h-[calc(100%-6%)] overflow-y-auto scrollbar-none">
            <nav className="mt-1 rounded-md">
              <ul className="flex flex-col gap-2">
                <NavTab />
              </ul>
            </nav>

            <div className="h-1 my-2 border-t border-sidebar-border"></div>

            <ToggleTheme />

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-3 pb-2 bg-linear-to-b from-transparent via-zinc-950/20 to-zinc-950/10 dark:to-zinc-950/80 min-h-15">
              <div className="w-full active:bg-muted">
                <Button className="w-full bg-secondary text-secondary-foreground">
                  <Plus /> Create new note
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <Overlay
          className="z-40 md:hidden"
          onClick={() => {
            waitVibrate(200, 'low');
            setOpenSide(false);
          }}
          conditionValue={openSide}
        />

        {/* sidebar mobile */}
        <div
          ref={sideBarRef}
          className={`${
            openSide ? 'translate-x-0' : '-translate-x-full'
          } md:hidden transition-transform will-change-transform text-sidebar-foreground duration-200 px-4 py-3 z-50 ease-in-out w-6/7 bg-sidebar fixed inset-y-0 border-r border-sidebar-border rounded-tr-3xl overflow-hidden`}
        >
          <aside className={`relative size-full rounded-xl overflow-y-auto`}>
            <MiniProfile
              btnAction={
                <ButtonIcon>
                  <Settings />
                </ButtonIcon>
              }
            />
            <div className="h-1 my-6 border-t border-sidebar-border"></div>

            <ToggleTheme />
            <div className="absolute inset-x-0 w-full px-2 bottom-2 active:bg-muted">
              <Button
                onClick={async () => await supabase.auth.signOut()}
                size="large"
                className="w-full font-normal border bg-muted text-foreground/90 border-input"
              >
                Logout
              </Button>
            </div>
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
            <main className="grid items-start min-h-full grid-cols-4 gap-2 px-4 py-2 overflow-y-auto overscroll-contain">
              {/* nested routes here */}
              <Outlet />
            </main>
          </RefreshWrapper>
        </div>

        <AnimatePresence>
          {!openSide && (
            <motion.div
              variants={fabButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-24 md:bottom-12 right-4"
            >
              <ButtonIcon className="text-white shadow-lg bg-primary size-14 active:bg-primary md:hover:bg-primary">
                <PenLine className="size-auto" />
              </ButtonIcon>
            </motion.div>
          )}
        </AnimatePresence>

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
          className="fixed inset-x-0 bottom-0 z-20 h-16 py-2 transition-transform duration-200 ease-in-out border-t bg-sidebar backdrop-blur-sm md:hidden border-sidebar-border"
        >
          <nav className="select-none size-full">
            <ul className="flex items-center justify-around pb-1 size-full">
              <NavTab />
            </ul>
          </nav>
        </div>

        {/* sideOver */}
      </div>
    </>
  );
}

export default DashboardLayout;
