import api from '@/app/lib/api';
import { Button } from '@/components/ui/button';
import { handleWait } from '@/shared/utils/handle-wait';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NoteEditor = () => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const [chars, setChars] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const body = {
    title,
    content,
  };

  const autoGrow = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto'; // initial reset height value
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const navigate = useNavigate();

  const save = async () => {
    try {
      const res = await api.post('/notes/create', body);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (areaRef.current) areaRef.current.focus();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex flex-col min-h-screen"
      >
        <header className="sticky top-0 left-0 bg-background">
          <div className="flex items-center justify-between h-12 max-w-6xl px-4 mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="p-0 font-semibold text-primary active:opacity-80"
            >
              Cancel
            </button>
            <span className="text-muted-foreground">New notes</span>
            <Button
              onClick={() => {
                save();
                handleWait(() => navigate(-1), 200);
              }}
              className="font-bold select-none"
              variant="ghost"
            >
              Save
            </Button>
          </div>
        </header>

        {/*  */}
        <main className="flex-1">
          <div className="max-w-6xl px-4 pb-20 mx-auto space-y-3 lg:pb-32">
            <textarea
              rows={1}
              className="w-full py-1 text-3xl font-bold leading-10 tracking-tight resize-none scrollbar-none placeholder:text-2xl focus:outline-0"
              placeholder="Title"
              value={title}
              onInput={(e) => {
                setTitle(e.currentTarget.value);
                autoGrow(e);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.value.trim())
                  e.currentTarget.style.height = 'auto';
                setTitle(title.trim());
              }}
            ></textarea>
            <div className="sticky left-0 pb-1 space-x-2 text-sm bg-background top-12 text-muted-foreground">
              <span>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </span>
              <span className="w-0.5 border-l dark:border-muted"></span>{' '}
              <span>
                {chars} {chars > 1 ? 'characters' : 'character'}
              </span>
            </div>
            <textarea
              rows={6}
              ref={areaRef}
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
                  behavior: 'smooth',
                });
              }}
              name=""
              id=""
              className="w-full text-lg font-normal resize-none scroll-mb-24 placeholder:text-base focus:outline-0"
              placeholder="Start typing freely..."
            ></textarea>
          </div>
        </main>

        <footer className="sticky bottom-0 bg-sidebar/50">
          <div className="max-w-6xl px-4 mx-auto h-14 bg-muted"></div>
        </footer>
      </motion.div>
    </>
  );
};
