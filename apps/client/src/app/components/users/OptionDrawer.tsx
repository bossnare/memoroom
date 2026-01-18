import { useNoteServices } from '@/app/hooks/use-note-services';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { NotebookPen, FileText, Clipboard } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { FileDropZone } from '../notes/FileDropZone';
import { handleWait } from '@/shared/utils/handle-wait';

type Props = {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  showOn?: 'mobile' | 'desktop';
};

type ActionKey = 'empty' | 'fromFile' | 'fromClipboard';

export function OptionDrawer(props: Props) {
  const NoteServices = useNoteServices();

  const [params, setParams] = useSearchParams();
  const isChooseFromFile = params.get('action') === 'fromFile';
  const p = new URLSearchParams(window.location.search);

  const actionMaps = {
    empty: () => {
      NoteServices.openNewNote();
      props.onClose?.(); // close drawer
    },
    fromFile: () => {
      p.set('action', 'fromFile');
      setParams(p);
    },
    fromClipboard: () => {
      NoteServices.pasteFromClipboard();
      props.onClose?.(); // close drawer
    },
  };

  const handleChooseAction = (actionKey: ActionKey) => {
    const action = actionMaps[actionKey];
    if (!action) return;
    return action();
  };

  const options = [
    {
      label: 'Create empty',
      action: 'empty',
      subtitle: 'Start with a blank note.',
      icon: NotebookPen,
    },
    {
      label: 'Create from file',
      action: 'fromFile',
      subtitle: 'Import content from a file.',
      icon: FileText,
    },
    {
      label: 'Paste from clipboard',
      action: 'fromClipboard',
      subtitle: 'Use text from your clipboard.',
      icon: Clipboard,
    },
  ];

  const isMobile = useIsMobile();

  if (props.showOn === 'mobile' && !isMobile) return null;
  if (props.showOn === 'desktop' && isMobile) return null;

  return (
    <Drawer open={props.isOpen} onOpenChange={props.onClose}>
      <DrawerContent className="dark:bg-sidebar rounded-t-3xl">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader className="space-y-3">
            <DrawerTitle>{props.title}</DrawerTitle>
          </DrawerHeader>
          <div className="pb-8">
            {isChooseFromFile ? (
              <div className="px-3">
                <FileDropZone
                  onContinue={() => {
                    props.onClose?.(); // close drawer
                    p.delete('action');
                    handleWait(NoteServices.openCreateFromFile, 250);
                  }}
                  className="h-60"
                />
              </div>
            ) : (
              <ul className="flex flex-col gap-3 justify-center">
                {options.map((o) => (
                  <li>
                    <div
                      role="button"
                      onClick={() =>
                        handleWait(
                          () => handleChooseAction(o.action as ActionKey),
                          250
                        )
                      }
                      className="w-full select-none px-4 h-16 flex items-center gap-2 rounded-md active:bg-muted dark:active:bg-background"
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
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
