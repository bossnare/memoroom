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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsDesktop } from '@/shared/hooks/use-desktop';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { fabButtonVariants } from '@/shared/motions/motion.variant';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ButtonFab } from '../components/notes/ButtonFab';
import { OptionDrawer } from '../components/users/OptionDrawer';
import { usePannel } from '../hooks/use-pannel';

export function AppLayout() {
  // store state
  const isOpenPanel = useLayoutStore((s) => s.isOpenPanel);
  const setIsOpenPanel = useLayoutStore((s) => s.setIsOpenPanel);
  const appLoading = useLayoutStore((s) => s.appLoading);

  const queryClient = useQueryClient();
  const handleRefreshNotes = () =>
    queryClient.refetchQueries({
      queryKey: ['notes'],
    });

  // query params state
  const { isOpen: isOpenMobileSidebar, close: closeMobileSidebar } =
    useQueryToggle({ key: 'sidebar', value: 'mobile' })!;

  const { isOpen: isSelectionMode } = useQueryToggle({
    key: 'select',
    value: 'notes',
  })!;

  const {
    isOpen: isOpenChoose,
    close: closeChoose,
    open: openChoose,
  } = useQueryToggle({
    key: 'ui',
    value: 'create',
  })!;

  // local state
  const [mobileSidebarWidth, setMobileSidebarWidth] = useState(0);
  const mobileSidebarRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop(); // >= lg

  //  reactive main width
  const { pannelWidth: SIDEBAR_WIDTH, mainTransform: MAIN_DESKTOP_TRANSFORM } =
    usePannel(isOpenPanel, MIN_PANEL_WIDTH, MAX_PANEL_WIDTH);

  // main transform style breakpoint
  const MAIN_TRANSFORM = !isMobile
    ? MAIN_DESKTOP_TRANSFORM
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
          className="relative transition-transform ease-in-out duration-280 will-change-transform md:duration-150"
        >
          <TopBar />
          {/* route content */}
          <PullToRefreshWrapper onRefresh={async () => handleRefreshNotes()}>
            <ScrollArea className="h-[calc(100dvh-120px)] md:h-[calc(100dvh-56px)] scroll-touch overscroll-contain">
              <main className="pb-[60px] lg:pb-10 min-h-full">
                <Outlet />
              </main>
            </ScrollArea>
          </PullToRefreshWrapper>
        </div>
        {/* fab button (create note, long presse -> choice) - mobile only */}
        <AnimatePresence>
          {!isSelectionMode && !isOpenMobileSidebar && (
            <motion.div
              variants={fabButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-24 md:bottom-12 lg:hidden right-5"
            >
              <ButtonFab openChoose={openChoose} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Create More Options */}
        <OptionDrawer
          showOn="mobile"
          isOpen={isOpenChoose}
          onClose={closeChoose}
        />
        {/* quick Editor */}
        {/* mobile */}
        {!isSelectionMode && (
          <BottomBar
            openMobileSidebar={isOpenMobileSidebar}
            mobileSidebarWidth={mobileSidebarWidth}
          />
        )}
        {/* sideOver */}
        <SideOver />
      </div>
    </>
  );
}
