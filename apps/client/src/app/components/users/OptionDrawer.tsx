import { useNoteServices } from '@/app/hooks/use-note-services';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { SquarePen, FolderOpen, ClipboardPaste } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { FileDropZone } from '../notes/FileDropZone';
import { handleWait } from '@/shared/utils/handle-wait';
import { motion, AnimatePresence } from 'motion/react';

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
      icon: SquarePen,
    },
    {
      label: 'Create from file',
      action: 'fromFile',
      subtitle: 'Import content from a file.',
      icon: FolderOpen,
    },
    {
      label: 'Paste from clipboard',
      action: 'fromClipboard',
      subtitle: 'Use text from your clipboard.',
      icon: ClipboardPaste,
    },
  ];

  const isMobile = useIsMobile();

  if (props.showOn === 'mobile' && !isMobile) return null;
  if (props.showOn === 'desktop' && isMobile) return null;

  return (
    <Drawer open={props.isOpen} onOpenChange={props.onClose}>
      <DrawerContent className="dark:bg-sidebar rounded-4xl! w-[96%] mx-auto data-[vaul-drawer-direction=bottom]:bottom-3 overflow-hidden border-t-0!">
        <div className="w-full max-w-md mx-auto">
          <DrawerHeader className="space-y-3">
            <DrawerTitle>{props.title}</DrawerTitle>
          </DrawerHeader>
          <div className="pb-8">
            <AnimatePresence mode="wait">
              {isChooseFromFile ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.1, ease: 'easeInOut' }}
                  key={'file-dropzone'}
                  className="px-3"
                >
                  <FileDropZone
                    onContinue={() => {
                      props.onClose?.(); // close drawer
                      p.delete('action');
                      handleWait(NoteServices.openCreateFromFile, 200);
                    }}
                    className="h-58 w-[94%] mx-auto"
                  />
                </motion.div>
              ) : (
                <motion.ul
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.1 }}
                  key="option-lists"
                  className="flex flex-col justify-center gap-3"
                >
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
                        className="flex items-center w-full h-16 gap-2 px-4 rounded-md select-none active:bg-muted dark:active:bg-background"
                      >
                        <span className="flex items-center justify-center rounded-full size-12 bg-muted">
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
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
