import { motion } from 'motion/react';
import { GlassCard } from '../../GlassCard';
import { QrCode, ArrowRight, Camera } from 'lucide-react';
import { useState } from 'react';

interface SquadLobbyProps {
  onJoin: (code: string) => void;
  onScan: () => void;
  onBack: () => void;
}

export function SquadLobby({ onJoin, onScan, onBack }: SquadLobbyProps) {
  const [teamCode, setTeamCode] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">GP Squad Challenge</h2>
        <p className="text-blue-200">Join your team, represent your room, and compete together.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Join with Code */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="h-full flex flex-col items-center justify-center p-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
              <ArrowRight className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Join with Team Code</h3>
            
            <div className="w-full space-y-4">
              <input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                placeholder="Enter Team Code"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
              />
              <button
                onClick={() => teamCode && onJoin(teamCode)}
                disabled={!teamCode}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Join Team
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scan QR */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard 
            className="h-full flex flex-col items-center justify-center p-8 space-y-6 cursor-pointer group hover:bg-white/10 transition-colors"
            onClick={onScan}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-colors" />
              <div className="relative w-20 h-20 rounded-2xl border-2 border-blue-400/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Camera className="w-10 h-10 text-white" />
                {/* Scanning Frame Corners */}
                <div className="absolute top-[-2px] left-[-2px] w-4 h-4 border-t-2 border-l-2 border-blue-400" />
                <div className="absolute top-[-2px] right-[-2px] w-4 h-4 border-t-2 border-r-2 border-blue-400" />
                <div className="absolute bottom-[-2px] left-[-2px] w-4 h-4 border-b-2 border-l-2 border-blue-400" />
                <div className="absolute bottom-[-2px] right-[-2px] w-4 h-4 border-b-2 border-r-2 border-blue-400" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Scan QR Code</h3>
              <p className="text-sm text-blue-200/60">Scan the QR code from your room or screen</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
