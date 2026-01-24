import { Button } from '@/components/ui/button';
// import { Paragraphe } from '@/shared/components/Paragraphe';
// import { useAuth } from '@/shared/hooks/use-auth';
// import { X } from 'lucide-react';
import { Spinner } from '@/shared/components/Spinner';
import { useNotification } from '@/app/hooks/use-notification';
import { ArrowDownNarrowWide, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import timeAgo from '../lib/timeAgo';
import { EmptyEmpty as EmptyNotification } from '../components/users/Empty';
import { IconBellZFilled } from '@tabler/icons-react';

function Notification() {
  const { data, isPending, isError, error, refetch } = useNotification();
  const notifications = data ?? [];

  const navigate = useNavigate();

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner variant="half" />
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

  if (notifications?.length < 1)
    return (
      <div className="py-5">
        <EmptyNotification
          noAction
          icon={IconBellZFilled}
          title="No notifications at the moment"
          description="You are all caught up! No new notififcation yet."
        />
      </div>
    );

  return (
    <>
      <div className="max-w-4xl min-h-screen mx-auto md:px-6 lg:bg-muted/80 lg:dark:bg-muted/10">
        <>
          <header className="px-1 pt-4 lg:pt-8">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() =>
                    navigate(-1) || navigate('/app', { replace: true })
                  }
                  size="icon-lg"
                  variant="ghost"
                >
                  <ArrowLeft />
                </Button>
                <h3 className="text-2xl font-medium tracking-tight scroll-m-20">
                  Notifications
                </h3>
              </div>
              <div className="gap-4 mr-4">
                <Button variant="ghost" size="icon-lg">
                  <ArrowDownNarrowWide />
                </Button>
              </div>
            </div>
          </header>
          <main className="min-h-100 md:px-6">
            <div className="grid flex-wrap grid-cols-1 gap-1 pt-4 lg:gap-2">
              {notifications?.map((notif) => (
                <div
                  role="button"
                  key={notif.id}
                  className={cn(
                    notif.isRead
                      ? 'bg-transparent'
                      : 'bg-blue-100/80 hover:bg-blue-100/90 dark:bg-primary/18 dark:lg:hover:bg-primary/22',
                    'select-none flex flex-col gap-1 lg:flex-row active:bg-muted! lg:gap-4 p-2 px-4 cursor-pointer'
                  )}
                >
                  <div className="flex flex-col gap-3 grow">
                    <span className="font-bold truncate md:text-base line-clamp-1">
                      {notif.title || 'Untitled'}
                    </span>
                    <span className="truncate opacity-90 text-wrap md:text-sm line-clamp-2">
                      {notif.message}
                    </span>
                  </div>
                  <div className="text-sm lg:text-xs shrink-0 text-muted-foreground">
                    {timeAgo(notif.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      </div>
    </>
  );
}

export default Notification;
