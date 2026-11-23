import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useEffect } from 'react';

/** Counts smoothly from the previous value to the new one. */
export function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(mv, value, { duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [mv, value, reduce]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
