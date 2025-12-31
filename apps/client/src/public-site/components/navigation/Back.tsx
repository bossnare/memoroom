import { Button } from '@/components/ui/button';
import { usePathname } from '@/hooks/use-pathname';
import { cn } from '@/lib/utils';
import { handleWait } from '@/utils/handle-wait';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Props = React.HTMLAttributes<HTMLDivElement> & { fallbackRoute?: string };

export const Back = ({ className, fallbackRoute = '/', ...props }: Props) => {
  const dflt = 'inline-flex font-semibold';
  const { cleanPathname } = usePathname();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div {...props} className={cn(' flex items-center gap-3', className)}>
      <Button
        onClick={() =>
          handleWait(
            () => navigate(-1) || navigate(fallbackRoute, { replace: true })
          )
        }
        size="icon-xl"
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
