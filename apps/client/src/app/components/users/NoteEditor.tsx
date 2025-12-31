import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NoteEditor = () => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const [chars, setChars] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (areaRef.current) areaRef.current.focus();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="px-2 lg:px-4 bg-background h-dvh"
      >
        <nav className="flex justify-between items-center w-full h-12 py-2">
          <button
            onClick={() => navigate(-1)}
            className="text-primary p-0 font-semibold active:opacity-80"
          >
            Cancel
          </button>
          <span className="text-muted-foreground">New notes</span>
          <Button className="font-bold select-none" variant="ghost">
            Save
          </Button>
        </nav>

        <main className="flex flex-col min-h-[calc(100%-6.5rem)] py-2 space-y-3">
          <textarea
            rows={1}
            className="text-3xl py-1 scrollbar-none tracking-tight leading-10 font-bold placeholder:text-2xl w-full resize-none focus:outline-0"
            placeholder="Title"
            value={title}
            onInput={(e) => {
              setTitle(e.currentTarget.value);
              e.currentTarget.style.height = 'auto'; // initial reset height value
              e.currentTarget.style.height =
                e.currentTarget.scrollHeight + 'px';
            }}
            onBlur={() => setTitle(title.trim())}
          ></textarea>
          <div className="text-sm space-x-2 text-muted-foreground">
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
            <span className="w-0.5 border-l border-muted"></span>{' '}
            <span>
              {chars} {chars > 1 ? 'characters' : 'character'}
            </span>
          </div>
          <textarea
            ref={areaRef}
            value={content}
            onChange={(e) => {
              setChars(e.target.value.length);
              setContent(e.currentTarget.value);
            }}
            name=""
            id=""
            className="w-full h-full scrollbar-none font-normal text-lg placeholder:text-base resize-none focus:outline-0"
            placeholder="Start typing freely..."
          ></textarea>
        </main>

        <nav className="absolute bottom-0 h-14 left-0 w-full py-2 bg-sidebar/50"></nav>
      </motion.div>
    </>
  );
};
