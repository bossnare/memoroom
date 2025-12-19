import { Paragraphe } from '@/components/Paragraphe';
import { Button } from '@/components/ui/_button';
import { useAuth } from '@/hooks/use-auth';

function Overview() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex py-2 col-span-full">
        <div className="flex flex-col w-full gap-2 p-4 rounded-lg shadow-xs bg-muted/50">
          <h4 className="font-bold">Complete your profile</h4>
          <div className="flex flex-col justify-center gap-3 md:items-center md:flex-row md:justify-between">
            <Paragraphe className="text-muted-foreground md:text-sm">
              {user?.user_metadata.name.split(' (')[0]} If you know, you know.
              As a social media fan, you maybe know it.
            </Paragraphe>
            <div className="flex justify-end gap-4">
              <Button
                size="medium"
                className="font-normal shadow-xs bg-input text-foreground/80"
              >
                Later
              </Button>
              <Button
                size="medium"
                className="bg-secondary text-secondary-foreground"
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
