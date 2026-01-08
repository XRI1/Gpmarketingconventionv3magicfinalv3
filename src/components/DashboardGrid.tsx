import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { LucideIcon } from 'lucide-react';

export interface DashboardMenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
  badge?: string;
}

interface DashboardGridProps {
  items: DashboardMenuItem[];
  onItemClick: (id: string) => void;
}

export function DashboardGrid({ items, onItemClick }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.05 }}
          className="h-full"
        >
          <GlassCard 
            hover 
            className="cursor-pointer text-center h-full group relative overflow-hidden"
            onClick={() => onItemClick(item.id)}
          >
            {/* Badge */}
            {item.badge && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold z-20 shadow-lg shadow-red-500/40 animate-pulse">
                {item.badge}
              </div>
            )}

            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            <motion.div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 relative z-10`}
              whileHover={{ 
                rotate: 5, 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(255,255,255,0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon className="w-7 h-7 text-white" />
            </motion.div>
            
            <div className="relative z-10">
              <p className="text-white text-sm font-medium tracking-wide group-hover:text-blue-100 transition-colors">
                {item.label}
              </p>
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-2"
                initial={{ width: 0, opacity: 0 }}
                whileHover={{ width: "50%", opacity: 1 }}
              />
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
