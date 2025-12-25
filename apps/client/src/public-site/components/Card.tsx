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

const LoginCard = ({
  open,
  toggle,
}: {
  open?: boolean;
  toggle?: () => void;
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
            className="fixed fixed-center z-100 bg-card dark:bg-background overflow-y-auto scroll-touch border border-border space-y-4 w-[94%] lg:w-full h-1/2 md:h-[calc(100dvh-10rem)] p-4 rounded-xl max-w-md"
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
                onClick={async () => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  toggle ? toggle() : null;
                  await AuthService.googleSign();
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
                With Google
              </Button>
              <Button
                onClick={async () => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  toggle ? toggle() : null;
                  await AuthService.githubSign();
                }}
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

export { LoginCard };
