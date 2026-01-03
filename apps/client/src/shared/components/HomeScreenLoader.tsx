import icon from '@/assets/icon.svg';

export function HomeScreenLoader({ raison }: { raison?: boolean }) {
  if (!raison) return null;

  return (
    <div className="inset-0 flex flex-col gap-2 lg:gap-3 items-center justify-center px-4 min-h-dvh z-100">
      <div className="relative flex items-center justify-center p-1 rounded-full bg-primary/10 md:size-18 size-20">
        <div id="home-screen" className="size-full">
          <img src={icon} alt="logo_icon" className="size-full" />
        </div>
        <span className="absolute dark:brightness-140 border-4 border-transparent rounded-full border-t-primary animate-spin size-full"></span>
      </div>
      <span className="font-medium tracking-tight opacity-70 text-sm">
        Preparing your space...
      </span>
    </div>
  );
}
