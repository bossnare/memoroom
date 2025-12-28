import { overlayVariants } from '@/motions/motion.variant';
import { Overlay } from '@/shared/components/Overlay';
import { motion, AnimatePresence } from 'motion/react';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { Button } from '@/components/ui/button';
import github from '@/assets/providers/github.svg';
import google from '@/assets/providers/google.svg';
import { Input } from '@/components/ui/input';
import { AuthService } from '@/services/supabase.service';
import { handleWait } from '@/utils/handle-wait';
import { Spinner } from '@/shared/components/Spinner';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useButtonSize } from '@/hooks/use-button-size';

const LoadingCard = ({ open }: { open?: boolean }) => {
  const { t } = useTranslation();

  return (
    <>
      <Overlay className="z-97" open={open} />
      {open && (
        <div className="fixed flex items-center justify-center gap-3 px-6 py-5 rounded-lg bg-background fixed-center z-98">
          <Spinner variant="half" />{' '}
          <span className="font-medium text-muted-foreground dark:text-foreground text-nowrap md:text-sm">
            {t('auth.loading.OAuthState')}...
          </span>
        </div>
      )}
    </>
  );
};

const LoginCard = ({
  open,
  toggle,
  setIsPending,
  setIsPendingFalse,
}: {
  open?: boolean;
  toggle: () => void;
  setIsPending: () => void;
  setIsPendingFalse: () => void;
}) => {
  const providerButtonSize = useButtonSize({
    landscape: 'default',
    mobile: 'lg',
  });
  const { t } = useTranslation();

  return (
    <>
      <Overlay onClick={toggle} open={open} className="z-99" />
      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed fixed-center z-100 bg-card dark:bg-background overflow-y-auto scroll-touch w-[94%] lg:w-full min-h-1/2 md:min-h-[calc(100dvh-14rem)] p-6 rounded-xl max-w-md"
          >
            <div className="relative space-y-4">
              {/* close button */}
              <span className="absolute -right-4 -top-4">
                <Button onClick={toggle} variant="ghost" size="icon-sm">
                  <X />
                </Button>
              </span>

              <header>
                <h4 className="text-2xl font-semibold tracking-tight text-center">
                  {t('auth.title.signin')}
                </h4>
                <Paragraphe className="text-sm text-center text-muted-foreground">
                  {t('auth.subtitle.signin')}.
                </Paragraphe>
              </header>

              <div className="flex flex-col justify-center gap-3 py-3 md:gap-4 lg:flex-row">
                <span className="sr-only">Sign in with OAuth provider</span>
                <Button
                  onClick={() => {
                    handleWait(async () => {
                      setIsPending();
                      toggle();
                      try {
                        await AuthService.googleSign();
                      } catch (e) {
                        if (e) setIsPendingFalse();
                      }
                    }, 250);
                  }}
                  variant="provider"
                  className="rounded-full md:rounded-md"
                  size={providerButtonSize}
                >
                  <img
                    src={google}
                    fetchPriority="high"
                    alt="google-logo"
                    className="size-5 md:size-4"
                  />{' '}
                  {t('auth.button.OAuth.with')} Google
                </Button>
                <Button
                  onClick={() =>
                    handleWait(async () => {
                      setIsPending();
                      toggle();
                      await AuthService.githubSign();
                      setIsPendingFalse();
                    }, 250)
                  }
                  className="rounded-full md:rounded-md"
                  variant="provider"
                  size={providerButtonSize}
                >
                  <img
                    src={github}
                    fetchPriority="high"
                    alt="github-logo"
                    className="size-5 md:size-4 invert"
                  />{' '}
                  {t('auth.button.OAuth.with')} GitHub
                </Button>
              </div>

              <div className="flex items-center justify-center gap-3 py-3">
                <span className="inline-flex w-20 border-t md:w-10 border-muted"></span>
                <span>{t('auth.textDivide')}</span>
                <span className="inline-flex w-20 border-t md:w-10 border-muted"></span>
              </div>

              <form action="#" className="flex flex-col items-center gap-4">
                <Input
                  type="email"
                  name="email"
                  placeholder={`${t('auth.placeholder.email')}...`}
                  className="h-12 placeholder:text-sm md:h-10"
                />
                <Button
                  variant="secondary"
                  size={providerButtonSize}
                  className="w-full"
                >
                  {t('auth.button.OAuth.withEmail')}
                </Button>
              </form>

              {/* terms & privacy policy */}
              <div className="pt-4 text-xs text-center text-muted-foreground text-balance">
                <span>
                  {t('footer.account.noAccount')}?{' '}
                  <a href="#">
                    {' '}
                    <Button className="p-0" variant="link">
                      {t('auth.button.signup')}
                    </Button>
                    {'. '}
                  </a>
                </span>
                <span>
                  {t('footer.legal.agree')}{' '}
                  <a href="#">
                    {' '}
                    <Button className="p-0 text-xs" variant="link">
                      {t('footer.legal.term')}
                    </Button>{' '}
                  </a>{' '}
                  {t('auth.textDivide')}{' '}
                  <a href="#">
                    {' '}
                    <Button className="p-0 text-xs" variant="link">
                      {t('footer.legal.policy')}
                    </Button>{' '}
                  </a>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { LoginCard, LoadingCard };
