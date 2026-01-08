import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  onHome?: () => void;
  rightContent?: React.ReactNode;
}

export function PageHeader({ title, onBack, onHome, rightContent }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 z-50 mb-6"
    >
      <GlassCard className="py-4 px-4 backdrop-blur-xl bg-slate-900/80">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            {onHome && (
              <button
                onClick={onHome}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
              >
                <Home className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-lg font-bold text-white truncate">{title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {rightContent}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
