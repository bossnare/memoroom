import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

function Overview() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex py-2 col-span-full">
        <div className="flex flex-col w-full gap-2 p-4 rounded-lg shadow-xs bg-muted/50">
          <h4 className="font-bold">Complete your profile</h4>
          <div className="flex flex-col justify-center gap-3 md:items-center md:flex-row md:justify-between">
            <p className="md:text-sm text-muted-foreground">
              {user?.user_metadata.name.split(' (')[0]} If you know, you know.
              As a social media fan, you maybe know it.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                size="medium"
                className="bg-secondary-foreground text-foreground/80 w-auto!"
              >
                Plus tard
              </Button>
              <Button
                size="medium"
                className="bg-secondary text-secondary-foreground w-auto!"
              >
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
