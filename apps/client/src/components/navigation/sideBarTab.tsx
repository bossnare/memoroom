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
        <button className="flex items-center justify-start w-full gap-3 px-2 rounded-sm text-destructive lg:text-destructive/80 lg:hover:text-destructive h-9 lg:hover:bg-muted active:bg-muted active:text-destructive/70 lg:active:text-destructive/70">
          {children}
        </button>
      ) : (
        <button className="flex items-center justify-start w-full gap-3 px-2 rounded-sm lg:text-sidebar-foreground/80 lg:hover:text-sidebar-foreground h-9 lg:hover:bg-muted active:bg-muted active:text-sidebar-foreground/70 lg:active:text-sidebar-foreground/70">
          {children}
        </button>
      )}
    </>
  );
};
