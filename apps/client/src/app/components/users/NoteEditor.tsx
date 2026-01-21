import {
  MAX_TOOLTIP_WIDTH,
  MIN_TOOLTIP_WIDTH,
} from '@/app/constants/layout.constant';
import { useCreateNote, useUpdateNote } from '@/app/hooks/use-note';
import { usePannel } from '@/app/hooks/use-pannel';
import { dateFormatLong } from '@/app/lib/date-format';
import { cn } from '@/app/lib/utils';
import type { NoteInterface } from '@/app/types/note.type';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useQueryToggle } from '@/shared/hooks/use-query-toggle';
import { useToggle } from '@/shared/hooks/use-toggle';
import { handleWait } from '@/shared/utils/handle-wait';
import { Portal } from '@radix-ui/react-portal';
import { AxiosError } from 'axios';
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  PanelLeftClose,
  PanelRightClose,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ConfirmDialog } from './ConfirmDialog';
import { ConfirmDrawer } from './ConfirmDrawer';

type NoteEditorProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: 'new' | 'edit' | 'view';
  note?: NoteInterface;
};

export const NoteEditor = ({
  className,
  mode = 'edit',
  note,
}: NoteEditorProps) => {
  const contentAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [charCounts, setCharCounts] = useState(0);
  const [wordCounts, setWordCounts] = useState(0);
  const [title, setTitle] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');
  const [initial, setInitial] = useState<{
    title: string | undefined;
    content: string | undefined;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // query params state
  const {
    open: openDirtyConfirm,
    isOpen: isOpenDirtyConfirm,
    close: closeDirtyConfirm,
  } = useQueryToggle({ key: 'ui', value: 'isDirty' })!;

  // use mutation
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const isEdit = mode === 'edit';
  const isNew = mode === 'new';
  const fromClipboard = params.get('source') === 'clipboard';
  const fromFile = params.get('source') === 'file';

  const editorMode = {
    new: 'New',
    edit: 'Edit',
    view: 'View',
  };
  const saveMode = {
    new: 'Create note',
    edit: 'Save changes',
    view: 'Read note',
  };
  const editorState = editorMode[mode];
  const saveButtonText = saveMode[mode];

  // if paste from clipboard action
  useEffect(() => {
    if (isNew && fromClipboard) {
      const draft = sessionStorage.getItem('draft:clipboard');
      if (!draft?.trim()) toast.info('No text found in clipboard.');

      if (draft) {
        setTitle(draft.split('\n')[0].slice(0, 50).trim());
        setContent(draft);
        // remove draft after getting it
        sessionStorage.removeItem('draft:clipboard');
      }
    }
  }, [fromClipboard, isNew]);

  // from file
  useEffect(() => {
    if (isNew && fromFile) {
      const raw = sessionStorage.getItem('draft:fileInfo');
      const draft = raw ? JSON.parse(raw) : null;
      if (!draft) return;

      if (draft) {
        setTitle(draft.title);
        setContent(draft.content);
        // remove draft after getting it
        sessionStorage.removeItem('draft:fileInfo');
      }
    }
  }, [fromFile, isNew]);

  // initial fill
  useEffect(() => {
    if (isEdit) {
      setTitle(note?.title);
      setContent(note?.content);
      setInitial({ title: note?.title, content: note?.content });
    }
  }, [isEdit, note]);

  useEffect(() => {
    // add a delay for initial any content on load...
    setTimeout(() => {
      if (contentAreaRef.current) {
        contentAreaRef.current.focus();
        setCharCounts(contentAreaRef.current.value.length); // initial chars value
        setWordCounts(contentAreaRef.current.value.trim().split(/\s+/).length);
      }
    }, 100);
  }, []);

  // transform
  const { value: isOpenPanel, toggle: toggleOpenPanel } = useToggle(true);

  const { pannelWidth: TOOLTIP_WIDTH, mainTransform: MAIN_TRANSFORM } =
    usePannel(isOpenPanel, MIN_TOOLTIP_WIDTH, MAX_TOOLTIP_WIDTH);

  const isDirty = title !== initial?.title || content !== initial?.content;

  const autoGrow = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto'; // initial reset height value
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const bodyPayload = {
    title: title as string,
    content: content as string,
  };

  const handleCreateNote = async () => {
    setIsSaving(true);
    try {
      const noteCreated = await createNote.mutateAsync(bodyPayload);
      console.log(noteCreated.message);
      toast(noteCreated.message);
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err.message);
      console.log('backend error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateNote = async () => {
    setIsSaving(true);
    try {
      if (!note) return;

      const res = await updateNote.mutateAsync({
        id: note.id,
        data: bodyPayload,
      });
      toast(res.message);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  const canSave = title?.trim() || content?.trim();

  const handleCancel = () => {
    if (canSave && isDirty) {
      openDirtyConfirm();
    } else {
      navigate(-1);
    }
  };

  const handleSave = () => {
    if (isEdit) handleUpdateNote(); // update if edit mode
    else handleCreateNote();
  };

  // fix later
  const isDirtyConfirmTitle = 'Unsaved changes';
  const isDirtyConfirmDescription =
    'You have unsaved changes. If you leave now, they will be lost.';
  const isDirtyCancelLabel = 'Keep editing';
  const isDirtyConfirmLabel = 'Discard';

  return (
    <>
      {/* Confirm UI */}
      {/* drawer - mobile only */}
      <ConfirmDrawer
        showOn="mobile"
        title={isDirtyConfirmTitle}
        description={isDirtyConfirmDescription}
        cancelLabel={isDirtyCancelLabel}
        confirmLabel={isDirtyConfirmLabel}
        isOpen={isOpenDirtyConfirm}
        onClose={closeDirtyConfirm}
        buttonVariant={'destructive'}
        onConfirm={() => navigate('/app')}
      />
      {/* confirm dialog - desktop only */}
      <ConfirmDialog
        showOn="desktop"
        title={isDirtyConfirmTitle}
        description={isDirtyConfirmDescription}
        cancelLabel={isDirtyCancelLabel}
        confirmLabel={isDirtyConfirmLabel}
        isOpen={isOpenDirtyConfirm}
        onClose={closeDirtyConfirm}
        buttonVariant={'destructive'}
        onConfirm={() => navigate('/app')}
      />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={cn('min-h-screen relative', className)}
      >
        <Portal>
          <aside
            style={{ width: TOOLTIP_WIDTH }}
            className="fixed inset-y-0 left-0 hidden md:block w-54 lg:transition duration-600"
          >
            <nav className="bg-sidebar size-full">
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
                <span className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleCancel}
                    variant="ghost"
                    className="bg-accent/20"
                    size="icon-lg"
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    className="bg-accent/20"
                    variant="ghost"
                    size="icon-lg"
                  >
                    <ChevronRight />
                  </Button>
                </span>

                <span className="herit">
                  <Button onClick={toggleOpenPanel} variant="ghost" size="icon">
                    {isOpenPanel ? <PanelLeftClose /> : <PanelRightClose />}
                  </Button>
                </span>
              </div>
            </nav>
          </aside>
        </Portal>
        {/* editor */}
        <div
          style={!isMobile ? MAIN_TRANSFORM : { width: '100vw' }}
          className="flex flex-col lg:transition-transform lg:duration-600"
        >
          <header className="sticky top-0 left-0 bg-background">
            <div className="flex items-center justify-between h-12 max-w-6xl px-4 pr-2 mx-auto">
              <button
                onClick={handleCancel}
                className="p-0 font-semibold md:hidden text-primary active:opacity-80"
              >
                Cancel
              </button>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>{editorState} notes</span>{' '}
                <Button size="icon" variant="ghost" className="md:hidden">
                  <Ellipsis />
                </Button>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="hidden md:inline-flex"
              >
                <Ellipsis />
              </Button>

              <Button
                disabled={!canSave || !isDirty}
                onClick={() => {
                  handleSave();
                  handleWait(() => navigate('/app'), 200);
                }}
                className="font-bold rounded-full select-none"
                variant="ghost"
              >
                {isSaving ? 'saving...' : saveButtonText}
              </Button>
            </div>
          </header>

          {/* edit content */}
          <main className="flex-1">
            <div className="max-w-6xl px-4 pb-20 mx-auto space-y-3 font-inter lg:pb-32">
              <textarea
                rows={1}
                className="w-full mt-2 text-3xl font-bold leading-10 tracking-tight transition-all resize-none selection:bg-primary caret-primary focus:caret-accent field-sizing-content min-h-auto scrollbar-none placeholder:text-2xl focus:outline-0"
                placeholder="Title"
                value={title}
                // onFocus={autoGrowOnFocus}
                onInput={(e) => {
                  setTitle(e.currentTarget.value);
                  autoGrow(e);
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.value.trim())
                    e.currentTarget.style.height = 'auto';
                  setTitle(title?.trim());
                }}
              ></textarea>
              <div className="left-0 pb-1 space-x-2 text-sm lg:sticky bg-background top-12 text-muted-foreground">
                <span>
                  {isEdit
                    ? dateFormatLong(note?.updatedAt ?? new Date())
                    : dateFormatLong(new Date())}
                </span>
                <span className="w-0.5 border-l dark:border-muted"></span>{' '}
                <span>
                  {charCounts} {charCounts > 1 ? 'characters' : 'character'}
                </span>
                <span className="w-0.5 border-l dark:border-muted"></span>{' '}
                <span> {wordCounts} words </span>
              </div>
              <textarea
                rows={6}
                ref={contentAreaRef}
                value={content}
                // onFocus={autoGrowOnFocus}
                onChange={(e) => {
                  setCharCounts(
                    e.target.value.trim().split(' ').join('').length
                  );
                  setContent(e.currentTarget.value);
                  setWordCounts(
                    e.target.value.trim() === ''
                      ? 0
                      : e.target.value.trim().split(/\s+/).length
                  );
                }}
                onInput={(e) => {
                  autoGrow(e);
                  // scroll to carret
                  // e.currentTarget.scrollIntoView({
                  //   block: 'end',
                  //   behavior: 'auto',
                  // });
                }}
                name=""
                id=""
                className="w-full font-normal leading-8 transition-all resize-none field-sizing-content selection:text-muted-foreground selection:bg-muted caret-primary focus:caret-accent min-h-12 placeholder:text-base focus:outline-0"
                placeholder="Start writing..."
              ></textarea>
            </div>
          </main>
        </div>

        {/* fixed footer for mobile only */}
        <Portal>
          <footer className="fixed inset-x-0 bottom-0 border-t md:hidden bg-background border-sidebar-border/50">
            <div className="max-w-6xl px-4 mx-auto h-14 bg-sidebar/50"></div>
          </footer>
        </Portal>
      </motion.div>
    </>
  );
};
