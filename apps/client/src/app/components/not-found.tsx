export const NotFound = () => {
  const path = location.pathname;

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <img
        src="/not_found.png"
        alt="not_found"
        className="size-40 invert dark:invert-0"
      />
      <div className="text-center">
        <span className="font-bold">{path}</span> is not found !
      </div>
    </div>
  );
};
