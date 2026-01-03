import { cn } from '@/app/lib/utils';
import iconMono from '@/assets/icon_mono.svg';
import icon from '@/assets/icon.svg';
// import iconDark from '@/assets/icon_dark.svg';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'lg';
  mono?: boolean;
};

export const Logo = ({ mono, className, size = 'lg', ...props }: Props) => {
  const dflt =
    'flex font-black font-inter leading-none tracking-tight select-none';
  const lg = 'text-[21px] lg:text-2xl';
  const sm = 'text-[18px] lg:text-[20px]';
  const iconSize = size === 'sm' ? 'size-5' : 'size-6';

  const sz = {
    lg,
    sm,
  };

  return (
    <div
      {...props}
      className={cn(
        ' flex items-center gap-2 cursor-pointer active:opacity-80 md:hover:opacity-80',
        className
      )}
    >
      {mono ? (
        <img
          src={iconMono}
          fetchPriority="high"
          loading="eager"
          alt="logo"
          className={cn(iconSize, 'shrink-0! invert dark:invert-0')}
        />
      ) : (
        <span>
          <img
            src={icon}
            fetchPriority="high"
            loading="eager"
            alt="logo"
            className={cn(iconSize, 'shrink-0!')}
          />
          {/* <img
            src={iconDark}
            fetchPriority="high"
            loading="eager"
            alt="logo"
            className={cn(iconSize, 'shrink-0! hidden dark:block')}
          /> */}
        </span>
      )}

      <span className={cn(dflt, sz[size], 'text-foreground')}>DIARY</span>
    </div>
  );
};
