import { Button } from '@/components/ui/button';
// import { Paragraphe } from '@/shared/components/Paragraphe';
// import { useAuth } from '@/shared/hooks/use-auth';
// import { X } from 'lucide-react';
import { Spinner } from '@/shared/components/Spinner';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { handleWait } from '@/shared/utils/handle-wait';
import { Portal } from '@radix-ui/react-portal';
import { IconCheck } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowDownNarrowWide,
  Ellipsis,
  ListChecks,
  ListRestart,
  // Trash,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNote } from '../api/notes.api';
import { ConfirmDrawer } from '../components/users/ConfirmDrawer';
import { OrderDrawer } from '../components/users/Drawer';
import { EmptyEmpty as EmptyNotes } from '../components/users/Empty';
import { SelectModeNoteTooltip } from '../components/users/SelectModeNoteTooltip';
import { dateUltraFormat } from '../lib/date-format';
import { cn } from '../lib/utils';
import api from '../lib/api';

function Overview() {
  const navigate = useNavigate();

  const { data, isPending, isError, error, refetch } = useNote();
  const notes = data ?? [];
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const isMobile = useIsMobile();

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

  const {
    open: openNotesFilterDrawer,
    isOpen: isOpenNotesSortDrawer,
    close: closeNotesSortDrawer,
  } = useQueryToggle({ key: 'drawer', value: 'notesSorting' })!;
  const {
    open: openSelectionMode,
    isOpen: isSelectionMode,
    close: closeSelectionMode,
  } = useQueryToggle({
    key: 'select',
    value: 'selectNotes',
  })!;
  const { open: openNotesFilterMenu } = useQueryToggle({
    key: 'menu',
    value: 'notesSorting',
  })!;
  const { isOpen: isOpenMobileSidebar } = useQueryToggle({
    key: 'sidebar',
    value: 'mobile',
  })!;
  const {
    isOpen: isOpenDeleteConfirm,
    open: openDeleteConfirm,
    close: closeDeleteConfirm,
  } = useQueryToggle({
    key: 'drawer',
    value: 'deleteNote',
  })!;

  const handleClickSortingButton = !isMobile
    ? openNotesFilterMenu
    : openNotesFilterDrawer;

  // for select a notes card on mobile
  const isSelected = (notesId: string) => selected.has(notesId);
  const isHasSellected = selected.size > 0;
  const isAllSelected = selected.size === notes?.map((n) => n.id).length;

  const timerRef = useRef<number | null>(null);
  const longPressRef = useRef(false);

  const handleTouchStart = (id: string) => {
    longPressRef.current = false;
    timerRef.current = window.setTimeout(() => {
      openSelectionMode();
      toggleSelect(id);
    }, 500);
  };

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchMove = () => {
    clear();
  };

  const handleTouchEnd = () => {
    clear();
    // if (!longPressRef.current) ;
  };

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

  // auto clear selected value on selectionMode close
  useEffect(() => {
    if (!isSelectionMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(new Set());
    }
  }, [isSelectionMode]);

  const handleClickNote = (noteId: string) => {
    if (isSelectionMode) toggleSelect(noteId);
    else handleWait(() => navigate(`/note/${noteId}/edit`), 250);
  };

  // refactor later
  type ActionKey = 'move' | 'delete';
  const deleteConfirmTitle =
    selected.size > 1 ? `Delete notes?` : 'Delete this note?';
  const deleteConfirmDescription =
    selected.size > 1
      ? `These notes will no longer appear in your notes. You can undo this action`
      : `This notes will no longer appear in your notes. You can undo this action`;
  const deleteConfirmLabel =
    selected.size > 1 ? `Delete (${selected.size})` : 'Delete';

  const handleDelete = async () => {
    try {
      const res = await api.patch('/notes', {
        idsToRemove: Array.from(selected),
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const mobileTooltipAction = (actionKey: ActionKey) => {
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
        <EmptyNotes />
      </div>
    );

  return (
    <>
      <div className="min-h-screen pb-2 bg-muted dark:bg-background">
        {/* drawer - mobile only */}
        <ConfirmDrawer
          title={deleteConfirmTitle}
          description={deleteConfirmDescription}
          actionText={deleteConfirmLabel}
          isOpen={isOpenDeleteConfirm}
          onClose={closeDeleteConfirm}
          action={() => {
            handleDelete();
            closeDeleteConfirm();
          }}
        />
        <OrderDrawer
          isOpen={isOpenNotesSortDrawer}
          onClose={closeNotesSortDrawer}
        />
        {/* content */}
        <>
          <header className="sticky top-0 z-20 px-4 pt-8 md:px-7 bg-background">
            {isSelectionMode ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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
                  <span className="hidden font-medium lg:inline-flex">
                    {selected.size} selected
                  </span>
                </div>
                {/* mobile only */}
                <span className="text-xl font-medium lg:hidden">
                  {selected.size} selected
                </span>

                {/* tooltip */}
                <div className="justify-end hidden lg:flex grow">
                  <SelectModeNoteTooltip
                    className="space-x-2"
                    disabled={!isHasSellected}
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
                    onClick={handleRefreshNotes}
                    variant="ghost"
                    className="hidden md:inline-flex"
                    size="icon"
                  >
                    <ListRestart />
                  </Button>
                  <Button
                    onClick={handleClickSortingButton}
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
            <div className="grid grid-cols-2 gap-3 pt-2 lg:grid-cols-4">
              {notes?.map((note) => (
                <div
                  role="button"
                  onTouchStart={() => handleTouchStart(note.id)}
                  onClick={() => handleClickNote(note.id)}
                  onTouchEnd={handleTouchEnd}
                  onTouchMove={handleTouchMove}
                  key={note.id}
                  className="relative flex flex-col gap-4 p-4 transition cursor-pointer select-none bg-card group active:scale-99 lg:active:scale-100 dark:shadow-none hover:bg-background/80 dark:hover:bg-muted active:opacity-60 dark:bg-muted/80 lg:shadow-sm rounded-2xl lg:rounded-xl"
                >
                  <span className="text-lg font-bold leading-none truncate md:text-base line-clamp-2 lg:line-clamp-1 text-wrap">
                    {note.title || 'Untitled'}
                  </span>
                  <span className="truncate transition-colors group-active:text-foreground text-muted-foreground text-wrap md:text-sm line-clamp-4 lg:line-clamp-1">
                    {note.content}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {dateUltraFormat(note.updatedAt)}
                  </span>

                  {/* options toggle - desktop */}
                  {!isSelectionMode && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute hidden scale-0 z-2 top-2 right-2 group-hover:scale-100 lg:inline-flex"
                    >
                      <Ellipsis />
                    </Button>
                  )}
                  {/* mobile only */}
                  <div
                    className={cn(
                      isSelectionMode ? 'scale-100' : 'scale-0',
                      'absolute z-2 bottom-3 right-3 lg:hover:bg-muted-foreground/60 size-7 lg:size-5 bg-muted-foreground/40 rounded-full transition'
                    )}
                  >
                    <div
                      className={cn(
                        isSelected(note.id)
                          ? 'scale-100 opacity-100'
                          : 'scale-0 opacity-0',
                        'size-full flex items-center justify-center rounded-full transition bg-primary'
                      )}
                    >
                      <IconCheck className="size-5 lg:size-4 text-secondary-foreground dark:text-foreground stroke-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      </div>

      {/* mobile select toollip */}

      <Portal>
        {!isOpenMobileSidebar && isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-x-0 bottom-0! flex items-center h-16 px-4 lg:hidden bg-sidebar z-22"
          >
            <SelectModeNoteTooltip
              onAction={mobileTooltipAction}
              disabled={!isHasSellected}
              className="flex justify-between w-full"
            />
          </motion.div>
        )}
      </Portal>
    </>
  );
}

export default Overview;
