import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  neonBorder?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', neonBorder = false, hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative backdrop-blur-xl bg-white/10 rounded-2xl p-6
        border border-white/20
        ${neonBorder ? 'shadow-[0_0_20px_rgba(0,168,225,0.4)]' : 'shadow-xl shadow-black/10'}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      onClick={onClick}
    >
      {neonBorder && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00A8E1]/30 to-[#0092E4]/30 blur-sm -z-10" />
      )}
      {children}
    </motion.div>
  );
}