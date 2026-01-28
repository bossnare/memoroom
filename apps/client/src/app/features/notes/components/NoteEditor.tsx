import {
  MAX_TOOLBAR_WIDTH,
  MIN_TOOLBAR_WIDTH,
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
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import {
  EditorContent,
  useEditor,
  useEditorState,
  type JSONContent,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AxiosError } from 'axios';
import { Check, ChevronLeft, Ellipsis, Redo, Undo } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
import { ConfirmDrawer } from '../../ui/ConfirmDrawer';
import { EditorToolbarButton } from './EditorToolbarButton';
import { EditorToolbar } from './EditorToolbar';
import { useIsDesktop } from '@/shared/hooks/use-desktop';

type NoteEditorProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: 'new' | 'edit' | 'view';
  note?: NoteInterface;
};

const extensions = [StarterKit];

export const NoteEditor = ({
  className,
  mode = 'edit',
  note,
}: NoteEditorProps) => {
  // init tiptap editor
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: 'Start writing ...',
      }),
      CharacterCount.configure({
        limit: 5000,
      }),
    ],
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        wordCount: ctx.editor.storage.characterCount.words(),
        charCount: ctx.editor.storage.characterCount.characters(),
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isBold: ctx.editor.isActive('bold') ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        jsonContent: ctx.editor.getJSON(),
        textContent: ctx.editor.getText(),
        htmlContent: ctx.editor.getHTML(),
      };
    },
  });

  // const contentAreaRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState<string | undefined>('');
  // const [tags, setTags] = useState<Set<string>>(new Set());
  const [tag, setTag] = useState('');
  const [initial, setInitial] = useState<{
    title: string | undefined;
    tag?: string;
    jsonContent: JSONContent;
  } | null>({
    title: '',
    tag: '',
    jsonContent: editorState.jsonContent,
  });
  const [writingOn, setWritingOn] = useState<Record<string, boolean>>({
    title: false,
    tag: false,
  });
  const [focusedOn, setFocusedOn] = useState<Record<string, boolean>>({
    title: false,
    tag: false,
  });
  const [isSaving, setIsSaving] = useState(false);

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
  const isDesktop = useIsDesktop();
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

  const editorModeState = editorMode[mode];
  const saveButtonTitle = saveMode[mode];

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
        editor.commands.setContent(`${draft}`);
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
        editor.commands.setContent(`${draft.content}`);

        // remove draft after getting it
        sessionStorage.removeItem('draft:fileInfo');
      }
    }
  }, [fromFile, isNew, editor]);

  // initial fill
  useEffect(() => {
    if (!editor || !note || !isEdit) return;

    editor.commands.setContent(note.jsonContent);

    setTitle(note?.title);
    setInitial({ title: note.title, jsonContent: note.jsonContent });
  }, [isEdit, note, editor]);

  // transform
  const {
    value: isOpenPanel,
    toggle: toggleOpenPanel,
    setFalse: setIsOpenPanelFalse,
    setTrue: setIsOpenPanel,
  } = useToggle(true);

  const { pannelWidth: TOOLBAR_WIDTH, mainTransform: MAIN_TRANSFORM } =
    usePannel(isOpenPanel, MIN_TOOLBAR_WIDTH, MAX_TOOLBAR_WIDTH);

  // auto-collapse
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isDesktop ? setIsOpenPanel() : setIsOpenPanelFalse();
  }, [isDesktop, setIsOpenPanel, setIsOpenPanelFalse]);

  const isDirty = useMemo(() => {
    if (!initial) return false;

    return (
      title !== initial.title ||
      JSON.stringify(editorState.jsonContent) !==
        JSON.stringify(initial.jsonContent) ||
      tag !== initial.tag
    );
  }, [editorState.jsonContent, initial, tag, title]);

  const autoGrow = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto'; // initial reset height value
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const bodyPayload = {
    title: title as string,
    content: editorState.textContent,
    jsonContent: editorState.jsonContent,
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

  const canSave =
    title?.trim() || tag?.trim() || editorState.textContent.trim();

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

  // fix later - for title textarea
  const titleTextareaRef = useRef(null);
  const isInView = useInView(titleTextareaRef, { once: false, amount: 0.5 });

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
            style={{ width: TOOLBAR_WIDTH }}
            className="fixed inset-y-0 left-0 hidden md:block md:max-w-[54px] lg:max-w-54 lg:transition duration-600"
          >
            <EditorToolbar
              isOpen={isOpenPanel}
              toggleOpen={toggleOpenPanel}
              onCancelEditor={handleCancel}
              className="py-1 bg-sidebar size-full"
            >
              {/* editor toolbar */}
              <div
                className={cn(
                  isOpenPanel ? 'py-6' : 'py-0',
                  'flex flex-col px-1 gap-2 [&_button]:overflow-hidden [&_button]:justify-start [&_button]:gap-5 [&_button]:px-3'
                )}
              >
                <EditorToolbarButton editor={editor} />
              </div>
            </EditorToolbar>
          </aside>
        </Portal>
        {/* editor */}
        <div
          style={!isMobile ? MAIN_TRANSFORM : { width: '100vw' }}
          className="flex flex-col lg:transition-transform lg:duration-600"
        >
          <header className="sticky top-0 left-0 z-10 bg-background">
            <div className="flex items-center justify-between h-12 max-w-6xl px-2 pr-2 mx-auto md:px-4">
              <Button
                onClick={handleCancel}
                variant="ghost"
                className="md:hidden"
                size="icon-xl"
              >
                <ChevronLeft />
              </Button>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>{editorModeState} notes</span>{' '}
                <Button size="icon-lg" variant="ghost" className="md:hidden">
                  <Ellipsis />
                </Button>
              </div>

              <div className="space-x-2">
                <Button
                  size="icon-lg"
                  variant="ghost"
                  className="hidden md:inline-flex"
                >
                  <Ellipsis />
                </Button>
                {focusedOn.title || focusedOn.tag ? null : (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="space-x-2"
                  >
                    <Button
                      onClick={() => editor?.chain().focus().undo().run()}
                      disabled={!editorState.canUndo}
                      size="icon-lg"
                      variant="ghost"
                    >
                      <Undo />
                    </Button>
                    <Button
                      onClick={() => editor?.chain().focus().redo().run()}
                      disabled={!editorState.canRedo}
                      size="icon-lg"
                      variant="ghost"
                    >
                      <Redo />
                    </Button>
                  </motion.span>
                )}
              </div>

              <Button
                title={saveButtonTitle}
                disabled={!canSave || !isDirty}
                onClick={() => {
                  handleSave();
                  handleWait(() => navigate('/app'), 200);
                }}
                className="font-bold rounded-full select-none"
                variant="ghost"
                size="icon-lg"
              >
                {isSaving ? null : <Check />}
              </Button>
            </div>
          </header>

          {/* edit content */}
          <main className="flex-1 mt-2 md:mt-0">
            <div className="max-w-6xl px-4 pb-20 mx-auto space-y-3 font-inter lg:pb-32">
              <textarea
                ref={titleTextareaRef}
                rows={1}
                name="title"
                className={cn(
                  writingOn.title ? 'caret-current' : 'caret-primary',
                  isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-20 translate-y-2',
                  'w-full mt-2 text-3xl font-bold leading-10 tracking-tight transition-all duration-350 resize-none selection:bg-primary/50 field-sizing-content min-h-auto scrollbar-none placeholder:text-2xl focus:outline-0'
                )}
                placeholder="Title"
                value={title}
                onFocus={() => setFocusedOn({ title: true })}
                onInput={(e) => {
                  setTitle(e.currentTarget.value);
                  autoGrow(e);
                  // set to true the title writing state
                  setWritingOn({ title: true });
                }}
                onBlur={(e) => {
                  e.currentTarget.style.height = 'auto';
                  setTitle(title?.trim());
                  setWritingOn({ title: false });
                  setFocusedOn({ title: false });
                }}
              ></textarea>
              <textarea
                rows={1}
                name="tag"
                className={cn(
                  writingOn.tag
                    ? 'caret-current text-foreground'
                    : 'caret-primary text-chart-2',
                  'w-full placeholder:text-muted-foreground text-xl font-medium leading-relaxed tracking-tight transition-all resize-none selection:bg-primary/50 field-sizing-content min-h-auto scrollbar-none placeholder:text-xl focus:outline-0'
                )}
                placeholder="#tags"
                value={tag}
                onFocus={() => setFocusedOn({ tag: true })}
                onInput={(e) => {
                  setTag(e.currentTarget.value);
                  autoGrow(e);
                  // set to true the title writing state
                  setWritingOn({ tag: true });
                }}
                onBlur={(e) => {
                  e.currentTarget.style.height = 'auto';
                  setTag(tag?.trim());
                  setWritingOn({ tag: false });
                  setFocusedOn({ tag: false });
                }}
              ></textarea>

              <div className="left-0 pb-1 space-x-2 text-sm lg:sticky z-9 bg-background top-12 text-muted-foreground">
                <span>
                  {isEdit
                    ? dateFormatLong(note?.updatedAt ?? new Date())
                    : dateFormatLong(new Date())}
                </span>
                <span className="w-0.5 border-l dark:border-muted"></span>
                <span>{editorState.charCount} characters</span>
                <span className="w-0.5 border-l dark:border-muted"></span>
                <span> {editorState.wordCount} words </span>
              </div>
              <EditorContent
                className="max-w-full prose z-1 selection:bg-primary/30 prose-neutral dark:prose-invert"
                editor={editor}
              />
            </div>
          </main>
        </div>

        {/* fixed footer for mobile only */}
        <Portal>
          <footer className="fixed inset-x-0 bottom-0 border-t md:hidden bg-background border-sidebar-border/50">
            <div className="flex items-center max-w-6xl gap-4 px-4 mx-auto h-14 bg-sidebar/50">
              <EditorToolbarButton editor={editor} />
            </div>
          </footer>
        </Portal>
      </motion.div>
    </>
  );
};
