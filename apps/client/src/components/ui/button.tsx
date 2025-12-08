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
      className={`flex items-center font-medium ${variants} px-6 gap-2 bg-purple-800 rounded-md md:hover:opacity-80 active:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};
