import logo from '@/assets/icon_mono.svg';
import { usePathname } from '@/hooks/use-pathname';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
type Props = React.HTMLAttributes<HTMLDivElement>;

export const LogoWithPagename = ({ className, ...props }: Props) => {
  const dflt = 'flex font-extrabold leading-none tracking-tighter select-none';
  const { cleanPathname } = usePathname();
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className={cn(
        ' flex items-center gap-2 cursor-pointer active:opacity-80 md:hover:opacity-80',
        className
      )}
    >
      <img
        src={logo}
        fetchPriority="high"
        loading="eager"
        alt="logo"
        className={cn('size-6', 'shrink-0! dark:invert')}
      />
      <span className={cn(dflt, 'text-foreground text-2xl md:text-xl')}>
        {t(`routes.${cleanPathname}`)}
      </span>
    </div>
  );
};
