import { cn } from '@/lib/utils';
import { Search, BellIcon, Layers, Tags } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function NavTab() {
  const activeClass = ' font-semibold text-sidebar-foreground md:bg-muted';
  const defaultClass =
    'relative flex items-center justify-center md:justify-start md:rounded-md w-full cursor-pointer gap-2 p-4 md:px-3 md:h-9 ease-in-out';
  const inactiveClass =
    'font-medium transition-colors duration-300 ease-in-out md:hover:opacity-80 text-muted-foreground active:bg-muted md:hover:bg-muted/60';

  return (
    <>
      <li>
        <NavLink to="/dashboard" end>
          {({ isActive }) => (
            <button
              className={cn(
                defaultClass,
                isActive ? activeClass : inactiveClass
              )}
            >
              <Layers className="md:size-5" />{' '}
              <span className="hidden md:block">Overview</span>{' '}
              {/* underline */}
              {isActive && (
                <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
              )}
            </button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/search">
          {({ isActive }) => (
            <button
              className={cn(
                defaultClass,
                isActive ? activeClass : inactiveClass
              )}
            >
              <Search className="md:size-5" />{' '}
              <span className="hidden md:block">Search</span> {/* underline */}
              {isActive && (
                <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
              )}
            </button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/notification">
          {({ isActive }) => (
            <button
              className={cn(
                defaultClass,
                isActive ? activeClass : inactiveClass
              )}
            >
              <BellIcon className="md:size-5" />{' '}
              <span className="hidden md:block">Notifications</span>{' '}
              {/* underline */}
              {isActive && (
                <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
              )}
            </button>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/tags">
          {({ isActive }) => (
            <button
              className={cn(
                defaultClass,
                isActive ? activeClass : inactiveClass
              )}
            >
              <Tags className="md:size-5" />{' '}
              <span className="hidden md:block">Tags</span> {/* underline */}
              {isActive && (
                <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
              )}
            </button>
          )}
        </NavLink>
      </li>
    </>
  );
}
