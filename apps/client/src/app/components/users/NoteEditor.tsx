import api from '@/app/lib/api';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { handleWait } from '@/shared/utils/handle-wait';
import { Portal } from '@radix-ui/react-portal';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MAX_TOOLTIP_WIDTH,
  MIN_TOOLTIP_WIDTH,
} from '@/app/constants/layout.constant';
import { useToggle } from '@/shared/hooks/use-toggle';
import { usePannel } from '@/app/hooks/use-pannel';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import type { NoteInterface } from '@/app/types/note.interface';
import { dateFormatLong } from '@/app/lib/date-format';

type NoteEditorProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: 'new' | 'edit' | 'view';
  note?: NoteInterface;
};

export const NoteEditor = ({
  className,
  mode = 'edit',
  note,
}: NoteEditorProps) => {
  const isMobile = useIsMobile();

  const isEdit = mode === 'edit';
  const editorMode = {
    new: 'New',
    edit: 'Edit',
    view: 'View',
  };
  const editorState = editorMode[mode];

  // transform
  const { value: isOpenToolTip, toggle: toggleOpenTooltip } = useToggle(true);

  const { pannelWidth: TOOLTIP_WIDTH, mainTransform: MAIN_TRANSFORM } =
    usePannel(isOpenToolTip, MIN_TOOLTIP_WIDTH, MAX_TOOLTIP_WIDTH);

  const contentAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [chars, setChars] = useState(0);
  const [title, setTitle] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');

  useEffect(() => {
    if (isEdit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(note?.title);
      setContent(note?.content);
    }
  }, [isEdit, note]);

  const body = {
    title,
    content,
  };

  const autoGrow = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto'; // initial reset height value
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const autoGrowOnFocus = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const navigate = useNavigate();

  const handleCreateNote = async () => {
    try {
      const res = await api.post('/notes/create', body);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateNote = async () => {
    try {
      const res = await api.put(`/notes/update/${note?.id}`, body);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = () => {
    if (isEdit) handleUpdateNote(); // update if edit mode
    else handleCreateNote();
  };

  useEffect(() => {
    if (contentAreaRef.current) contentAreaRef.current.focus();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={cn('min-h-screen relative', className)}
      >
        <Portal>
          <aside
            style={{ width: TOOLTIP_WIDTH }}
            onClick={toggleOpenTooltip}
            className="fixed inset-y-0 left-0 hidden md:block w-54"
          >
            <div className="bg-sidebar size-full"></div>
          </aside>
        </Portal>
        {/* editor */}
        <div style={!isMobile ? MAIN_TRANSFORM : {}} className="flex flex-col">
          <header className="sticky top-0 left-0 bg-background">
            <div className="flex items-center justify-between h-12 max-w-6xl px-4 mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="p-0 font-semibold text-primary active:opacity-80"
              >
                Cancel
              </button>
              <span className="text-muted-foreground">{editorState} notes</span>
              <Button
                disabled={!content?.trim()}
                onClick={() => {
                  handleSave();
                  handleWait(() => navigate(-1), 200);
                }}
                className="font-bold select-none"
                variant="ghost"
              >
                Save
              </Button>
            </div>
          </header>

          {/* edit content */}
          <main className="flex-1">
            <div className="max-w-6xl px-4 pb-20 mx-auto space-y-3 lg:pb-32">
              <textarea
                rows={1}
                className="w-full mt-2 text-3xl font-bold leading-10 tracking-tight resize-none scrollbar-none placeholder:text-2xl focus:outline-0"
                placeholder="Title"
                value={title}
                onFocus={autoGrowOnFocus}
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
                  {chars} {chars > 1 ? 'characters' : 'character'}
                </span>
              </div>
              <textarea
                rows={6}
                ref={contentAreaRef}
                value={content}
                onChange={(e) => {
                  setChars(e.target.value.length);
                  setContent(e.currentTarget.value);
                }}
                onInput={(e) => {
                  autoGrow(e);
                  // scroll to carret
                  e.currentTarget.scrollIntoView({
                    block: 'end',
                    behavior: 'auto',
                  });
                }}
                name=""
                id=""
                className="w-full font-normal leading-8 resize-none scroll-mb-24 placeholder:text-base focus:outline-0"
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
