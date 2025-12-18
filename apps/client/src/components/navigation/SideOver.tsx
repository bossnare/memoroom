import { MiniProfile } from '@/components/users/MiniProfile';
import { X } from 'lucide-react';
import { ButtonIcon, Button } from '../ui/button';
import { Overlay } from './Overlay';
import { cn } from '@/lib/utils';
import { supabase } from '@/services/auth-client.service';
import { sideOverLabel } from './navigation.label';

export const SideOver = ({
  openSideOver,
  toggleOpenSideOver,
}: {
  openSideOver: boolean;
  toggleOpenSideOver: () => void;
}) => {
  return (
    <>
      <Overlay
        onClick={toggleOpenSideOver}
        className="hidden z-199 md:block"
        conditionValue={openSideOver}
      />

      <nav
        className={cn(
          openSideOver ? 'translate-x-0' : 'translate-x-full',
          'fixed inset-y-0 right-0 md:w-1/3 lg:w-1/4 hidden md:flex flex-col transition-transform ease-in-out duration-200 px-3 py-2 border-l z-200 bg-sidebar text-sidebar-foreground border-input'
        )}
      >
        <MiniProfile
          btnAction={
            <ButtonIcon onClick={toggleOpenSideOver}>
              <X />
            </ButtonIcon>
          }
        />
        <div className="flex flex-col gap-2 grow">
          {sideOverLabel.map((s) => (
            <button
              key={s.id}
              className="w-full flex justify-start gap-3 px-2 items-center text-sidebar-foreground/80 lg:hover:text-sidebar-foreground md:active:text-sidebar-foreground h-9 rounded-sm lg:hover:bg-muted md:active:bg-muted lg:active:text-sidebar-foreground/70"
            >
              <s.icon className="size-5" /> {s.label}
            </button>
          ))}
          <div className="w-full mt-auto">
            <Button
              onClick={async () => await supabase.auth.signOut()}
              size="medium"
              className="w-full font-normal border bg-muted text-foreground/90 border-input"
            >
              Log out
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};
