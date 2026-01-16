export const landingMenuVariants = {
  hidden: { opacity: 0, y: '-100vh' },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-100vh' },
};

export const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
};

export const overlayVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export const kebabMenuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.9, x: 20 },
  visible: { opacity: 1, y: 0, scale: 1, x: 0 },
  exit: { opacity: 0, y: -10, scale: 0.9, x: 20 },
};

export const fabButtonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};
