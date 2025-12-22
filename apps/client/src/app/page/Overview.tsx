import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { X } from 'lucide-react';

const labels = ['PayPal', 'Spotify', 'Melodayz'];

function Overview() {
  const { user } = useAuth();
  // const { data: me } = useMe();
  // const notes: NoteInterface[] = me?.data?.notes;

  return (
    <>
      <div className="py-2 space-y-4">
        <div className="relative flex flex-col w-full gap-2 p-4 rounded-lg shadow-xs md:p-3 bg-muted/80 dark:bg-muted/50">
          <h4 className="font-bold">Complete your profile</h4>
          <div className="flex flex-col justify-center gap-3 md:items-center md:flex-row md:justify-between">
            <Paragraphe className="cursor-pointer text-muted-foreground md:text-sm hover:text-primary">
              {user?.user_metadata.name.split(' (')[0]} If you know, you know.
              As a social media fan, you maybe know it.
            </Paragraphe>
            <div className="flex justify-end gap-4">
              <Button size="sm" variant="secondary">
                Configure
              </Button>
            </div>
          </div>

          {/* skip */}
          <span className="right-1 top-0.5 absolute">
            <Button size="icon-sm" variant="ghost">
              <X className="" />
            </Button>
          </span>
        </div>

        {/* content */}
        <div className="grid grid-cols-2 md:grid-cols-4 pt-4 gap-3 flex-wrap *:bg-muted/70 dark:*:bg-muted/40  *:rounded-lg *:h-20">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="flex gap-4 *:w-[calc(96%/2)] flex-wrap md:*:w-[calc(100%/6)]">
          {labels.map((l, i) => (
            <div
              key={i}
              className="h-20 p-6 space-x-3 text-lg font-bold rounded-md has-checked:bg-primary/40 has-checked:ring-primary ring ring-input bg-sidebar"
            >
              <input
                type="radio"
                name="paid"
                className="checked:border-indigo-800 size-3"
              />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Overview;
