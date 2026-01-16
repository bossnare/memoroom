import { cn } from '@/app/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { IconCheck } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';

export function OrderDrawer({
  isOpen,
  onClose,
  showOn,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  showOn?: 'mobile' | 'desktop';
}) {
  const sortLabel = [
    { id: 1, label: 'recently edited', sort: 'updatedAt', order: 'desc' },
    { id: 3, label: 'date created', sort: 'createdAt', order: 'desc' },
    { id: 2, label: 'title', sort: 'title', order: 'asc' },
  ];

  const isMobile = useIsMobile();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeSort = searchParams.get('sort') ?? 'updatedAt';

  const setOrder = (next: Record<string, string>) => {
    setSearchParams(
      (prev) => ({
        ...Object.fromEntries(prev),
        ...next,
      }),
      {
        replace: true,
      }
    );
  };

  if (showOn === 'mobile' && !isMobile) return null;
  if (showOn === 'desktop' && isMobile) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="dark:bg-muted rounded-t-3xl">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-[20px]">Sort notes</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="pb-8">
            <ul className="space-y-1">
              {sortLabel.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() =>
                      setOrder({
                        sort: `${s.sort}`,
                        order: `${s.order}`,
                        drawer: 'undefined',
                      })
                    }
                    className={cn(
                      activeSort === s.sort ? 'text-chart-2' : '',
                      'flex items-center justify-between w-full p-4 px-6 cursor-pointer active:bg-muted-foreground/30'
                    )}
                  >
                    <span className="text-lg font-medium">By {s.label}</span>

                    {activeSort === s.sort && (
                      <span>
                        <IconCheck className="stroke-4" />
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
