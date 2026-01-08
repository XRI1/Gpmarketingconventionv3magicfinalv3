import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../../GlassCard';
import { ArrowRight, Trophy, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PenaltyKickGameProps {
  onFinish: (score: number) => void;
  onBack: () => void;
}

export function PenaltyKickGame({ onFinish, onBack }: PenaltyKickGameProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [kicksLeft, setKicksLeft] = useState(3);
  const [score, setScore] = useState(0);
  const [goaliePos, setGoaliePos] = useState(50); // 0-100%
  const [ballPos, setBallPos] = useState({ x: 50, y: 80 }); // start position
  const [isKicking, setIsKicking] = useState(false);
  const [power, setPower] = useState(0);
  const [direction, setDirection] = useState(50);
  const [lastResult, setLastResult] = useState<'GOAL!' | 'MISSED!' | null>(null);

  // Mock game loop for power meter
  useEffect(() => {
    if (gameState === 'playing' && !isKicking) {
      const interval = setInterval(() => {
        setPower((p) => (p + 2) % 100);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [gameState, isKicking]);

  const handleKick = () => {
    if (isKicking) return;
    setIsKicking(true);

    // Simple random logic for demo
    const success = Math.random() > 0.4; // 60% chance
    
    // Animate ball
    setBallPos({ x: direction, y: 20 });
    
    setTimeout(() => {
      if (success) {
        setScore(s => s + 1);
        setLastResult('GOAL!');
      } else {
        setLastResult('MISSED!');
      }

      setTimeout(() => {
        if (kicksLeft > 1) {
          setKicksLeft(k => k - 1);
          setBallPos({ x: 50, y: 80 });
          setLastResult(null);
          setIsKicking(false);
        } else {
          setGameState('result');
        }
      }, 1500);
    }, 600);
  };

  if (gameState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <GlassCard className="p-8 space-y-6">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 mx-auto flex items-center justify-center">
            <Trophy className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Penalty Kick Challenge</h2>
          <p className="text-blue-200">You have 3 attempts to score. Time your kick carefully!</p>
          <button
            onClick={() => setGameState('playing')}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors"
          >
            Start Game
          </button>
        </GlassCard>
      </div>
    );
  }

  if (gameState === 'result') {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <GlassCard className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
            {score} / 3
          </div>
          <p className="text-blue-200 mb-8">Goals Scored</p>
          <button
            onClick={() => onFinish(score * 100)}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
          >
            Submit Score
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 text-white">
        <div>
          <span className="text-blue-300">Score:</span>
          <span className="text-2xl font-bold ml-2">{score}</span>
        </div>
        <div>
          <span className="text-blue-300">Kicks Left:</span>
          <span className="text-2xl font-bold ml-2">{kicksLeft}</span>
        </div>
      </div>

      <GlassCard className="relative h-[400px] overflow-hidden bg-gradient-to-b from-slate-800 to-green-900/50 border-0 p-0">
        {/* Goal Post */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 border-4 border-white/50 border-b-0 rounded-t-lg">
           <div className="absolute inset-0 bg-white/5 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30" />
        </div>

        {/* Goalie */}
        <motion.div 
          className="absolute top-20 w-12 h-20 bg-red-500 rounded-full"
          animate={{ x: goaliePos - 50 }} // simple visual stub
          style={{ left: '50%' }}
        />

        {/* Ball */}
        <motion.div
          className="absolute w-8 h-8 bg-white rounded-full shadow-lg z-10"
          initial={{ left: '50%', top: '80%' }}
          animate={{ 
            left: `${ballPos.x}%`, 
            top: `${ballPos.y}%`,
            scale: ballPos.y < 50 ? 0.6 : 1
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ x: '-50%' }}
        />

        {/* Feedback Text */}
        <AnimatePresence>
          {lastResult && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black ${lastResult === 'GOAL!' ? 'text-green-400' : 'text-red-400'} drop-shadow-lg`}
            >
              {lastResult}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Overlay */}
        {!isKicking && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 space-y-2">
            <div className="flex justify-between text-xs text-white/70 font-mono">
              <span>POWER</span>
              <span>{power}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-75"
                style={{ width: `${power}%` }}
              />
            </div>
            <button
              onClick={handleKick}
              className="w-full mt-4 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 active:scale-95 transition-all shadow-lg"
            >
              KICK!
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
