import { UserAvatar } from '@/app/components/users/UserAvatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/shared/components/brand/Logo';
import { useLayoutStore } from '@/stores/layoutStore';
import { waitVibrate } from '@/utils/vibration';
import {
  BellIcon,
  Search,
  TextAlignJustify,
  TriangleAlert,
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useId } from 'react';
import { KebabMenu } from './KebabMenu';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TopBar = () => {
  const inputId = useId();
  const { user } = useAuth();
  const toggleOpenSideOver = useLayoutStore((s) => s.toggleOpenSideOver);

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const menu = params.get('menu');
  const sidebar = params.get('sidebar');

  const openKebabMenu = menu === 'kebab';
  const openMobileSidebar = sidebar === 'mobile';

  const closeKebabMenu = () => {
    searchParams.delete('menu');
    setSearchParams(searchParams, { replace: true });
  };

  const toggleOpenKebabMenu = () => {
    if (openKebabMenu) closeKebabMenu();
    else navigate('?menu=kebab');
  };

  return (
    <nav className="sticky inset-x-0 top-0 flex items-center gap-2 px-2 py-1 pl-1 shadow-lg h-13 z-99 md:h-14 md:px-2 bg-sidebar">
      <div className="flex items-center gap-2 shrink-0">
        {/* mobile menu button */}
        <Button
          size="icon-lg"
          variant="ghost"
          onClick={() => {
            waitVibrate(200, 'low');
            navigate(`?sidebar=mobile`);
          }}
          className="md:hidden"
        >
          <TextAlignJustify className="size-[26px]" />
        </Button>
        <Logo className="md:hidden" />
      </div>
      {/* desktop navigation */}
      <div className="hidden h-10 py-1 px-2 rounded-md bg-input gap-2 md:inline-flex md:w-[50%] lg:w-[36%] items-center shrink-0">
        <label htmlFor={inputId}>
          <Search className="text-muted-foreground size-5" />
        </label>
        <input
          id={inputId}
          type="text"
          name="current-search"
          className="focus:outline-none pl-0.5 text-foreground/90 grow placeholder:text-sm placeholder:text-muted-foreground"
          placeholder="Search your notes, workspaces, ..."
        />
      </div>
      <div className="flex items-center justify-end gap-3 md:gap-4 grow">
        <Button size="icon-lg" variant="ghost" className="relative">
          <BellIcon />
          {/* badge */}
          <span className="absolute p-1 rounded-full top-1 size-2 right-0.5 bg-destructive"></span>
        </Button>
        <div
          role="button"
          onClick={toggleOpenSideOver}
          title={user?.user_metadata.name.split('(')[0]}
          className="relative hidden cursor-pointer size-8 md:block active:bg-input md:hover:bg-input active:opacity-70"
        >
          <UserAvatar
            user={user}
            className="size-full bg-input outline-offset-1 outline outline-input"
          />
          {/* badge */}
          {user && !user.user_metadata.email_verified && (
            <span className="absolute p-1 bg-yellow-200 rounded-full -top-1 -right-1">
              <TriangleAlert className="text-yellow-600 size-4" />
            </span>
          )}
        </div>
        {/* mobile navigation tab */}
        <AnimatePresence>
          <KebabMenu
            toggle={toggleOpenKebabMenu}
            open={openKebabMenu}
            close={closeKebabMenu}
            openMobileSidebar={openMobileSidebar}
          />
        </AnimatePresence>
      </div>
    </nav>
  );
};
