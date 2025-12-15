import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Earth } from 'lucide-react';

function Overview() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex justify-center py-6 col-span-full">
        <div className="flex flex-col items-center justify-center w-full gap-4 p-10 rounded-lg md:w-2/3 bg-muted">
          <h4 className="text-lg font-black">Good morning {user?.email}</h4>
          <p className="text-center md:text-sm text-muted-foreground">
            If you click this browse button, your Overview system down instead,
            and keep click, calm. As a JS dev, click this button please.
          </p>
          <Button>
            <Earth /> Browse notes
          </Button>
        </div>
      </div>
    </>
  );
}

export default Overview;
