import { Button } from '@/components/ui/button';
// import { Paragraphe } from '@/shared/components/Paragraphe';
// import { useAuth } from '@/shared/hooks/use-auth';
// import { X } from 'lucide-react';
import { Spinner } from '@/shared/components/Spinner';
import { useNotification } from '@/app/api/notifications.api';
import { ArrowDownNarrowWide, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import type { NotificationInterface } from '@/app/types/notification.interface';
import { useNavigate } from 'react-router-dom';

function Notification() {
  const { data, isPending, isError, error, refetch } = useNotification();
  const notifications = data as NotificationInterface[];

  const isMobile = useIsMobile();
  const spinnerSize = !isMobile ? 'default' : 'lg';
  const navigate = useNavigate();

  if (notifications?.length < 1)
    return (
      <div className="flex justify-center max-w-3xl py-6 mx-auto text-muted-foreground">
        <span className="text-center">No notification yet.</span>
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

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10 h-100">
        <Spinner variant="invert" size={spinnerSize} />
      </div>
    );

  return (
    <>
      <div className="max-w-4xl min-h-screen px-1 mx-auto md:px-6 bg-primary/5">
        <>
          <header className="pt-2 lg:pt-8">
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
              <div className="gap-4">
                <Button variant="ghost" size="icon-lg">
                  <ArrowDownNarrowWide />
                </Button>
              </div>
            </div>
          </header>
          <main className="md:px-6">
            <div className="grid flex-wrap grid-cols-1 gap-2 pt-4">
              {notifications?.map((notif) => (
                <div
                  role="button"
                  key={notif.id}
                  className="flex flex-col select-none gap-3 p-2 px-4 cursor-pointer rounded-2xl bg-background active:bg-muted! hover:opacity-80 dark:bg-muted/50 lg:rounded-xl"
                >
                  <span className="font-bold truncate md:text-base line-clamp-1">
                    {notif.title || 'Untitled'}
                  </span>
                  <span className="truncate opacity-70 text-wrap md:text-sm line-clamp-2">
                    {notif.message}
                  </span>
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
