import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/shared/hooks/use-button-size';
import { LassoSelect, ArrowDownNarrowWide, ListRestart } from 'lucide-react';

type Props = {
  openSelectionMode: () => void;
  handleRefreshNotes: () => void;
  openNoteSorting: () => void;
};

export function OverviewToolbar(props: Props) {
  const buttonSize = useButtonSize({ mobile: 'icon-lg', landscape: 'icon' });

  return (
    <div className="flex gap-4">
      <Button
        onClick={props.openSelectionMode}
        variant="ghost"
        size={buttonSize}
      >
        <LassoSelect />
      </Button>
      <Button
        onClick={props.handleRefreshNotes}
        variant="ghost"
        className="hidden md:inline-flex"
        size="icon"
      >
        <ListRestart />
      </Button>
      <Button
        onClick={props.openNoteSorting}
        variant="ghost"
        className="transition-colors!"
        size={buttonSize}
      >
        <ArrowDownNarrowWide />
      </Button>
    </div>
  );
}
