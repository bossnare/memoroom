import {
  AlertDialog,
  //   AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button, type ButtonVariant } from '@/components/ui/button';
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

export function ConfirmDialog(props: Props) {
  const handleConfirm = () => {
    props.onClose?.(); // close before confirm
    props.onConfirm?.();
  };

  const isMobile = useIsMobile();

  if (props.showOn === 'mobile' && !isMobile) return null;
  if (props.showOn === 'desktop' && isMobile) return null;

  return (
    <AlertDialog open={props.isOpen} onOpenChange={props.onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title || 'Context'}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.description || 'Description'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{props.cancelLabel || 'Cancel'}</AlertDialogCancel>
          <Button onClick={handleConfirm} variant={props.buttonVariant}>
            {props.confirmLabel || 'Continue'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
