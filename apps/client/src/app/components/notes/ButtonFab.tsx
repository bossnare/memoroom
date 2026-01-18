import { useLongPress } from '@/app/hooks/use-long-press';
import { useNoteServices } from '@/app/hooks/use-note-services';
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';

export function ButtonFab() {
  const { openNewNote } = useNoteServices();
  const longPress = useLongPress({
    onLongPress: () => alert(''),
  });

  return (
    <Button
      onClick={openNewNote}
      onTouchStart={longPress.handleTouchStart}
      onTouchEnd={longPress.handleTouchEnd}
      onTouchMove={longPress.handleTouchMove}
      onTouchCancel={longPress.handleTouchCancel}
      className="text-white rounded-full shadow-lg size-15 lg:size-14"
    >
      <SquarePen className="size-7 lg:size-6" />
    </Button>
  );
}
