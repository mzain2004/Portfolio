export const transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};
