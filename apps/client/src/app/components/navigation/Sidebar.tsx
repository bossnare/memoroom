import { MiniProfile } from '@/app/components/users/MiniProfile';
import { cn } from '@/app/lib/utils';
import { useLayoutStore } from '@/app/stores/layoutStore';
import { Button } from '@/components/ui/button';
import { Logo } from '@/shared/components/brand/Logo';
import { Overlay } from '@/shared/components/Overlay';
import { waitVibrate } from '@/shared/utils/vibration';
import { File, PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { desctructiveLabel, sideBarLabel, tabLabel } from './label';
import { NavTab } from './NavTab';
import { SideBarTabWrapper } from './sideBarTab';
import { useNoteServices } from '@/app/hooks/use-note-services';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

export const MobileSidebar = ({
  open,
  close,
  ref,
  ...props
}: SidebarProps & { open?: boolean; close: () => void }) => {
  return (
    <>
      {/* overlay */}
      <Overlay
        className="z-40 dark:bg-white/40 md:hidden"
        onClick={() => {
          close();
          waitVibrate(300, 'low');
        }}
        open={open}
      />

      <div
        {...props}
        ref={ref}
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:hidden transition-transform will-change-transform text-sidebar-foreground overflow-y-auto duration-300 px-4 py-2 z-50 ease-in-out w-5/6 bg-background fixed inset-y-0 border-r border-sidebar-border/30 overflow-hidden`}
      >
        <aside className={`relative size-full rounded-xl`}>
          <MiniProfile />

          <div className="h-1 my-4 border-t border-sidebar-border"></div>
          <ul className="flex flex-col gap-3 font-medium">
            {/* tab label map & interact */}
            {tabLabel.map((t) => (
              <li key={t.route}>
                <NavLink title={t.label} to={t.route} end={t.route === '/app'}>
                  {({ isActive }) => (
                    <button
                      className={cn(
                        isActive
                          ? 'font-bold text-sidebar-foreground'
                          : 'font-normal text-sidebar-foreground/90',
                        'text-xl flex gap-4 px-2 py-2 items-center w-full active:bg-muted'
                      )}
                    >
                      {t.label === 'Search' ? (
                        <t.icon weight={isActive ? 'fill' : 'bold'} />
                      ) : (
                        <t.icon />
                      )}{' '}
                      {t.label}
                    </button>
                  )}
                </NavLink>
              </li>
            ))}

            {sideBarLabel.map((s) => (
              <>
                {
                  <li key={s.id}>
                    <NavLink to={s.route}>
                      {({ isActive }) => (
                        <button
                          className={cn(
                            isActive
                              ? 'font-bold text-sidebar-foreground'
                              : 'font-normal text-sidebar-foreground/90',
                            'text-xl flex gap-4 px-2 py-2 items-center w-full active:bg-muted'
                          )}
                        >
                          <s.icon /> {s.label}
                        </button>
                      )}
                    </NavLink>
                  </li>
                }
              </>
            ))}
            <>
              {desctructiveLabel.map((s) => (
                <li key={s.label}>
                  <SideBarTabWrapper isDanger={true}>
                    <s.icon className="size-5" /> {s.label}
                  </SideBarTabWrapper>
                </li>
              ))}
            </>
          </ul>
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
  const { openNewNote, openCreateFromFile } = useNoteServices();

  const [isDrag, setIsDrag] = useState(false);
  const [fileInfo, setFileInfo] = useState<Record<string, string> | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = async (file: File) => {
    // const ext = file.name.split('.').pop()?.toLocaleLowerCase();
    if (!file.type.startsWith('text') && file.type !== 'application/json') {
      toast.error('Not a text file');
      return;
    }

    // set file info - for display
    setFileInfo({
      name: file.name,
      type: file.type,
    });

    const text = await file.text();
    // set a draft
    sessionStorage.setItem(
      'draft:fileInfo',
      JSON.stringify({
        title: file.name.split('.')[0],
        content: text,
      })
    );
  };

  const handleCancel = () => {
    setFileInfo(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <aside
      style={{ width: `${width}px` }}
      {...props}
      ref={ref}
      className="fixed inset-y-0 z-20 hidden duration-100 ease-in-out border-r transition-all md:max-w-[62px] lg:max-w-64 text-sidebar-foreground bg-sidebar md:block border-sidebar-border"
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

      <div className="relative space-y-4 px-3 w-full md:h-full lg:h-[calc(100%-8%)] overflow-y-auto scrollbar-none">
        <nav className="mt-1 rounded-md">
          <ul className="flex flex-col gap-2">
            <NavTab />
          </ul>
        </nav>

        <div className="h-1 my-2 border-t border-sidebar-border"></div>

        {/* drag and drop file */}
        <div className="mt-4 rounded-md bg-background/20">
          {isOpenPanel ? (
            <>
              {fileInfo ? (
                <div className="flex flex-col items-center justify-center gap-3 p-2 border-[1.9px] border-primary/50 border-dashed rounded-md h-60 bg-primary/4">
                  <File />
                  <span className="text-sm text-center truncate select-none text-muted-foreground text-balance line-clamp-4">
                    {fileInfo.name} {fileInfo.type}
                  </span>
                  <span className="flex flex-col items-center justify-center gap-2">
                    <Button
                      className="rounded-full"
                      onClick={openCreateFromFile}
                    >
                      Continue
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                  </span>
                </div>
              ) : (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDrag(true);
                  }}
                  onDragLeave={() => setIsDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDrag(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleFiles(file);
                  }}
                  className={cn(
                    isDrag ? 'border-primary' : 'border-muted-foreground',
                    'flex cursor-pointer flex-col active:opacity-60 lg:hover:bg-primary/5 items-center justify-center gap-3 p-2 border-[1.9px] border-dashed rounded-md h-60 bg-primary/3'
                  )}
                >
                  <Plus />
                  <span className="text-sm text-center select-none text-muted-foreground text-balance">
                    Drag or click your file (.txt, .json) to create a new note.
                  </span>

                  <input
                    ref={inputFileRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFiles(file);
                      }
                    }}
                    type="file"
                    hidden
                    // accept=".json, .txt"
                  />
                </label>
              )}
            </>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-3 pb-2 bg-linear-to-b from-transparent via-zinc-950/20 to-zinc-950/10 dark:to-zinc-950/80 min-h-15">
          <div className="w-full active:bg-muted">
            <Button
              onClick={openNewNote}
              title={isOpenPanel ? 'create new note' : ''}
              size="lg"
              variant="secondary"
              className="hidden w-full font-semibold lg:inline-flex"
            >
              <Plus className="size-5" />
              {isOpenPanel ? 'Create new note' : null}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
