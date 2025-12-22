import { cn } from '@/lib/utils';

export const Tab = ({
  isActive,
  Icon,
  label,
}: {
  isActive?: boolean;
  Icon: React.ElementType;
  label: string;
}) => {
  const activeClass =
    ' font-semibold text-sidebar-foreground dark:md:bg-input/80 md:bg-secondary dark:md:text-sidebar-foreground md:text-secondary-foreground';
  const defaultClass =
    'relative transition-colors overflow-hidden duration-300 md:duration-100 ease-in-out flex items-center justify-center md:justify-start md:rounded-sm w-full cursor-pointer gap-3 p-3 md:px-2 md:h-9 ease-in-out';
  const inactiveClass =
    'font-medium rounded-full md:hover:opacity-80 text-muted-foreground md:text-current active:bg-muted-foreground/20 md:hover:bg-muted';

  return (
    <button
      className={cn(defaultClass, isActive ? activeClass : inactiveClass)}
    >
      {label === 'Search' ? (
        <Icon
          weight={isActive ? 'fill' : 'bold'}
          className="rounded-md shrink-0 md:size-5 size-7"
        />
      ) : (
        <Icon className="rounded-md shrink-0 md:size-5 size-7" />
      )}
      <span className="hidden md:block">{label}</span>
      {/* underline */}
      {isActive && (
        <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
      )}
    </button>
  );
};
