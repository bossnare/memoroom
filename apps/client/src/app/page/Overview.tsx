// import { Button } from '@/components/ui/button';
// import { Paragraphe } from '@/shared/components/Paragraphe';
// import { useAuth } from '@/shared/hooks/use-auth';
// import { X } from 'lucide-react';
import { Spinner } from '@/shared/components/Spinner';
import { useMe } from '../api/user.api';

function Overview() {
  const { data: me, isPending } = useMe();

  return (
    <>
      <div className="py-4 px-3 md:px-4 space-y-2 min-h-screen bg-muted dark:bg-background">
        {/* <div className="relative flex flex-col w-full gap-2 p-4 rounded-lg shadow-xs md:p-3 bg-muted dark:bg-muted/60">
          <h4 className="font-bold">Complete your profile</h4>
          <div className="flex flex-col justify-center gap-3 md:items-center md:flex-row md:justify-between">
            <Paragraphe className="cursor-pointer text-muted-foreground md:text-sm">
              {user?.user_metadata.name.split(' (')[0]} If you know, you know.
              As a social media fan, you maybe know it.
            </Paragraphe>
            <div className="flex justify-end gap-4">
              <Button size="sm" variant="secondary">
                Configure
              </Button>
            </div>
          </div>

          <span className="right-1 top-0.5 absolute">
            <Button size="icon-sm" variant="ghost">
              <X className="" />
            </Button>
          </span>
        </div> */}

        {/* content */}
        {isPending ? (
          <div className="flex h-100 items-center justify-center py-10">
            <Spinner variant="half" size="lg" />
          </div>
        ) : (
          <>
            <header>
              <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                All notes
              </h3>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-4 pt-4 gap-3 flex-wrap">
              {me?.data?.notes.map((n) => (
                <div className="bg-background dark:bg-muted/50 shadow-sm min-h-30 flex flex-col gap-4 rounded-lg p-4">
                  <span className="text-lg md:text-base font-bold truncate line-clamp-2">
                    {n.title || 'Untitled'}
                  </span>
                  <span className="opacity-80 truncate text-wrap md:text-sm line-clamp-3">
                    {n.content}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Overview;
