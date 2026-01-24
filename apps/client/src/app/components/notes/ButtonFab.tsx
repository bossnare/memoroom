import { useLongPress } from '@/app/hooks/use-long-press';
import { useNoteServices } from '@/app/hooks/use-note-services';
import { Button } from '@/components/ui/button';
import { waitVibrate } from '@/shared/utils/vibration';
import { SquarePen } from 'lucide-react';

export function ButtonFab({
  openCreateOptions,
}: {
  openCreateOptions?: () => void;
}) {
  const { openNewNote } = useNoteServices();
  const longPress = useLongPress({
    onLongPress: () => {
      openCreateOptions?.();
      waitVibrate(400, 'low');
    },
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
