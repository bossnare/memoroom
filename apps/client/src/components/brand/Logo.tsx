export const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex gap-2 cursor-pointer active:opacity-80 md:hover:opacity-80 ${className}`}
    >
      <img
        src="./icon_32x32_mono.svg"
        alt="Memo"
        className="size-6 md:size-8"
      />
      <span className="text-xl font-black leading-none tracking-tight md:text-2xl">
        memosphere
      </span>
    </div>
  );
};
