import { Paragraphe } from '@/components/Paragraphe';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

function Overview() {
  const { user } = useAuth();

  return (
    <>
      <div className="py-2 space-y-4">
        <div className="flex flex-col w-full gap-2 p-4 rounded-lg shadow-xs md:p-3 bg-muted/80 dark:bg-muted/50">
          <h4 className="font-bold">Complete your profile</h4>
          <div className="flex flex-col justify-center gap-3 md:items-center md:flex-row md:justify-between">
            <Paragraphe className="text-muted-foreground md:text-sm">
              {user?.user_metadata.name.split(' (')[0]} If you know, you know.
              As a social media fan, you maybe know it.
            </Paragraphe>
            <div className="flex justify-end gap-4">
              <Button
                size="sm"
                variant="ghost"
                className="shadow-xs bg-accent dark:bg-accent/50 text-foreground/80"
              >
                Later
              </Button>
              <Button size="sm" variant="secondary">
                Configure
              </Button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="grid *:hover:bg-blue-800 grid-cols-2 md:grid-cols-4 pt-4 gap-3 flex-wrap *:bg-muted/70 dark:*:bg-muted/40  *:rounded-lg *:h-20">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Overview;
