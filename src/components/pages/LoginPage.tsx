import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import wandBg from 'figma:asset/0968f5b476c144ffca3bdea132b385d2f35385e8.png';
import { MagicBackground } from '../MagicBackground';
import { GlassCard } from '../GlassCard';
import { GPLogo } from '../GPLogo';
import { Footer } from '../Footer';
import { ArrowRight, Wand2, Sparkles, Star } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();
  const { setEmployeeId: setContextEmployeeId } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.trim()) {
      setContextEmployeeId(employeeId);
      navigate('/otp');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={wandBg} 
          alt="Magic Background" 
          className="w-full h-full object-cover blur-sm opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-slate-900/80 to-black/90" />
      </div>

      {/* Magical Smoke Animation - Smoother */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <motion.div 
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
            }} 
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_70%)] blur-3xl" 
         />
      </div>
      
      {/* Hero Content Wrapper */}
      <div className="w-full max-w-4xl px-4 z-10 flex flex-col items-center">
        
        {/* Main Title / Hero Text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-10 relative"
        >



          <p className="text-xl md:text-2xl text-blue-200/80 font-light tracking-widest uppercase">
            GP Marketing Convention 2026
          </p>
        </motion.div>

        {/* Login Portal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md relative group"
        >
          {/* Animated Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-2xl opacity-75 blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
          
          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mb-8"
            >
              <div className="p-3 bg-white/5 rounded-full ring-1 ring-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <GPLogo className="w-16 h-16" />
              </div>
            </motion.div>

            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Welcome, Magician</h2>
              <p className="text-blue-200/70 text-sm">Enter your Employee ID to reveal the magic</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative group/input"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within/input:scale-110 duration-300">
                  <Wand2 className="h-5 w-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 font-medium tracking-wide"
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 text-white relative overflow-hidden group/btn shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.7)] transition-all duration-300 border border-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2 font-bold tracking-wider text-lg drop-shadow-md">
                  ENTER THE REALM
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Footer/Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Footer />
        </motion.div>

      </div>
      
      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
}
