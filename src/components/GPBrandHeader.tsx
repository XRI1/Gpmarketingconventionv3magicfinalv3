import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface GPBrandHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function GPBrandHeader({ title = "Magic Is You", subtitle, showLogo = true }: GPBrandHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative inline-block"
      >
        <motion.div
           animate={{ rotate: [0, 360] }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="absolute -top-6 -right-6 text-yellow-400 opacity-70"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-blue-200/80 text-sm md:text-base font-light tracking-wider uppercase">{subtitle}</p>
        )}
      </motion.div>
    </motion.div>
  );
}
