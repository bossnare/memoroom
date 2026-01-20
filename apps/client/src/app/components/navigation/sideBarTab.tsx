type Props = {
  children: React.ReactNode;
};

export const SideBarTabWrapper = ({
  isDanger = false,
  children,
}: Props & { isDanger?: boolean }) => {
  return (
    <>
      {isDanger ? (
        <button className="flex items-center justify-start w-full gap-6 px-6 rounded-sm text-destructive lg:text-destructive/80 lg:hover:text-destructive h-11 lg:hover:bg-muted active:bg-muted active:text-destructive/70 lg:active:text-destructive/60">
          {children}
        </button>
      ) : (
        <button className="flex items-center justify-start w-full gap-5 px-6 rounded-sm lg:text-sidebar-foreground/80 lg:hover:text-sidebar-foreground h-11 lg:hover:bg-muted active:bg-muted active:text-sidebar-foreground/70 lg:active:text-sidebar-foreground/60">
          {children}
        </button>
      )}
    </>
  );
};
