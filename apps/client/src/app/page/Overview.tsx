import { Button } from '@/components/ui/button';
// import { Paragraphe } from '@/shared/components/Paragraphe';
// import { useAuth } from '@/shared/hooks/use-auth';
// import { X } from 'lucide-react';
import type { NoteInterface } from '@/app/types/note.interface';
import { Spinner } from '@/shared/components/Spinner';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowDownNarrowWide, ListRestart } from 'lucide-react';
import { useNote } from '../api/notes.api';
import { OrderDrawer } from '../components/users/Drawer';
import { EmptyEmpty as EmptyNotes } from '../components/users/Empty';
import { dateUltraFormat } from '../lib/dateUltraFormat';

function Overview() {
  const { data, isPending, isError, error, refetch } = useNote();
  const notes = data as NoteInterface[];
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });

  const isMobile = useIsMobile();
  const spinnerSize = !isMobile ? 'default' : 'lg';

  const queryClient = useQueryClient();
  const handleRefreshNotes = () => {
    queryClient.refetchQueries({
      queryKey: ['notes'],
    });
  };

  const {
    open: openNotesFilterDrawer,
    isOpen: isOpenNotesSortDrawer,
    close: closeNotesSortDrawer,
  } = useQueryToggle({ key: 'drawer', value: 'notesSorting' })!;
  const { open: openNotesFilterMenu } = useQueryToggle({
    key: 'menu',
    value: 'notesSorting',
  })!;

  const handleClickFilterButton = !isMobile
    ? openNotesFilterMenu
    : openNotesFilterDrawer;

  if (notes?.length < 1)
    return (
      <div className="py-4">
        <EmptyNotes />
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center max-w-lg gap-4 py-10 mx-auto lg:py-20">
        <span className="text-center">{error.message}</span>
        <Button
          onClick={async () => refetch()}
          className="rounded-full"
          size="lg"
        >
          Refetch
        </Button>
      </div>
    );

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner variant="invert" size={spinnerSize} />
      </div>
    );

  return (
    <>
      <div className="min-h-screen px-3 md:px-6 bg-muted dark:bg-background">
        {/* <div className="relative flex flex-col w-full gap-2 p-4 rounded-lg shadow-xs md:p-3 bg-muted dark:bg-muted/60">
          <h4 className="font-bold">Complete your profile</h4>
          <div className="flex flex-col justify-center gap-3 md:items-center md:flex-row md:justify-between">
            <Paragraphe className="cursor-pointer text-muted-foreground md:text-sm">
              {user?.user_metadata.name.split(' (')[0]} If you know, you know.
              As a social media fan, you maybe know it.
            </Paragraphe>
            <div className="flex justify-end gap-4">
              <Button size="sm" variant="secondary">
                Configure
              </Button>
            </div>
          </div>

          <span className="right-1 top-0.5 absolute">
            <Button size="icon-sm" variant="ghost">
              <X className="" />
            </Button>
          </span>
        </div> */}

        <OrderDrawer
          isOpen={isOpenNotesSortDrawer}
          onClose={closeNotesSortDrawer}
        />
        {/* content */}
        <>
          <header className="px-1 pt-8">
            <div className="flex justify-between">
              <h3 className="text-2xl font-medium tracking-tight scroll-m-20">
                All notes
              </h3>
              <div className="flex gap-4">
                <Button
                  onClick={handleRefreshNotes}
                  variant="ghost"
                  className="hidden md:inline-flex"
                  size="icon"
                >
                  <ListRestart />
                </Button>
                <Button
                  onClick={handleClickFilterButton}
                  variant="ghost"
                  className="transition-colors!"
                  size={buttonSize}
                >
                  <ArrowDownNarrowWide />
                </Button>
              </div>
            </div>
          </header>
          <main>
            <div className="grid flex-wrap grid-cols-2 gap-3 pt-4 lg:grid-cols-4">
              {notes?.map((note) => (
                <div
                  role="button"
                  key={note.id}
                  className="flex flex-col gap-4 p-4 cursor-pointer select-none bg-background group active:scale-99 dark:shadow-none hover:bg-background/80 dark:hover:bg-muted active:opacity-60 dark:bg-muted/80 lg:shadow-sm min-h-30 rounded-3xl lg:rounded-xl"
                >
                  <span className="text-lg font-bold truncate md:text-base line-clamp-2 text-wrap">
                    {note.title || 'Untitled'}
                  </span>
                  <span className="truncate transition-colors group-active:text-foreground text-muted-foreground text-wrap md:text-sm line-clamp-3">
                    {note.content}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {dateUltraFormat(note.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </main>
        </>
      </div>
    </>
  );
}

export default Overview;
