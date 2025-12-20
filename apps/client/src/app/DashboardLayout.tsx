import { BottomBar } from '@/components/navigation/BottomBar';
import { DesktopSidebar, MobileSidebar } from '@/components/navigation/Sidebar';
import { SideOver } from '@/components/navigation/SideOver';
import { TopBar } from '@/components/navigation/TopBar';
import PullToRefreshWrapper from '@/components/pull-to-refresh';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { fabButtonVariants } from '@/motions/motion.variant';
import { useLayoutStore } from '@/stores/UXStore';
import { PenLine } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  const isOpenMobileSidebar = useLayoutStore((s) => s.isOpenMobileSidebar);
  const [mobileSidebarWidth, setMobileSidebarWidth] = useState(0);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (sidebarRef.current) {
      setMobileSidebarWidth(sidebarRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      <div className="relative max-h-screen overflow-hidden h-dvh">
        {/* desktop sidebar */}
        <DesktopSidebar />
        {/* mobile sidebar  */}
        <MobileSidebar ref={sidebarRef} /> {/* main content */}
        <div
          style={
            !isMobile
              ? {}
              : {
                  transform: isOpenMobileSidebar
                    ? `translateX(${mobileSidebarWidth}px)`
                    : 'translateX(0)',
                }
          }
          className="relative h-full transition-transform duration-200 ease-in-out will-change-transform md:transition-all md:will-change-auto md:duration-50 md:ml-64"
        >
          <TopBar />
          {/* route content */}
          <PullToRefreshWrapper
            onRefresh={async () => window.location.reload()}
          >
            <main className=" min-h-full grid-cols-4 gap-2 px-2 py-2 overflow-y-auto md:px-4 overscroll-contain">
              <Outlet />
            </main>
          </PullToRefreshWrapper>
        </div>
        <AnimatePresence>
          {!isOpenMobileSidebar && (
            <motion.div
              variants={fabButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-24 md:bottom-12 right-4"
            >
              <Button className="text-white shadow-lg size-14 rounded-full">
                <PenLine className="size-auto" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* mobile */}
        <BottomBar mobileSidebarWidth={mobileSidebarWidth} />
        {/* sideOver */}
        <SideOver />
      </div>
    </>
  );
}

export default DashboardLayout;
