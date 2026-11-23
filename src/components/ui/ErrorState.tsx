import { motion } from 'motion/react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      role="alert"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-rose-300/30 bg-rose-500/15 p-6 text-center"
    >
      <p className="text-lg font-semibold">Something went wrong</p>
      <p className="mt-1 text-sm text-white/70">{message}</p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRetry}
          className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
        >
          Try again
        </motion.button>
      )}
    </motion.div>
  );
}
