import { MiniProfile } from '@/app/components/users/MiniProfile';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/shared/services/supabase.service';
import { X } from 'lucide-react';
import { Overlay } from '../../../shared/components/Overlay';
import { desctructiveLabel, sideBarLabel } from './label';
import { SideBarTabWrapper } from './sideBarTab';
import { ScrollArea } from '@/components/ui/scroll-area';

export const SideOver = ({
  isOpen,
  close,
}: {
  isOpen?: boolean;
  close?: () => void;
}) => {
  return (
    <>
      <Overlay
        onClick={close}
        className="hidden z-199 md:block"
        open={isOpen}
      />
      <ScrollArea className="h-dvh">
        <nav
          className={cn(
            isOpen ? 'translate-x-0' : 'translate-x-full',
            'fixed inset-y-0 right-0 md:w-1/3 lg:w-1/4 hidden md:flex flex-col transition-transform ease-in-out duration-200 px-3 pr-1 py-2 border-l z-200 bg-sidebar dark:bg-background text-sidebar-foreground border-border dark:border-sidebar'
          )}
        >
          <div className="flex items-start">
            <MiniProfile className="cursor-pointer grow hover:bg-muted active:opacity-60" />
            <span className="ml-auto shrink-0">
              <Button size="icon" variant="ghost" onClick={close}>
                <X />
              </Button>
            </span>
          </div>

          <ul className="flex flex-col gap-1 grow">
            {sideBarLabel.map((s) => (
              <li key={s.id}>
                <SideBarTabWrapper>
                  <s.icon className="size-5" /> {s.label}
                </SideBarTabWrapper>
              </li>
            ))}
            <>
              {desctructiveLabel.map((s) => (
                <li key={s.id}>
                  <SideBarTabWrapper isDanger={true}>
                    <s.icon className="size-5" /> {s.label}
                  </SideBarTabWrapper>
                </li>
              ))}
            </>
            <div className="w-full mt-auto">
              <Button
                onClick={async () => await supabase.auth.signOut()}
                size="lg"
                variant="outline"
                className="w-full"
              >
                Log out
              </Button>
            </div>
          </ul>
        </nav>
      </ScrollArea>
    </>
  );
};
