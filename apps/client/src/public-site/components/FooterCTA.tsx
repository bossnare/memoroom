import { Button } from '@/components/ui/button';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { handleWait } from '@/shared/utils/handle-wait';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function FooterCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 1 });
  const ctaVariant = isInView ? 'default' : 'outline';
  const { t } = useTranslation();
  const { open: openLogin } = useQueryToggle({ key: 'auth', value: 'login' });

  return (
    <section
      id="landing-cta"
      className="flex flex-col justify-center py-12 pb-20"
    >
      <div ref={ref} className="text-center">
        <Button
          onClick={() => handleWait(openLogin, 300)}
          size="xl"
          variant={ctaVariant}
          className="font-bold transition-colors duration-300 border-0 rounded-full shadow-lg shadow-primary dark:brightness-120"
        >
          {t('section.footerCTA.button')}
        </Button>
      </div>
      <Paragraphe className="text-sm text-center text-muted-foreground">
        {t('section.footerCTA.subtitle')}
      </Paragraphe>
    </section>
  );
}
