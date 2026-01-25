import { Button } from '@/components/ui/button';
import { Spinner } from '@/shared/components/Spinner';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { Portal } from '@radix-ui/react-portal';
import { IconNote } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowDownNarrowWide,
  LassoSelect,
  ListChecks,
  ListRestart,
  X,
  Folder,
  Trash,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNote } from '../hooks/use-note';
import { ConfirmDialog } from '../components/users/ConfirmDialog';
import { ConfirmDrawer } from '../components/users/ConfirmDrawer';
import { OrderDrawer } from '../components/users/OrderDrawer';
import { EmptyEmpty as EmptyNotes } from '../components/users/Empty';
import { NoteList } from '../components/users/NoteList';
import { Toolbar } from '../components/users/Toolbar';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { useNoteServices } from '../hooks/use-note-services';
import { useSoftDeleteMany } from '../hooks/use-note';

function Overview() {
  const { data, isPending, isError, error, refetch } = useNote();
  const notes = data ?? [];
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const isAllSelected = selected.size === notes.map((n) => n.id).length;
  const isHasSellected = selected.size > 0;

  const buttonXSize = useButtonSize({ mobile: 'icon-xl', landscape: 'icon' });
  const buttonToggleSelectAllSize = useButtonSize({
    mobile: 'icon-lg',
    landscape: 'icon',
  });

  const queryClient = useQueryClient();
  const handleRefreshNotes = () => {
    queryClient.refetchQueries({
      queryKey: ['notes'],
    });
  };

  // sorting query drawer params state - mobile only
  const {
    open: openNoteSorting,
    isOpen: isOpenNoteSorting,
    close: closeNoteSorting,
  } = useQueryToggle({ key: 'sorting', value: 'noteSorting' });
  // selection query params state
  const {
    open: openSelectionMode,
    isOpen: isSelectionMode,
    close: closeSelectionMode,
  } = useQueryToggle({
    key: 'select',
    value: 'notes',
  });

  const { isOpen: isOpenMobileSidebar } = useQueryToggle({
    key: 'sidebar',
    value: 'mobile',
  });
  // delete confirm drawer query params state - mobile only
  const {
    isOpen: isOpenDeleteConfirm,
    open: openDeleteConfirm,
    close: closeDeleteConfirm,
  } = useQueryToggle({
    key: 'ui',
    value: 'deleteNote',
  });

  // auto clear selected value on selectionMode close
  useEffect(() => {
    if (!isSelectionMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(new Set());
    }
  }, [isSelectionMode]);

  const toggleSelect = (notesId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(notesId) ? next.delete(notesId) : next.add(notesId);
      return next;
    });
  };

  const toggleSelectAll = (allNotesId: string[]) => {
    setSelected((prev) => {
      const isAllSelected = prev.size === allNotesId.length;
      if (isAllSelected) {
        return new Set(); // clear all
      }
      return new Set(allNotesId); // set all
    });
  };

  const { openNewNote, pasteFromClipboard } = useNoteServices();

  // refactor later
  type ActionKey = 'move' | 'delete';
  type ActionLabel = {
    label: string;
    icon: React.ElementType;
    key: ActionKey;
  };
  // toolbar label
  const toolbarActionLabel: ActionLabel[] = [
    {
      label: 'Move to',
      icon: Folder,
      key: 'move',
    },
    {
      label: 'Delete',
      icon: Trash,
      key: 'delete',
    },
  ];

  const deleteConfirmTitle =
    selected.size > 1 ? `Delete notes?` : 'Delete this note?';
  const deleteConfirmDescription =
    selected.size > 1
      ? `These notes will no longer appear in your notes. You can undo this action`
      : `This notes will no longer appear in your notes. You can undo this action`;
  const deleteConfirmLabel =
    selected.size > 1 ? `Delete (${selected.size})` : 'Delete';

  const softDeleteMany = useSoftDeleteMany();

  const handleDelete = async () => {
    try {
      const deletedNotes = await softDeleteMany.mutateAsync({
        idsToRemove: [...selected], // transform as Array
      });

      toast(deletedNotes.message);
      console.log(deletedNotes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTooltipAction = (actionKey: ActionKey) => {
    switch (actionKey) {
      case 'move':
        console.log('move');
        break;
      case 'delete':
        openDeleteConfirm();
        break;
    }
  };

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner />
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

  if (notes?.length < 1)
    return (
      <div className="py-4">
        <EmptyNotes
          icon={IconNote}
          title="No Notes Yet"
          description="You haven't created any notes yet. Get started by creating your first notes."
          primaryLabel="Create Notes"
          secondaryLabel="Paste from Clipboard"
          onPrimaryAction={openNewNote}
          onSecondaryAction={pasteFromClipboard}
        />
      </div>
    );

  return (
    <>
      <div className="min-h-screen relative pb-2 bg-muted dark:bg-background">
        {/* subtle overlay */}
        <div className="absolute inset-0 hidden pointer-events-none dark:block bg-primary/2 z-20"></div>
        {/* drawer - mobile only */}
        <ConfirmDrawer
          showOn="mobile"
          title={deleteConfirmTitle}
          description={deleteConfirmDescription}
          confirmLabel={deleteConfirmLabel}
          isOpen={isOpenDeleteConfirm}
          onClose={closeDeleteConfirm}
          buttonVariant={'secondary'}
          onConfirm={() => {
            handleDelete();
            closeSelectionMode();
          }}
        />
        {/* confirm dialog - desktop only */}
        <ConfirmDialog
          showOn="desktop"
          title={deleteConfirmTitle}
          description={deleteConfirmDescription}
          confirmLabel={deleteConfirmLabel}
          isOpen={isOpenDeleteConfirm}
          onClose={closeDeleteConfirm}
          buttonVariant={'secondary'}
          onConfirm={() => {
            handleDelete();
            closeSelectionMode();
          }}
        />
        <OrderDrawer
          showOn="mobile"
          isOpen={isOpenNoteSorting}
          onClose={closeNoteSorting}
        />
        {/* content */}
        <>
          <header className="sticky top-0 z-16 px-2 pt-8 mx-2 md:px-2 md:mx-5 bg-muted dark:bg-background">
            {isSelectionMode ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between pb-2 lg:gap-10"
              >
                {/* skip and info on select notes */}
                <div className="flex items-center gap-1">
                  <Button
                    onClick={closeSelectionMode}
                    size={buttonXSize}
                    variant="ghost"
                  >
                    <X />
                  </Button>
                  {/* desktop only */}
                  <span className="hidden font-medium md:inline-flex">
                    {selected.size} selected
                  </span>
                </div>
                {/* mobile only */}
                <span className="text-xl font-medium md:hidden">
                  {selected.size} selected
                </span>

                {/* tooltip */}
                <div className="justify-end hidden md:flex grow">
                  <Toolbar
                    onAction={handleTooltipAction}
                    className="space-x-2"
                    disabled={!isHasSellected}
                    actionLabel={toolbarActionLabel}
                  />
                </div>

                {/* toggle select all button */}
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm lg:inline-flex">
                    {isAllSelected ? 'Unselect all' : 'Select all'}
                  </span>
                  <Button
                    onClick={() => toggleSelectAll(notes?.map((n) => n.id))}
                    size={buttonToggleSelectAllSize}
                    variant="ghost"
                  >
                    <ListChecks
                      className={cn(isAllSelected ? 'text-chart-2' : '')}
                    />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium tracking-tight scroll-m-20">
                  All notes
                </h3>
                <div className="flex gap-4">
                  <Button
                    onClick={openSelectionMode}
                    variant="ghost"
                    size={buttonSize}
                  >
                    <LassoSelect />
                  </Button>
                  <Button
                    onClick={handleRefreshNotes}
                    variant="ghost"
                    className="hidden md:inline-flex"
                    size="icon"
                  >
                    <ListRestart />
                  </Button>
                  <Button
                    onClick={openNoteSorting}
                    variant="ghost"
                    className="transition-colors!"
                    size={buttonSize}
                  >
                    <ArrowDownNarrowWide />
                  </Button>
                </div>
              </div>
            )}
          </header>
          <main className="px-3 md:px-6">
            <NoteList
              selected={selected}
              isSelectionMode={isSelectionMode}
              notes={notes}
              toggleSelect={toggleSelect}
              openSelectionMode={openSelectionMode}
            />
          </main>
        </>
      </div>

      {/* mobile select toollip */}
      <Portal>
        {!isOpenMobileSidebar && isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0! flex items-center h-16 px-4 md:hidden bg-linear-to-b from-transparent to-sidebar/20 z-22"
          >
            <Toolbar
              onAction={handleTooltipAction}
              disabled={!isHasSellected}
              className="flex justify-between w-full"
              actionLabel={toolbarActionLabel}
            />
          </motion.div>
        )}
      </Portal>
    </>
  );
}

export default Overview;
