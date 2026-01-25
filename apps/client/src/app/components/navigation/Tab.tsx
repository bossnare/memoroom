import { cn } from '@/app/lib/utils';

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
    ' font-semibold text-sidebar-foreground dark:md:bg-input/80 md:bg-secondary md:text-secondary-foreground dark:md:text-sidebar-foreground';
  const defaultClass =
    'relative transition-colors overflow-hidden duration-300 md:duration-100 ease-in-out rounded-full active:bg-muted-foreground/10 flex items-center justify-center md:justify-start md:rounded-sm w-full cursor-pointer gap-4 p-3 md:px-2 md:h-9 ease-in-out';
  const inactiveClass = 'font-medium md:text-current md:hover:bg-input/80';

  return (
    <button
      className={cn(defaultClass, isActive ? activeClass : inactiveClass)}
    >
      {label === 'Tags' ? (
        <Icon weight={'bold'} className="shrink-0 md:size-[22px] size-7" />
      ) : (
        <Icon
          weight={isActive ? 'fill' : 'bold'}
          className="shrink-0 md:size-[22px] size-7"
        />
      )}
      <span className="hidden lg:block">{label}</span>
      {/* underline */}
      {isActive && (
        <span className="absolute w-1/4 h-1.5 rounded-full md:hidden bottom-0 bg-sidebar-foreground"></span>
      )}
    </button>
  );
};
