import { Star, ChevronRight, Plus, Earth } from 'lucide-react';
import { Button } from './components/ui/button';
import { Logo } from './components/brand/Logo';
import { TopBar } from './components/navigation/TopBar';

// type Note = {
//   id: string;
//   title: string;
//   content: string;
// };

function App() {
  // const [notes, setNotes] = useState<Note[]>([]);

  return (
    <div className="relative max-h-screen h-dvh">
      {/* sidebar */}
      <aside className="fixed inset-y-0 hidden w-64 px-2 space-y-1 overflow-y-auto border-r md:block border-zinc-900">
        <Logo className="sticky top-0 hidden w-full py-3 bg-black/80 backdrop-blur-sm md:flex" />
        <div className="flex items-center gap-2 mt-2 font-bold text-zinc-400">
          <h3>Collaborateurs</h3> <Star className="fill-current size-4" />{' '}
          <button className="p-2 ml-auto rounded-full active:bg-zinc-900">
            <ChevronRight />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-1/3 bg-zinc-950/80 rounded-t-xl">
          <span className="text-sm font-semibold">No collab found yet.</span>
          <Button className="text-black bg-white" size="medium">
            <Plus /> Add one
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-4 font-bold text-zinc-400">
          <h3>Meilleurs notes</h3> <Star className="fill-current size-4" />{' '}
          <button className="p-2 ml-auto rounded-full active:bg-zinc-900">
            <ChevronRight />
          </button>
        </div>
        <div className="h-1/3 bg-zinc-950/80 rounded-xl"></div>
      </aside>

      <div className="relative h-full md:ml-64 md:transition-all">
        <TopBar />

        <main className="h-[calc(100dvh-3.5rem)] bg-linear-to-b from-zinc-950/50 to-zinc-950/20 overflow-y-auto px-2 grid grid-cols-4 mt-[3.4px] md:mt-1 rounded-t-xl border-t border-zinc-900 items-start gap-2">
          <div className="flex justify-center py-6 col-span-full">
            <div className="flex flex-col items-center justify-center w-full gap-4 p-10 rounded-lg md:w-2/3 bg-zinc-950">
              <h4 className="text-lg font-black">Browse your notes</h4>
              <p className="text-sm text-center text-zinc-600">
                If you click this browse button, your app system down instead,
                and keep click, calm. As a JS dev, click this button please.
              </p>
              <Button>
                <Earth /> Browse notes
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* soft fade */}
      <div className="fixed inset-x-0 bottom-0 z-10 h-16 bg-linear-to-b from-transparent to-zinc-950/80 backdrop-blur-sm"></div>
    </div>
  );
}

export default App;
