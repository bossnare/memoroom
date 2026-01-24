// for new notes, edit, ...edit free

import { ScrollArea } from '@/components/ui/scroll-area';
import { Outlet } from 'react-router-dom';

function MiniAppLayout() {
  return (
    <>
      <div className="relative">
        <div className="relative ease-in-out lg:transition-transform lg:duration-200 will-change-transform">
          <ScrollArea className="h-[calc(100dvh-60px)] scroll-touch scroll-smooth overscroll-contain">
            <main className="h-full">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default MiniAppLayout;
