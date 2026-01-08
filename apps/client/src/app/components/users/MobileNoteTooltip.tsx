import { Button } from '@/components/ui/button';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { X, Trash } from 'lucide-react';
import { motion } from 'motion/react';

export function MobileNoteTooltip() {
  const { close: closeTooltip } = useQueryToggle({
    key: 'tooltip',
    value: 'selectNotes',
  })!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="fixed inset-x-0 lg:hidden bottom-0 flex items-center justify-between h-16 px-4 z-22 bg-sidebar"
    >
      <Button onClick={closeTooltip} size="icon-xl" variant="ghost">
        <X />
      </Button>
      <Button size="icon-lg" variant="ghost">
        <Trash />
      </Button>
    </motion.div>
  );
}
