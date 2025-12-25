import { overlayVariants } from '@/motions/motion.variant';
import { Overlay } from '@/shared/components/Overlay';
import { motion, AnimatePresence } from 'motion/react';
import { Paragraphe } from '@/shared/components/Paragraphe';
import { Button } from '@/components/ui/button';
import github from '@/assets/providers/github.svg';
import google from '@/assets/providers/google.svg';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { AuthService } from '@/services/supabase.service';
import { handleWait } from '@/utils/handle-wait';
import { Spinner } from '@/shared/components/Spinner';

const LoadingCard = ({ open }: { open?: boolean }) => {
  return (
    <>
      <Overlay className="z-97" open={open} />
      {open && (
        <div className="fixed flex items-center justify-center w-full max-w-sm gap-3 p-6 rounded-lg bg-background fixed-center z-98">
          <Spinner variant="half" />{' '}
          <span className="font-medium">waiting just one second...</span>
        </div>
      )}
    </>
  );
};

const LoginCard = ({
  open,
  toggle,
  setIsPending,
}: {
  open?: boolean;
  toggle: () => void;
  setIsPending: () => void;
}) => {
  const isMobile = useIsMobile();
  const providerButtonSize = !isMobile ? 'default' : 'lg';

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
            className="fixed fixed-center z-100 bg-card dark:bg-background overflow-y-auto scroll-touch border border-border space-y-4 w-[94%] lg:w-full min-h-1/2 md:min-h-[calc(100dvh-14rem)] p-4 md:p-5 rounded-xl max-w-md"
          >
            <header>
              <h4 className="text-2xl font-semibold tracking-tight text-center">
                Sign in
              </h4>
              <Paragraphe className="text-sm text-center text-muted-foreground">
                Choose the provider are you enjoy to connect.
              </Paragraphe>
            </header>

            <div className="flex justify-center gap-4 py-3">
              <span className="sr-only">Sign in with OAuth provider</span>
              <Button
                onClick={() =>
                  handleWait(async () => {
                    setIsPending();
                    toggle();
                    await AuthService.googleSign();
                  }, 250)
                }
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
                With Google
              </Button>
              <Button
                onClick={() =>
                  handleWait(async () => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    toggle ? toggle() : null;
                    await AuthService.githubSign();
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
                With GitHub
              </Button>
            </div>

            <div className="py-3 text-center">OR</div>

            <form action="#" className="flex flex-col items-center gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Your email and continue..."
                className="h-12 md:h-10"
              />
              <Button
                variant="secondary"
                size={providerButtonSize}
                className="w-full"
              >
                Continue with email
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { LoginCard, LoadingCard };
