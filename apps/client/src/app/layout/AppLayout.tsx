import { AppLoader } from '@/app/components/AppLoader';
import { BottomBar } from '@/app/components/navigation/BottomBar';
import {
  DesktopSidebar,
  MobileSidebar,
} from '@/app/components/navigation/Sidebar';
import { SideOver } from '@/app/components/navigation/SideOver';
import { TopBar } from '@/app/components/navigation/TopBar';
import PullToRefreshWrapper from '@/app/components/pull-to-refresh';
import {
  MAX_PANEL_WIDTH,
  MIN_PANEL_WIDTH,
} from '@/app/constants/layout.constant';
import { useLayoutStore } from '@/app/stores/layoutStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsDesktop } from '@/shared/hooks/use-desktop';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { fabButtonVariants } from '@/shared/motions/motion.variant';
import { handleWait } from '@/shared/utils/handle-wait';
import { SquarePen } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AppLayout() {
  // store state
  const isOpenPanel = useLayoutStore((s) => s.isOpenPanel);
  const setIsOpenPanel = useLayoutStore((s) => s.setIsOpenPanel);
  const appLoading = useLayoutStore((s) => s.appLoading);
  const setAppLoading = useLayoutStore((s) => s.setAppLoading);

  // query params state
  const { isOpen: isOpenMobileSidebar, close: closeMobileSidebar } =
    useQueryToggle({ key: 'sidebar', value: 'mobile' })!;

  const navigate = useNavigate();

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
  // useEffect(() => {
  //   if (!isMobile) navigate(-1);
  // }, [isMobile, openMobileSidebar, navigate]);

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
        {/* mobile sidebar  */}
        <MobileSidebar
          open={isOpenMobileSidebar}
          close={closeMobileSidebar}
          ref={mobileSidebarRef}
        />{' '}
        {/* main content */}
        <div
          style={MAIN_TRANSFORM}
          className="relative transition-transform duration-280 ease-in-out will-change-transform md:duration-100"
        >
          <TopBar />
          {/* route content */}
          <PullToRefreshWrapper
            onRefresh={async () => window.location.reload()}
          >
            <ScrollArea className="h-[calc(100dvh-116px)] md:h-[calc(100dvh-56px)] scroll-touch overscroll-contain">
              <main className="pb-[60px] lg:pb-0 min-h-full">
                <Outlet />
              </main>
            </ScrollArea>
          </PullToRefreshWrapper>
        </div>
        {/* fab button (create note, long presse -> choice) - mobile only */}
        <AnimatePresence>
          {!isOpenMobileSidebar && (
            <motion.div
              variants={fabButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-24 md:bottom-12 lg:hidden right-5"
            >
              <Button
                onClick={() => {
                  setAppLoading(true);
                  handleWait(async () => {
                    await navigate('/note/new');
                    setAppLoading(false);
                  }, 600);
                }}
                className="text-white rounded-full shadow-lg size-15 lg:size-14"
              >
                <SquarePen className="size-7 lg:size-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* quick Editor */}
        {/* mobile */}
        <BottomBar
          openMobileSidebar={isOpenMobileSidebar}
          mobileSidebarWidth={mobileSidebarWidth}
        />
        {/* sideOver */}
        <SideOver />
      </div>
    </>
  );
}
