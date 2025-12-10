export const Button = ({
  children,
  size = 'large',
  className,
}: {
  children: React.ReactNode;
  size?: 'medium' | 'large';
  className?: string;
}) => {
  const variants = size === 'large' ? 'h-10 px-6' : 'h-9 px-5';

  return (
    <button
      className={`flex transition-opacity will-change-opacity duration-300 ease-in-out items-center font-medium ${variants} px-6 gap-2 bg-blue-800 rounded-md md:hover:opacity-80 active:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};

export const ButtonIcon = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`transition-opacity will-change-opacity duration-300 ease-in-out p-2 rounded-full md:hover:opacity-80 active:opacity-80 active:bg-zinc-900 md:hover:bg-zinc-900 ${className}`}
    >
      {children}
    </button>
  );
};
