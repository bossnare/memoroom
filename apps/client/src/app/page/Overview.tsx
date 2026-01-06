import { Button } from '@/components/ui/button';
// import { Paragraphe } from '@/shared/components/Paragraphe';
// import { useAuth } from '@/shared/hooks/use-auth';
// import { X } from 'lucide-react';
import { Spinner } from '@/shared/components/Spinner';
import { useNote } from '../api/notes.api';
import { ArrowDownNarrowWide, ListRestart } from 'lucide-react';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import type { NoteInterface } from '@/app/types/note.interface';
import { EmptyEmpty as EmptyNotes } from '../components/users/Empty';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { useQueryClient } from '@tanstack/react-query';

function Overview() {
  const { data, isPending, isError, error, refetch } = useNote();
  const notes = data as NoteInterface[];
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });

  const isMobile = useIsMobile();
  const spinnerSize = !isMobile ? 'default' : 'lg';

  const queryClient = useQueryClient();
  const handleRefreshNotes = () =>
    queryClient.refetchQueries({
      queryKey: ['notes'],
    });
  console.log('refetch');

  if (notes?.length < 1)
    return (
      <div className="py-4">
        <EmptyNotes />
      </div>
    );

  if (isError)
    return (
      <div className="mx-auto max-w-lg py-10 lg:py-20 gap-4 items-center flex flex-col">
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
      <div className="flex h-100 items-center justify-center py-10">
        <Spinner variant="invert" size={spinnerSize} />
      </div>
    );

  return (
    <>
      <div className="px-3 md:px-6 min-h-screen bg-muted dark:bg-background">
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

        {/* content */}
        <>
          <header className="px-1 pt-8">
            <div className="flex justify-between">
              <h3 className="text-2xl font-medium tracking-tight scroll-m-20">
                All notes
              </h3>
              <div className="gap-4 flex">
                <Button
                  onClick={handleRefreshNotes}
                  variant="ghost"
                  className="hidden md:inline-flex"
                  size="icon"
                >
                  <ListRestart />
                </Button>
                <Button
                  variant="ghost"
                  className="transition-colors"
                  size={buttonSize}
                >
                  <ArrowDownNarrowWide />
                </Button>
              </div>
            </div>
          </header>
          <main>
            <div className="grid grid-cols-2 lg:grid-cols-4 pt-4 gap-3 flex-wrap">
              {notes?.map((note) => (
                <div
                  role="button"
                  key={note.id}
                  className="bg-background select-none dark:hover:bg-muted active:opacity-80 cursor-pointer dark:bg-muted/80 lg:shadow-sm min-h-30 flex flex-col gap-4 rounded-3xl lg:rounded-xl p-4"
                >
                  <span className="text-lg md:text-base font-bold truncate line-clamp-2">
                    {note.title || 'Untitled'}
                  </span>
                  <span className="opacity-70 truncate text-wrap md:text-sm line-clamp-3">
                    {note.content}
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
