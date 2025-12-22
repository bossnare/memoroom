import { useIsMobile } from '@/hooks/use-mobile';
import { useLayoutStore } from '@/stores/layoutStore';
import { NavTab } from './NavTab';

export const BottomBar = ({
  mobileSidebarWidth,
}: {
  mobileSidebarWidth: number;
}) => {
  const isMobile = useIsMobile;
  const isOpenMobileSidebar = useLayoutStore((s) => s.isOpenMobileSidebar);

  return (
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
      className="fixed inset-x-0 bottom-0 z-20 h-16 py-2 transition-transform duration-200 ease-in-out border-t will-change-transform bg-sidebar backdrop-blur-sm md:hidden border-sidebar-border"
    >
      <nav className="select-none size-full">
        <ul className="flex items-center justify-around pb-1 size-full">
          <NavTab />
        </ul>
      </nav>
    </div>
  );
};
