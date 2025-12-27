import { type ButtonSize } from '@/components/ui/button';
import { useIsMobile } from './use-mobile';

type ButtonSizeConfig = Partial<{
  mobile: ButtonSize;
  landscape: ButtonSize;
}>;

// work on shadcn button ---
export const useButtonSize = (config: ButtonSizeConfig) => {
  const isMobile = useIsMobile();
  const buttonSize = !isMobile ? config.landscape : config.mobile;

  return buttonSize;
};
