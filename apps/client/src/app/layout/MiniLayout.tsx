// for new notes, edit, ...edit free

import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsDesktop } from '@/hooks/use-desktop';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLayoutStore } from '@/stores/layoutStore';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppLoader } from '../components/AppLoader';
import { DesktopSidebar } from '../components/navigation/Sidebar';
import {
  MIN_PANEL_WIDTH,
  MAX_PANEL_WIDTH,
} from '@/app/constants/layout.constant';

function MiniLayout() {
  // store state
  const isOpenMobileSidebar = useLayoutStore((s) => s.isOpenMobileSidebar);
  const isOpenPanel = useLayoutStore((s) => s.isOpenPanel);
  const setIsOpenPanel = useLayoutStore((s) => s.setIsOpenPanel);
  const setIsOpenMobileSidebar = useLayoutStore(
    (s) => s.setIsOpenMobileSidebar
  );
  const appLoading = useLayoutStore((s) => s.appLoading);

  // local state
  const [mobileSidebarWidth, setMobileSidebarWidth] = useState(0);
  const mobileSidebarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop(); // >= lg

  //  reactive main width
  const SIDEBAR_WIDTH = isOpenPanel ? MAX_PANEL_WIDTH : MIN_PANEL_WIDTH;

  // main transform style breakpoint
  const MAIN_TRANSFORM = !isMobile
    ? {
        transform: `translateX(${SIDEBAR_WIDTH}px)`,
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      }
    : {
        transform: isOpenMobileSidebar
          ? `translateX(${mobileSidebarWidth}px)`
          : 'translateX(0)',
      };

  useEffect(() => {
    // get mobile sidebar width
    if (mobileSidebarRef.current) {
      setMobileSidebarWidth(
        mobileSidebarRef.current.getBoundingClientRect().width
      );
    }
  }, []);

  // auto-collapsed sidebar
  useEffect(() => {
    if (!isMobile) setIsOpenMobileSidebar(false);
  }, [isMobile, setIsOpenMobileSidebar]);

  useEffect(() => {
    setIsOpenPanel(isDesktop);
  }, [isDesktop, setIsOpenPanel]);

  return (
    <>
      <div className="relative overflow-hidden">
        {/* loading state on big route change */}
        <AppLoader open={appLoading} />
        {/* desktop sidebar */}
        <DesktopSidebar width={SIDEBAR_WIDTH} />
        <div
          style={MAIN_TRANSFORM}
          className="relative lg:transition-transform lg:duration-200 ease-in-out will-change-transform"
        >
          <ScrollArea className="h-dvh scroll-touch overscroll-contain">
            <main className="h-full px-4">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default MiniLayout;
