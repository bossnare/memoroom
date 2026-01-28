import { useLongPress } from '@/app/hooks/use-long-press';
import { cn } from '@/app/lib/utils';
import type { NoteInterface } from '@/app/types/note.type';
import { Button } from '@/components/ui/button';
import { handleWait } from '@/shared/utils/handle-wait';
import { IconCheck } from '@tabler/icons-react';
import { Ellipsis } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { NoteCard } from './NoteCard';

type Props = {
  isSelectionMode?: boolean;
  notes?: NoteInterface[];
  selected?: Set<string>;
  openSelectionMode?: () => void;
  toggleSelect?: (id: string) => void;
};

export function NoteList(props: Props) {
  const navigate = useNavigate();
  const longPress = useLongPress({
    onLongPress: (id: string) => {
      props?.openSelectionMode?.();
      props?.toggleSelect?.(id);
    },
  });

  // for select a notes card on mobile
  const isSelected = (notesId: string) => props?.selected?.has(notesId);

  const handleClickNote = (noteId: string) => {
    if (props.isSelectionMode) props?.toggleSelect?.(noteId);
    else handleWait(() => navigate(`/note/${noteId}/edit`), 250);
  };

  return (
    <div className="grid grid-cols-2 gap-3 pt-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence>
        {props.notes?.map((note) => (
          <motion.div
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.05 }}
            key={note.id}
          >
            <NoteCard
              role="button"
              onTouchStart={() => longPress.handleTouchStart(note.id)}
              onClick={() => handleClickNote(note.id)}
              onTouchEnd={longPress.handleTouchEnd}
              onTouchMove={longPress.handleTouchMove}
              onTouchCancel={longPress.handleTouchCancel}
              className={cn(
                isSelected(note.id) && 'bg-background/80! dark:bg-muted!',
                'h-full!'
              )}
              note={note}
            >
              {/* options toggle - desktop */}
              {!props.isSelectionMode && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  size="icon"
                  variant="ghost"
                  className="absolute hidden scale-0 z-2 top-1.5 right-2 group-hover:scale-100 lg:inline-flex"
                >
                  <Ellipsis />
                </Button>
              )}

              <div
                className={cn(
                  props.isSelectionMode ? 'scale-100' : 'scale-0',
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
            </NoteCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
