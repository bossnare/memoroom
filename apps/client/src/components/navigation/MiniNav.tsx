import { motion } from 'motion/react';
import { miniNavLabel } from './navigation.label';

export const MiniNav = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      // transition={{type}}
      className="absolute w-3/4 p-2 rounded-lg shadow-xl sm:w-3/4 bg-background top-16 right-4 md:hidden"
    >
      <ul className="flex flex-col gap-1">
        {miniNavLabel.map((m) => (
          <li key={m.id}>
            <button className="flex items-center w-full h-9.5 gap-2 px-2 rounded-md text-foreground/90 active:bg-muted active:opacity-70">
              <m.icon className="size-5" /> {m.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
