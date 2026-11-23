import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/cn';

export function GlassCard({ className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={cn('rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-xl', className)}
      {...props}
    />
  );
}
