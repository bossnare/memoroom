import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';

type Props = {
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  isOpen?: boolean;
  onClose?: () => void;
  action?: () => void;
};

export function ConfirmDrawer(props: Props) {
  return (
    <Drawer open={props.isOpen} onOpenChange={props.onClose}>
      <DrawerContent className="dark:bg-sidebar rounded-t-3xl">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-[20px]">
              {props.title || 'Context'}
            </DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          <div className="pb-8 px-2 flex gap-4 justify-center [&_button]:min-w-38">
            <DrawerClose asChild>
              <Button
                size="xl"
                variant="ghost"
                className="bg-input rounded-full text-[16px]"
              >
                {props.cancelText || 'Cancel'}
              </Button>
            </DrawerClose>
            <Button
              onClick={props.action}
              size="xl"
              variant="secondary"
              className="rounded-full font-bold text-[16px]"
            >
              {props.actionText || 'Action'}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
