import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { FileText, FolderOpen } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = React.HTMLAttributes<HTMLDivElement> & { onContinue?: () => void };

export const FileDropZone = ({ className, onContinue }: Props) => {
  const [fileInfo, setFileInfo] = useState<Record<string, string> | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [isDrag, setIsDrag] = useState(false);

  const handleFiles = async (file: File) => {
    // const ext = file.name.split('.').pop()?.toLocaleLowerCase();
    if (!file.type.startsWith('text') && file.type !== 'application/json') {
      toast.error('Not a text file');
      return;
    }

    // set file info - for display
    setFileInfo({
      name: file.name,
      type: file.type,
    });

    const text = await file.text();
    // set a draft
    sessionStorage.setItem(
      'draft:fileInfo',
      JSON.stringify({
        title: file.name.split('.')[0],
        content: text,
      })
    );
  };

  const handleCancel = () => {
    setFileInfo(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <div className={cn(className)}>
      {fileInfo ? (
        <div className="flex flex-col items-center justify-center h-full gap-3 p-2 cursor-pointer rounded-3xl bg-input/70">
          <FileText />
          <span className="text-sm text-center truncate select-none text-muted-foreground text-balance line-clamp-4">
            {fileInfo.name}
          </span>
          <span className="flex flex-col items-center justify-center gap-2">
            <Button className="rounded-full" onClick={onContinue}>
              Continue
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="rounded-full"
            >
              Cancel
            </Button>
          </span>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDrag(true);
          }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDrag(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFiles(file);
          }}
          className={cn(
            isDrag ? 'border-2 border-primary' : 'border-muted-foreground',
            'flex cursor-pointer flex-col hover:bg-input/40 active:opacity-60 items-center justify-center gap-3 p-2 rounded-3xl h-full bg-input/60'
          )}
        >
          <FolderOpen className="size-8 md:size-5" />
          <span className="px-10 text-sm text-center select-none text-muted-foreground text-balance">
            Drag or click your text file to create a new note.
          </span>

          <input
            ref={inputFileRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFiles(file);
              }
            }}
            type="file"
            hidden
            // accept=".json, .txt"
          />
        </label>
      )}
    </div>
  );
};
