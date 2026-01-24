import { usePathname } from '@/shared/hooks/use-pathname';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useButtonSize } from '@/shared/hooks/use-button-size';

type Props = React.HTMLAttributes<HTMLDivElement> & { fallbackRoute?: string };

export const Back = ({ className, fallbackRoute = '/', ...props }: Props) => {
  const dflt = 'inline-flex font-semibold';
  const { cleanPathname } = usePathname();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const backButtonSize = useButtonSize({
    mobile: 'icon-xl',
    landscape: 'icon-lg',
  });

  return (
    <div {...props} className={cn(' flex items-center gap-1', className)}>
      <Button
        onClick={() =>
          navigate(-1) || navigate(fallbackRoute, { replace: true })
        }
        size={backButtonSize}
        variant="ghost"
      >
        <ArrowLeft />
      </Button>
      <span className={cn(dflt, 'text-foreground text-2xl md:text-xl')}>
        {t(`routes.${cleanPathname}`)}
      </span>
    </div>
  );
};
