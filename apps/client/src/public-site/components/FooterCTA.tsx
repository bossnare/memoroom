import { Button } from '@/components/ui/button';
import { useButtonSize } from '@/hooks/use-button-size';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { handleWait } from '@/utils/handle-wait';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function FooterCTA({
  setOpenLoginCard,
}: {
  setOpenLoginCard: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 1 });
  const ctaSize = useButtonSize({ mobile: 'xl', landscape: 'lg' });
  const ctaVariant = isInView ? 'default' : 'outline';
  const { t } = useTranslation();

  return (
    <section
      id="landing-cta"
      className="flex flex-col justify-center py-12 pb-20"
    >
      <div ref={ref} className="text-center">
        <Button
          onClick={() => handleWait(setOpenLoginCard, 300)}
          size={ctaSize}
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
