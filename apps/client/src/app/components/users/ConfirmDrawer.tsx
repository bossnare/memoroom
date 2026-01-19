import { Button, type ButtonVariant } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';

type Props = {
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => Promise<void> | void;
  buttonVariant?: ButtonVariant;
  showOn?: 'mobile' | 'desktop';
};

export function ConfirmDrawer(props: Props) {
  const handleConfirm = () => {
    props.onClose?.();
    props.onConfirm?.();
  };

  const isMobile = useIsMobile();

  if (props.showOn === 'mobile' && !isMobile) return null;
  if (props.showOn === 'desktop' && isMobile) return null;

  return (
    <Drawer
      dismissible={false}
      open={props.isOpen}
      onOpenChange={props.onClose}
    >
      <DrawerContent className="dark:bg-sidebar [&>div.h-2]:hidden border-t-0! overflow-hidden rounded-4xl! w-[96%] mx-auto data-[vaul-drawer-direction=bottom]:bottom-3">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader className="space-y-4">
            <DrawerTitle>{props.title || 'Context'}</DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="pb-8 px-2 flex gap-4 justify-center [&_button]:min-w-38">
              <DrawerClose asChild>
                <Button
                  size="xl"
                  variant="ghost"
                  className="bg-input rounded-full text-[16px]"
                >
                  {props.cancelLabel || 'Cancel'}
                </Button>
              </DrawerClose>
              <Button
                onClick={handleConfirm}
                size="xl"
                variant={props.buttonVariant}
                className="rounded-full font-semibold text-[16px]"
              >
                {props.confirmLabel || 'confirm'}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
