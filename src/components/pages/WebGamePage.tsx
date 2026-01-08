import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { ArrowLeft, Home, Gamepad2, Trophy, Star, Play, Medal, Award, HelpCircle, X } from 'lucide-react';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { useAppContext } from '../../contexts/AppContext';

export function WebGamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const { goBack, goHome } = usePageNavigation();
  const { setUserPoints } = useAppContext();

  const leaderboard = [
    { rank: 1, name: 'Sarah Ahmed', score: 1250, avatar: 'S' },
    { rank: 2, name: 'Karim Hassan', score: 1180, avatar: 'K' },
    { rank: 3, name: 'Fatima Khan', score: 1050, avatar: 'F' },
    { rank: 4, name: 'Rafiq Islam', score: 980, avatar: 'R' },
    { rank: 5, name: 'Nadia Sultana', score: 920, avatar: 'N' },
    { rank: 6, name: 'Imran Hossain', score: 850, avatar: 'I' },
    { rank: 7, name: 'Zara Malik', score: 780, avatar: 'Z' },
    { rank: 8, name: 'Ahmed Rahman', score: 720, avatar: 'A', isYou: true },
    { rank: 9, name: 'Mehrin Ali', score: 680, avatar: 'M' },
    { rank: 10, name: 'Tariq Uddin', score: 620, avatar: 'T' },
  ];

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    
    // Simulate game logic
    setTimeout(() => {
      setGameOver(true);
      const earnedPoints = 50;
      setScore(earnedPoints);
      setUserPoints(prev => prev + earnedPoints);
      setGameStarted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <PageHeader 
          title="Web Games Arcade" 
          onBack={goBack}
          onHome={goHome}
          rightContent={
            <button 
              onClick={() => setShowInstructions(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-200 hover:text-white"
              title="How to Play"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          }
        />

        <AnimatePresence mode="wait">
          {gameStarted ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl mx-auto"
            >
              {gameOver ? (
                // Rules Screen
                <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Header */}
                  <div className="bg-[#F4CD46] p-6 text-center shadow-lg relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-black font-serif">BSRM কুইজে স্বাগতম!</h2>
                    <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-[#F4CD46] to-transparent opacity-50" />
                  </div>
                  
                  {/* Body */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-[#F4CD46] text-xl font-bold mb-4">কুইজের নিয়মাবলী:</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-[#F4CD46]">✓</span> মোট ৫টি প্রশ্ন রয়েছে
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F4CD46]">✓</span> প্রতিটি প্রশ্নের জন্য ৩০ সেকেন্ড সময় পাবেন
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F4CD46]">✓</span> সঠিক উত্তর দিলে অবশিষ্ট সময় অনুযায়ী পয়েন্ট পাবেন
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F4CD46]">✓</span> উদাহরণ: ২২ সেকেন্ড বাকি থাকলে = ২২ পয়েন্ট
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F4CD46]">✓</span> ভুল উত্তরে কোনো পয়েন্ট পাবেন না
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F4CD46]">✓</span> সর্বোচ্চ স্কোর: ১৫০ পয়েন্ট
                        </li>
                      </ul>
                    </div>

                    <button 
                      onClick={() => setGameOver(false)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F4CD46] to-[#FFD54F] text-black font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(244,205,70,0.3)] mt-4"
                    >
                      কুইজ শুরু করুন
                    </button>
                  </div>
                </div>
              ) : (
                // Question Screen
                <div className="bg-[#1A1A1A] rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                   {/* Top Bar */}
                   <div className="flex justify-between items-center text-gray-400 mb-2">
                     <span>প্রশ্ন ১ / ৫</span>
                     <span>20%</span>
                   </div>
                   {/* Progress Bar */}
                   <div className="w-full h-2 bg-gray-800 rounded-full mb-8">
                     <div className="h-full bg-[#F4CD46] rounded-full w-1/5 shadow-[0_0_10px_rgba(244,205,70,0.5)]" />
                   </div>

                   {/* Timer */}
                   <div className="border border-[#F4CD46]/30 bg-[#F4CD46]/5 rounded-xl p-4 flex items-center justify-center gap-2 mb-8">
                     <div className="w-5 h-5 rounded-full border-2 border-[#F4CD46] flex items-center justify-center">
                       <div className="w-0.5 h-2 bg-[#F4CD46]" />
                     </div>
                     <span className="text-[#F4CD46] font-bold text-xl">27s</span>
                   </div>

                   {/* Question */}
                   <div className="mb-8">
                     <h3 className="text-white text-xl md:text-2xl font-bold">Late Payment Charge (LPC) কত?</h3>
                   </div>

                   {/* Options */}
                   <div className="space-y-4">
                     {['১০%', '১২%', '১৪%', '১৫%'].map((opt, i) => (
                       <button
                         key={i}
                         onClick={() => {
                            setScore(score + 22);
                            // Simple simulation of progression
                            if (score > 40) {
                              setGameStarted(false); 
                            }
                         }}
                         className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-left hover:bg-[#F4CD46]/20 hover:border-[#F4CD46] transition-all hover:scale-[1.02] active:scale-[0.98]"
                       >
                         {opt}
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Neon Racer",
                    desc: "High-speed sci-fi racing",
                    img: "https://images.unsplash.com/photo-1721372261034-525a25737f5f?q=80&w=600&auto=format&fit=crop"
                  },
                  {
                    title: "Mind Matrix",
                    desc: "Solve complex patterns",
                    img: "https://images.unsplash.com/photo-1611546191222-96fb7afd5af9?q=80&w=600&auto=format&fit=crop"
                  },
                  {
                    title: "GP Trivia",
                    desc: "Test your knowledge",
                    img: "https://images.unsplash.com/photo-1750041888982-67a58e6c9014?q=80&w=600&auto=format&fit=crop"
                  }
                ].map((game, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div 
                      onClick={() => { setGameStarted(true); setGameOver(true); setScore(0); }} 
                      className="h-full cursor-pointer"
                    >
                      <GlassCard 
                        className="h-full group hover:bg-white/10 transition-colors relative overflow-hidden"
                      >
                        <div className="aspect-video rounded-lg bg-slate-800 mb-4 overflow-hidden relative">
                          <img 
                            src={game.img} 
                            alt={game.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-[#0092E4] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                              <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{game.title}</h3>
                        <p className="text-sm text-blue-200/70">{game.desc}</p>
                      </GlassCard>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions Modal */}
      <AnimatePresence>
        {showInstructions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md"
            >
              <GlassCard neonBorder className="relative">
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-[#0092E4]" />
                  How to Play
                </h2>
                
                <div className="space-y-4 text-sm text-blue-200">
                  <p>1. Tap "Start Game" to begin the quiz challenge.</p>
                  <p>2. Answer questions correctly and quickly to earn maximum points.</p>
                  <p>3. Complete daily challenges to climb the leaderboard.</p>
                  <p>4. Top 3 players win exclusive prizes at the Gala Night!</p>
                </div>

                <button 
                  onClick={() => setShowInstructions(false)}
                  className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Got it!
                </button>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}