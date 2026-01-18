import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { NotebookPen, FileText, Clipboard } from 'lucide-react';

type Props = {
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => Promise<void> | void;
  showOn?: 'mobile' | 'desktop';
};

export function OptionDrawer(props: Props) {
  const handleChoose = async () => {
    await props.onConfirm?.();
    props.onClose?.();
  };

  const isMobile = useIsMobile();

  if (props.showOn === 'mobile' && !isMobile) return null;
  if (props.showOn === 'desktop' && isMobile) return null;

  const options = [
    {
      label: 'Create empty',
      action: 'createEmpty',
      subtitle: 'Start with a blank note.',
      icon: NotebookPen,
    },
    {
      label: 'Create from file',
      action: 'createFromFile',
      subtitle: 'Import content from a file.',
      icon: FileText,
    },
    {
      label: 'Paste from clipboard',
      action: 'pasteFromClipboard',
      subtitle: 'Use text from your clipboard.',
      icon: Clipboard,
    },
  ];

  return (
    <Drawer open={props.isOpen} onOpenChange={props.onClose}>
      <DrawerContent className="dark:bg-sidebar rounded-t-3xl">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader className="space-y-3">
            <DrawerTitle>{props.title}</DrawerTitle>
          </DrawerHeader>
          <div className="pb-8">
            <ul className="flex flex-col gap-4 justify-center">
              {options.map((o) => (
                <li>
                  <div
                    role="button"
                    className="w-full px-2 h-14 flex items-center gap-2 rounded-md active:bg-muted dark:active:bg-background"
                  >
                    <span className="size-12 rounded-full bg-muted flex items-center justify-center">
                      <o.icon />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold tracking-tight">
                        {o.label}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {o.subtitle}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
