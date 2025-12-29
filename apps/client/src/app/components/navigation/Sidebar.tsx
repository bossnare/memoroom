import { MiniProfile } from '@/app/components/users/MiniProfile';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabase.service';
import { Logo } from '@/shared/components/brand/Logo';
import { useLayoutStore } from '@/stores/layoutStore';
import { waitVibrate } from '@/utils/vibration';
import { PanelLeftClose, PanelLeftOpen, Plus, Settings } from 'lucide-react';
import { Overlay } from '../../../shared/components/Overlay';
import { desctructiveLabel, sideBarLabel } from './label';
import { NavTab } from './NavTab';
import { SideBarTabWrapper } from './sideBarTab';

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

export const MobileSidebar = ({ ref, ...props }: SidebarProps) => {
  const setOpen = useLayoutStore((s) => s.setIsOpenMobileSidebar);
  const open = useLayoutStore((s) => s.isOpenMobileSidebar);

  return (
    <>
      {/* overlay */}
      <Overlay
        className="z-40 md:hidden"
        onClick={() => {
          waitVibrate(200, 'low');
          setOpen(false);
        }}
        open={open}
      />

      <div
        {...props}
        ref={ref}
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:hidden transition-transform will-change-transform text-sidebar-foreground duration-200 px-4 py-2 z-50 ease-in-out w-6/7 bg-background fixed inset-y-0 border-r border-sidebar-border overflow-hidden`}
      >
        <aside className={`relative size-full rounded-xl overflow-y-auto`}>
          <MiniProfile
            btnAction={
              <Button variant="ghost" size="icon-lg">
                <Settings />
              </Button>
            }
          />
          <div className="h-1 my-4 border-t border-sidebar-border"></div>

          <ul className="flex flex-col gap-3 font-medium">
            {sideBarLabel.map((s) => (
              <>
                {s.hiddenOnMobile ? null : (
                  <li key={s.id}>
                    <SideBarTabWrapper>
                      <s.icon className="size-5" /> {s.label}
                    </SideBarTabWrapper>
                  </li>
                )}
              </>
            ))}
            <>
              {desctructiveLabel.map((s) => (
                <li key={s.id}>
                  <SideBarTabWrapper isDanger={true}>
                    <s.icon className="size-5" /> {s.label}
                  </SideBarTabWrapper>
                </li>
              ))}
            </>
          </ul>
          <div className="absolute inset-x-0 w-full px-2 bottom-2 active:bg-muted">
            <Button
              onClick={async () => await supabase.auth.signOut()}
              size="lg"
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
};

export const DesktopSidebar = ({
  width,
  ref,
  ...props
}: SidebarProps & { width: number }) => {
  const isOpenPanel = useLayoutStore((s) => s.isOpenPanel);
  const toggleOpenPanel = useLayoutStore((s) => s.toggleOpenPanel);

  return (
    <div
      style={{ width: `${width}px` }}
      {...props}
      ref={ref}
      className="fixed inset-y-0 z-20 hidden duration-100 ease-in-out border-r transition-all md:max-w-[60px] lg:max-w-64 text-sidebar-foreground bg-sidebar md:block border-sidebar-border"
    >
      <div className="items-center justify-between hidden w-full px-3 py-3 pr-2 lg:flex ">
        {isOpenPanel && <Logo />}
        <Button
          title="Ctrl+T"
          onClick={toggleOpenPanel}
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground/80"
        >
          {isOpenPanel ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div>

      <aside className="relative space-y-4 px-3 w-full md:h-full lg:h-[calc(100%-8%)] overflow-y-auto scrollbar-none">
        <nav className="mt-1 rounded-md">
          <ul className="flex flex-col gap-2">
            <NavTab />
          </ul>
        </nav>

        <div className="h-1 my-2 border-t border-sidebar-border"></div>

        {/* <ToggleTheme /> */}

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-3 pb-2 bg-linear-to-b from-transparent via-zinc-950/20 to-zinc-950/10 dark:to-zinc-950/80 min-h-15">
          <div className="w-full active:bg-muted">
            <Button
              title="create new note"
              size="lg"
              variant="secondary"
              className="w-full font-semibold"
            >
              <Plus className="size-5" />
              {isOpenPanel ? 'Create new note' : null}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
};
