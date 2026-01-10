import { Spinner } from '@/shared/components/Spinner';

export const AppLoader = ({ open }: { open?: boolean }) => {
  return (
    <>
      {open && (
        <div className="inset-0 fixed z-9999 flex bg-background/90 items-center justify-center px-4 min-h-dvh">
          <Spinner variant="primary" size="lg" />
        </div>
      )}
    </>
  );
};
