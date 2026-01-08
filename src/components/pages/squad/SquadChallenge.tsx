import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import squadLogo from 'figma:asset/f67043b176b14f66a0ac56aa05988d5a201fdc50.png';
import { ParallaxBackground } from '../../ParallaxBackground';
import { GPBrandHeader } from '../../GPBrandHeader';
import { TeamDetails } from './TeamDetails';
import { GameSelection } from './GameSelection';
import { PenaltyKickGame } from './PenaltyKickGame';
import { SquadLeaderboard } from './SquadLeaderboard';
import { TeamChat } from './TeamChat';
import { ChevronLeft, Home } from 'lucide-react';

type SquadView = 'team' | 'games' | 'game-penalty' | 'leaderboard' | 'chat';

interface SquadChallengeProps {
  onBack: () => void;
  onHome: () => void;
}

export function SquadChallenge({ onBack, onHome }: SquadChallengeProps) {
  const [currentView, setCurrentView] = useState<SquadView>('team');

  const renderView = () => {
    switch (currentView) {
      case 'team':
        return (
          <TeamDetails 
            onPlay={() => setCurrentView('games')} 
            onLeaderboard={() => setCurrentView('leaderboard')}
            onChat={() => setCurrentView('chat')}
            onLeave={() => {}} // No-op as leaving is disabled
          />
        );
      case 'games':
        return (
          <GameSelection 
            onSelectGame={(id) => {
              if (id === 'penalty') setCurrentView('game-penalty');
            }} 
            onBack={() => setCurrentView('team')}
          />
        );
      case 'game-penalty':
        return (
          <PenaltyKickGame 
            onFinish={(score) => {
              console.log('Game finished, score:', score);
              setCurrentView('team');
            }}
            onBack={() => setCurrentView('games')}
          />
        );
      case 'leaderboard':
        return (
          <SquadLeaderboard 
            onBack={() => setCurrentView('team')} 
          />
        );
      case 'chat':
        return (
          <TeamChat 
            onBack={() => setCurrentView('team')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900 pb-20">
      <ParallaxBackground />
      
      {/* Navigation Header */}
      <div className="relative z-10 px-4 pt-6 pb-2 max-w-6xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => {
            if (currentView === 'team') onBack();
            else if (currentView === 'games') setCurrentView('team');
            else if (currentView === 'game-penalty') setCurrentView('games');
            else if (currentView === 'leaderboard') setCurrentView('team');
            else if (currentView === 'chat') setCurrentView('team');
          }}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="h-16 flex items-center justify-center">
          <img 
            src={squadLogo} 
            alt="Squad Challenge" 
            className="h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
          />
        </div>
        
        <button 
          onClick={onHome}
          className="p-2 -mr-2 rounded-full hover:bg-white/10 text-white transition-colors"
        >
          <Home className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 p-4 pt-4 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
