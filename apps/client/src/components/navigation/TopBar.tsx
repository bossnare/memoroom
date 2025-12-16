import {
  TextAlignJustify,
  Ellipsis,
  Search,
  BellIcon,
  TriangleAlert,
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { useId, useState } from 'react';
import { ButtonIcon } from '@/components/ui/button';
import { waitVibrate } from '@/utils/vibration';
import { useAuth } from '@/hooks/use-auth';
import { MiniNav } from './MiniNav';

export const TopBar = ({
  setOpenSide,
  openSide,
}: {
  setOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
  openSide: boolean;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const inputId = useId();
  const { user } = useAuth();

  return (
    <nav className="sticky inset-x-0 top-0 flex items-center gap-2 px-2 py-1 pl-1 border-b shadow-lg z-99 h-14 md:px-3 bg-background border-border">
      <div className="flex items-center gap-2 shrink-0">
        {/* mobile menu button */}
        <ButtonIcon
          onClick={() => {
            waitVibrate(200, 'low');
            setOpenSide(!openSide);
          }}
          className="md:hidden"
        >
          <TextAlignJustify className="size-[26px]" />
        </ButtonIcon>
        <Logo className="md:hidden" />
      </div>
      {/* desktop navigation */}
      <div className="hidden h-10 py-1 px-2 rounded-md bg-input gap-2 md:inline-flex w-[36%] items-center shrink-0">
        <label htmlFor={inputId}>
          <Search className="text-muted-foreground" />
        </label>
        <input
          id={inputId}
          type="text"
          name="current-search"
          className="focus:outline-none pl-0.5 text-foreground/80 grow placeholder:text-sm placeholder:text-muted-foreground"
          placeholder="Search a note..."
        />
      </div>
      <div className="flex items-center justify-end gap-3 md:gap-4 grow">
        <ButtonIcon className="relative">
          <BellIcon />
          {/* badge */}
          <span className="absolute p-1 rounded-full top-1 size-2 right-0.5 bg-destructive"></span>
        </ButtonIcon>

        <div
          title={user?.user_metadata.name.split('(')[0]}
          className="relative hidden cursor-pointer size-8 md:block active:bg-input md:hover:bg-input active:opacity-60"
        >
          <img
            src={user?.user_metadata.avatar_url}
            alt="user_avatar"
            className="object-cover rounded-full size-full bg-input"
            loading="lazy"
          />
          {/* badge */}
          {!user?.user_metadata.email_verified && (
            <span className="absolute p-1 bg-yellow-200 rounded-full -top-1 -right-1">
              <TriangleAlert className="text-yellow-600 size-4" />
            </span>
          )}
        </div>
        <ButtonIcon
          onClick={() => setOpenMenu(!openMenu)}
          className="md:hidden"
        >
          <Ellipsis />
        </ButtonIcon>
      </div>

      {/* mobile navigation tab */}
      {!openSide && openMenu && <MiniNav />}
    </nav>
  );
};
