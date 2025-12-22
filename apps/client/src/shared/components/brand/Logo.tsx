import logo from '@/assets/icon_32x32_mono.svg';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex gap-2 cursor-pointer active:opacity-80 md:hover:opacity-80 ${className}`}
    >
      <img
        src={logo}
        fetchPriority="high"
        loading="eager"
        alt="logo"
        className="size-6 shrink-0!"
      />
      <span className="text-[21px] flex font-extrabold leading-none tracking-tighter select-none md:text-[23px]">
        memoroom
      </span>
    </div>
  );
};
