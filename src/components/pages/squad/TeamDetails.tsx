import { motion } from 'motion/react';
import { GlassCard } from '../../GlassCard';
import { Users, Trophy, User, Gamepad2, CheckCircle2, Lock } from 'lucide-react';
import teamLogo from 'figma:asset/e8a6b560af153b39a8f4131508442328dd2c56df.png';

interface TeamDetailsProps {
  onPlay: () => void;
  onLeaderboard: () => void;
  onChat: () => void;
  onLeave: () => void;
}

export function TeamDetails({ onPlay, onLeaderboard, onChat, onLeave }: TeamDetailsProps) {
  const members = [
    { id: 2, name: 'Karim S.', avatar: null },
    { id: 1, name: 'Rahim A.', avatar: null },
    { id: 3, name: 'Tania M.', avatar: null },
    { id: 4, name: 'You', avatar: null },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const games = [
    { id: 1, name: 'Game 1', status: 'completed', points: 250 },
    { id: 2, name: 'Game 2', status: 'completed', points: 300 },
    { id: 3, name: 'Game 3', status: 'pending', points: 0 },
    { id: 4, name: 'Game 4', status: 'pending', points: 0 },
    { id: 5, name: 'Game 5', status: 'pending', points: 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Team Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard className="relative overflow-hidden p-0">
          <div className="absolute top-0 right-0 p-4">

          </div>
          
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 z-10 relative">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <img src={teamLogo} alt="Dhaka Dreamcatchers" className="w-full h-full object-contain drop-shadow-lg scale-125" />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-white mb-3">Dhaka Dreamcatchers</h2>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-200 font-medium">35 Members</span>
                </div>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">550 pts</span>
                </div>

                <button 
                  onClick={onLeaderboard}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0078D4] to-[#0092E4] border border-white/10 text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
                >
                  <Trophy className="w-4 h-4" />
                  <span className="font-bold">Leaderboard</span>
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Offline Game Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-[#0092E4]" />
          Offline Game Progress
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {games.map((game, index) => (
            <GlassCard 
              key={game.id} 
              className={`flex flex-col items-center justify-center p-4 text-center relative overflow-hidden ${
                game.status === 'completed' ? 'border-green-500/30 bg-green-500/5' : 'opacity-80'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                game.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/30'
              }`}>
                {game.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              <div className="text-sm font-medium text-white mb-1">{game.name}</div>
              <div className={`text-xs ${game.status === 'completed' ? 'text-green-400 font-bold' : 'text-white/40'}`}>
                {game.status === 'completed' ? `${game.points} pts` : 'Locked'}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Members Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[#0092E4]" />
          Team Members
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex flex-col items-center justify-center p-6 text-center h-full hover:bg-white/5 transition-colors group relative">
                <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/70">
                  {index + 1}
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 mb-3 flex items-center justify-center overflow-hidden border-2 border-white/20 group-hover:border-[#0092E4] transition-colors">
                  <User className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <p className="text-white font-medium">{member.name}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
