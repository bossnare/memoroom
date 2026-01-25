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
import {
  useEditor,
  EditorContent,
  useEditorState,
  type Editor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const extensions = [StarterKit];

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
  const [writingOn, setWritingOn] = useState<Record<string, boolean>>({
    title: false,
    tag: false,
    content: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  // init tiptap editor
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    content: ``,
  });

  // query params state
  const {
    open: openDirtyConfirm,
    isOpen: isOpenDirtyConfirm,
    close: closeDirtyConfirm,
  } = useQueryToggle({ key: 'ui', value: 'isDirty' });

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

  // editor focus state
  useEffect(() => {
    if (!editor) return;

    if (isNew) editor.commands.focus('end');
  }, [editor, isNew]);

  // if paste from clipboard action
  useEffect(() => {
    if (!editor) return;

    if (isNew && fromClipboard) {
      const draft = sessionStorage.getItem('draft:clipboard');
      if (!draft?.trim()) toast.info('No text found in clipboard.');

      if (draft) {
        setTitle(draft.split('\n')[0].slice(0, 50).trim());
        setContent(draft);
        editor.commands.setContent(`<p>${draft}</p>`);
        // remove draft after getting it
        sessionStorage.removeItem('draft:clipboard');
      }
    }
  }, [fromClipboard, isNew, editor]);

  // from file
  useEffect(() => {
    if (!editor) return;

    if (isNew && fromFile) {
      const raw = sessionStorage.getItem('draft:fileInfo');
      const draft = raw ? JSON.parse(raw) : null;
      if (!draft) return;

      if (draft) {
        setTitle(draft.title);
        setContent(draft.content);
        editor.commands.setContent(`<p>${draft.content}</p>`);

        // remove draft after getting it
        sessionStorage.removeItem('draft:fileInfo');
      }
    }
  }, [fromFile, isNew, editor]);

  // initial fill
  useEffect(() => {
    if (!editor) return;

    if (isEdit) {
      setTitle(note?.title);
      setContent(note?.content);
      setInitial({ title: note?.title, content: note?.content });
      editor.commands.setContent(`<p>${note?.content}</p>`);
    }
  }, [isEdit, note, editor]);

  // useEffect(() => {
  //   // add a delay for initial any content on load...
  //   setTimeout(() => {
  //     if (contentAreaRef.current) {
  //       contentAreaRef.current.focus();
  //       setCharCounts(contentAreaRef.current.value.length); // initial chars value
  //       setWordCounts(
  //         contentAreaRef.current.value.trim() === ''
  //           ? 0
  //           : contentAreaRef.current.value.trim().split(/\s+/).length
  //       );
  //     }
  //   }, 100);
  // }, []);

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
    if (isEdit)
      handleUpdateNote(); // update if edit mode
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 1 }}
        className={cn('min-h-screen relative', className)}
      >
        <Portal>
          <aside
            style={{ width: TOOLTIP_WIDTH }}
            className="fixed inset-y-0 left-0 hidden md:block md:max-w-[54px] lg:max-w-54 lg:transition duration-600"
          >
            <nav className="py-1 bg-sidebar size-full">
              <div className="flex flex-wrap items-center justify-between gap-3 px-2">
                <span className="hidden lg:inline-flex">
                  <Button onClick={toggleOpenPanel} variant="ghost" size="icon">
                    {isOpenPanel ? <PanelLeftClose /> : <PanelRightClose />}
                  </Button>
                </span>

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
              </div>
              {/* divide */}
              {isOpenPanel ? null : (
                <div className="mx-2 my-4 border-t border-sidebar-border"></div>
              )}
            </nav>
          </aside>
        </Portal>
        {/* editor */}
        <div
          style={!isMobile ? MAIN_TRANSFORM : { width: '100vw' }}
          className="flex flex-col lg:transition-transform lg:duration-600"
        >
          <header className="sticky top-0 z-10 left-0 bg-background">
            <div className="flex items-center justify-between h-12 max-w-6xl px-2 pr-2 mx-auto md:px-4">
              <Button
                onClick={handleCancel}
                variant="ghost"
                className="bg-accent/20 md:hidden"
                size="icon-xl"
              >
                <ChevronLeft />
              </Button>
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
          <main className="flex-1 mt-2 md:mt-0">
            <div className="max-w-6xl px-4 pb-20 mx-auto space-y-3 font-inter lg:pb-32">
              <textarea
                rows={1}
                className={cn(
                  writingOn.title ? 'caret-current' : 'caret-primary',
                  'w-full mt-2 text-3xl font-bold leading-10 tracking-tight transition-all resize-none selection:bg-primary field-sizing-content min-h-auto scrollbar-none placeholder:text-2xl focus:outline-0'
                )}
                placeholder="Title"
                value={title}
                onInput={(e) => {
                  setTitle(e.currentTarget.value);
                  autoGrow(e);
                  // set to true the title writing state
                  setWritingOn({ title: true });
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.value.trim())
                    e.currentTarget.style.height = 'auto';
                  setTitle(title?.trim());
                  setWritingOn({ title: false });
                }}
              ></textarea>
              <div className="left-0 pb-1 space-x-2 text-sm lg:sticky z-9 bg-background top-12 text-muted-foreground">
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
              <EditorContent
                className="z-1 leading-8 selection:bg-primary/30 placeholder:text-muted-foreground"
                onFocus={(e) => console.log(e.currentTarget.classList)}
                editor={editor}
              />
              {/* <textarea
                rows={6}
                ref={contentAreaRef}
                value={content}
                onBlur={() => setWritingOn({ content: false })}
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
                  setWritingOn({ content: true });
                }}
                name=""
                id=""
                className={cn(
                  writingOn.content ? 'caret-current' : 'caret-primary',
                  'w-full font-normal leading-8 transition-all resize-none field-sizing-content selection:text-muted-foreground selection:bg-muted min-h-12 placeholder:text-base focus:outline-0'
                )}
                placeholder="Start writing..."
              ></textarea> */}
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
