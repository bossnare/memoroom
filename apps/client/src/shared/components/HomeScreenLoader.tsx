import icon from '@/assets/icon.svg';

export function HomeScreenLoader({ raison }: { raison?: boolean }) {
  if (!raison) return null;

  return (
    <div className="inset-0 flex flex-col gap-2 items-center dark:bg-primary/5 justify-center px-4 h-dvh z-100">
      <div id="home-screen-icon" className="size-18">
        <img src={icon} alt="logo_icon" className="size-full" />
      </div>
      <span className="font-medium tracking-tight opacity-70 text-sm">
        Preparing your space...
      </span>
    </div>
  );
}
