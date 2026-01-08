import { motion } from 'motion/react';
import { GlassCard } from '../../GlassCard';
import { Trophy, ChevronLeft, Sparkles } from 'lucide-react';
import dhakaLogo from 'figma:asset/659965dc4c336b95987df976fefc09a12cb5118f.png';
import supremosLogo from 'figma:asset/cdf5fd2d008726e8a2b31c67294925f84e1e22cf.png';
import khulnaLogo from 'figma:asset/78b2612d182b9660d4c3c7211136ea90a12a0667.png';

interface SquadLeaderboardProps {
  onBack: () => void;
}

export function SquadLeaderboard({ onBack }: SquadLeaderboardProps) {
  const teams = [
    { rank: 1, name: 'Dhaka Dreamcatchers', score: 2450, logo: dhakaLogo },
    { rank: 2, name: 'Sylhet Supremos', score: 2320, logo: supremosLogo },
    { rank: 3, name: 'Khulna Mavericks', score: 2100, logo: khulnaLogo },
    { rank: 4, name: 'Mymensingh Maestros', score: 1950 },
    { rank: 5, name: 'Rajshahi Raiders', score: 1800 },
    { rank: 6, name: 'Chattogram Rebels', score: 1650 },
    { rank: 7, name: 'CES – Customer First, Always!', score: 1500 },
    { rank: 8, name: 'S&D – Purpose & Passion', score: 1350 },
    { rank: 9, name: 'Brand & Market Communications', score: 1200 },
  ];

  return (
    <div className="relative max-w-4xl mx-auto min-h-[600px]">
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-3xl">
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3], 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2], 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"
        />
        <motion.div
           animate={{ 
            opacity: [0, 0.4, 0],
            scale: [0.8, 1.5, 0.8],
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[80px]"
        />
      </div>

      <div className="flex items-center gap-4 mb-8 relative z-10">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors backdrop-blur-sm border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Live Team Rankings
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </h2>
          <p className="text-blue-200 text-sm">Total points from 5 games</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-2 md:gap-4 mb-10 h-52 px-2 relative z-10 perspective-1000">
        {/* 2nd Place */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-1/3 max-w-[120px] flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-full"
          >
            <div className="w-full h-36 bg-gradient-to-t from-slate-800/80 to-slate-700/30 backdrop-blur-md rounded-t-xl flex flex-col items-center justify-between p-2 border-t border-slate-500/50 relative shadow-[0_0_20px_rgba(148,163,184,0.15)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-full group-hover:translate-y-[-100%] z-0" />
              
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-slate-800 border border-slate-400 flex items-center justify-center text-xs font-bold text-slate-300 z-10 shadow-lg">2</div>
              
              <div className="flex-1 flex items-center justify-center w-full py-1 overflow-visible relative z-10">
                <img src={teams[1].logo} alt={teams[1].name} className="max-w-[80%] max-h-[70px] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
              </div>
              
              <div className="text-center w-full pt-1 relative z-10">
                <span className="block text-xs text-slate-300 mb-0.5 truncate w-full px-1">{teams[1].name}</span>
                <span className="block text-lg font-bold text-white leading-none">{teams[1].score}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 1st Place */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-1/3 max-w-[140px] flex flex-col items-center z-20"
        >
          <motion.div
             animate={{ y: [0, -12, 0] }}
             transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
             className="w-full relative"
          >
            {/* Glowing aura */}
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full scale-110 animate-pulse" />
            
            <div className="w-full h-44 bg-gradient-to-t from-yellow-900/60 to-yellow-600/30 backdrop-blur-md rounded-t-xl flex flex-col items-center justify-between p-2 border-t border-yellow-400/60 shadow-[0_0_40px_rgba(234,179,8,0.3)] relative overflow-hidden group">
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] animate-[shimmer_3s_infinite]" />
              
              <div className="absolute top-0 right-0 p-2 z-10">
                <Trophy className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
              </div>
              
              <div className="flex-1 flex items-center justify-center w-full py-2 overflow-visible relative z-10">
                <img src={teams[0].logo} alt={teams[0].name} className="max-w-[90%] max-h-[90px] object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]" />
              </div>

              <div className="text-center w-full pt-1 relative z-10">
                <span className="block text-xs text-yellow-200 mb-0.5 truncate w-full px-1 font-medium">{teams[0].name}</span>
                <span className="block text-xl font-bold text-white leading-none drop-shadow-md">{teams[0].score}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="w-1/3 max-w-[120px] flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-full"
          >
            <div className="w-full h-28 bg-gradient-to-t from-orange-900/70 to-orange-700/30 backdrop-blur-md rounded-t-xl flex flex-col items-center justify-between p-2 border-t border-orange-500/50 relative shadow-[0_0_20px_rgba(249,115,22,0.15)] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-full group-hover:translate-y-[-100%] z-0" />

              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-orange-900 border border-orange-600 flex items-center justify-center text-xs font-bold text-orange-300 z-10 shadow-lg">3</div>
              
              <div className="flex-1 flex items-center justify-center w-full py-1 overflow-visible relative z-10">
                <img src={teams[2].logo} alt={teams[2].name} className="max-w-[70%] max-h-[50px] object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
              </div>
              
              <div className="text-center w-full pt-1 relative z-10">
                <span className="block text-xs text-orange-300 mb-0.5 truncate w-full px-1">{teams[2].name}</span>
                <span className="block text-lg font-bold text-white leading-none">{teams[2].score}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* List (Rank 4-9) */}
      <div className="space-y-3 pb-8 relative z-10">
        {teams.slice(3).map((team, index) => (
          <motion.div
            key={team.rank}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard className="flex items-center p-4 hover:bg-white/10 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-400 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-8 h-8 rounded-full bg-white/5 text-white/50 flex items-center justify-center font-bold mr-4 border border-white/10 group-hover:border-blue-400/50 group-hover:text-white transition-colors relative z-10">
                {team.rank}
              </div>
              
              <div className="flex-1 min-w-0 pr-4 relative z-10">
                <h4 className="text-white font-semibold truncate group-hover:text-blue-200 transition-colors">{team.name}</h4>
              </div>
              
              <div className="text-right flex-shrink-0 relative z-10">
                <div className="text-white font-bold group-hover:scale-110 transition-transform origin-right">{team.score}</div>
                <div className="text-[10px] text-green-400">pts</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
