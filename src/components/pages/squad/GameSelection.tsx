import { motion } from 'motion/react';
import { GlassCard } from '../../GlassCard';
import { Trophy, Activity, Zap, Lock } from 'lucide-react';

interface GameSelectionProps {
  onSelectGame: (gameId: string) => void;
  onBack: () => void;
}

export function GameSelection({ onSelectGame, onBack }: GameSelectionProps) {
  const games = [
    {
      id: 'penalty',
      title: 'Penalty Kick Challenge',
      description: 'Test your aim and precision in this virtual penalty shootout.',
      icon: Trophy,
      color: 'from-blue-500 to-cyan-500',
      locked: false,
    },
    {
      id: 'reaction',
      title: 'Reaction Speed',
      description: 'How fast are your reflexes? Tap the targets before they disappear!',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      locked: true,
    },
    {
      id: 'quiz',
      title: 'GP Knowledge Blitz',
      description: 'Answer rapid-fire questions about Grameenphone history.',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      locked: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Challenge</h2>
        <p className="text-blue-200">Select a game to earn points for your team.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="h-full flex flex-col p-0 overflow-hidden relative group">
              {/* Image/Icon Area */}
              <div className={`h-40 bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <game.icon className="w-16 h-16 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
                
                {game.locked && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                    <Lock className="w-10 h-10 text-white/50" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2">{game.title}</h3>
                <p className="text-blue-200/70 text-sm mb-6 flex-1">{game.description}</p>
                
                <button
                  onClick={() => !game.locked && onSelectGame(game.id)}
                  disabled={game.locked}
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    game.locked
                      ? 'bg-white/5 text-white/30 cursor-not-allowed'
                      : 'bg-white text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  {game.locked ? 'Coming Soon' : 'Play Now'}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
