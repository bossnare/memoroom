import { IconNote } from '@tabler/icons-react';
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

export function EmptyEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconNote />
        </EmptyMedia>
        <EmptyTitle>No Notes Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any notes yet. Get started by creating your
          first notes.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Notes</Button>
          <Button variant="outline">Create by Template</Button>
        </div>
      </EmptyContent>
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
