export function HomeScreenLoader({ raison }: { raison?: boolean }) {
  if (!raison) return null;

  return (
    <div className="inset-0 flex items-center justify-center px-4 min-h-dvh z-100">
      <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
        <span className="rounded-full size-8 md:size-6 border-5 md:border-3 border-foreground border-t-muted animate-spin"></span>
        <span className="text-lg font-semibold tracking-tighter">
          Authentication...
        </span>
      </div>
    </div>
  );
}
