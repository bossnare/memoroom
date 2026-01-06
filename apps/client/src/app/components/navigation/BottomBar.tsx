import { useIsMobile } from '@/shared/hooks/use-mobile';
import { NavTab } from './NavTab';

export const BottomBar = ({
  mobileSidebarWidth,
  openMobileSidebar,
}: {
  mobileSidebarWidth: number;
  openMobileSidebar?: boolean;
}) => {
  const isMobile = useIsMobile;

  return (
    <div
      style={
        !isMobile
          ? {}
          : {
              transform: openMobileSidebar
                ? `translateX(${mobileSidebarWidth}px)`
                : 'translateX(0)',
            }
      }
      className="fixed inset-x-0 bottom-0 z-20 h-16 py-2 transition-transform duration-280 ease-in-out border-t will-change-transform bg-sidebar backdrop-blur-sm md:hidden border-sidebar-border"
    >
      <nav className="select-none size-full">
        <ul className="flex items-center justify-around pb-1 size-full">
          <NavTab />
        </ul>
      </nav>
    </div>
  );
};
