import { IconFileSadFilled } from '@tabler/icons-react';
// import { ArrowUpRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

type Props = {
  icon: React.ElementType;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  noAction?: boolean;
};

export function EmptyEmpty(props: Props) {
  const Icon = props.icon;

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {props.icon ? <Icon /> : <IconFileSadFilled />}
        </EmptyMedia>
        <EmptyTitle>{props.title || 'Title'}</EmptyTitle>
        <EmptyDescription>
          {props.description || 'Description'}
        </EmptyDescription>
      </EmptyHeader>
      {!props.noAction && (
        <EmptyContent>
          <div className="flex gap-2">
            <Button size="lg" onClick={props.onPrimaryAction}>
              {props.primaryLabel}{' '}
            </Button>
            <Button
              size="lg"
              onClick={props.onSecondaryAction}
              variant="outline"
            >
              {props.secondaryLabel}{' '}
            </Button>
          </div>
        </EmptyContent>
      )}
      {/* <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button> */}
    </Empty>
  );
}
