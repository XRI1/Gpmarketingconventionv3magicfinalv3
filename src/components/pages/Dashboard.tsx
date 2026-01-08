import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { DashboardGrid } from '../DashboardGrid';
import { GPBrandHeader } from '../GPBrandHeader';
import { GPLogo } from '../GPLogo';
import { Footer } from '../Footer';
import { 
  Calendar, 
  MapPin, 
  Plane, 
  Hotel, 
  Shield, 
  Bell, 
  Camera, 
  Gamepad2, 
  GraduationCap, 
  MessageSquare, 
  Image as ImageIcon,
  QrCode,
  Aperture,
  Trophy,
  Share2,
  Sparkles,
  Wand2
} from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export function Dashboard() {
  const navigate = useNavigate();
  const { userName } = useAppContext();

  const menuItems = [
    { id: 'schedule', icon: Calendar, label: 'Event Schedule', color: 'from-purple-500 to-indigo-500' },
    { id: 'squad', icon: Trophy, label: 'GP Squad Challenge', color: 'from-yellow-500 to-orange-500', badge: 'LIVE' },
    { id: 'venue', icon: MapPin, label: 'Venue Info', color: 'from-blue-500 to-cyan-500' },

    { id: 'transport', icon: Plane, label: 'Flight & Bus', color: 'from-emerald-500 to-teal-500', badge: 'NEW' },
    { id: 'frames', icon: Share2, label: 'Social Frames', color: 'from-pink-500 to-rose-500', badge: 'NEW' },
    { id: 'hotel', icon: Hotel, label: 'Hotel Rooms', color: 'from-indigo-500 to-purple-500', badge: 'NEW' },
    { id: 'safety', icon: Shield, label: 'Safety Marshalls', color: 'from-red-500 to-orange-500', badge: 'IMPORTANT' },
    { id: 'notifications', icon: Bell, label: 'Notifications', color: 'from-yellow-500 to-amber-500' },
    { id: 'photobooth', icon: Camera, label: 'Magic Photobooth', color: 'from-fuchsia-500 to-purple-600' },
    { id: 'photography-competition', icon: Aperture, label: 'Photo Contest', color: 'from-pink-500 to-purple-500' },
    { id: 'game', icon: Gamepad2, label: 'Games', color: 'from-cyan-500 to-blue-500' },
    { id: 'quiz', icon: GraduationCap, label: 'Magic Quiz', color: 'from-teal-500 to-emerald-500' },
    { id: 'feedback', icon: MessageSquare, label: 'Feedback', color: 'from-violet-500 to-purple-500' },
    { id: 'gallery', icon: ImageIcon, label: 'Enchanted Gallery', color: 'from-rose-500 to-pink-500' },
  ];

  const handleMenuClick = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-[#0f0824] text-white selection:bg-purple-500/30">
      
      {/* Magical Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511893020767-efc8c3f6bd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwcHVycGxlJTIwc21va2UlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njc4MjE4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center opacity-30"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0f0824]/80 to-[#0f0824]" />
        
        {/* Floating Orbs */}
        <motion.div
           className="absolute top-[-10%] left-[20%] w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-[128px]"
           animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
           className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px]"
           animate={{ x: [0, -30, 0], y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
           transition={{ duration: 12, repeat: Infinity }}
        />
        

      </div>

      <div className="max-w-6xl mx-auto p-4 py-6 z-10 relative pb-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard className="text-center relative overflow-hidden !p-4" neonBorder>
             {/* Header Background Glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-2 relative z-10">
              <div className="flex-1 text-left">
                 <Wand2 className="w-6 h-6 text-purple-400 opacity-80" />
              </div>
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <Bell className="w-6 h-6 text-white" />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center border border-black">
                    3
                  </span>
                </button>
              </div>
            </div>

            {/* User Welcome & Title */}
            <div className="mb-4 relative z-10">
              <motion.div
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.1 }}
                 className="flex justify-center mb-2"
              >
                <GPLogo className="w-40 h-40" />
              </motion.div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Welcome, {userName || 'Guest'}
              </h1>
              <p className="text-blue-200/60 font-light">Ready to cast some spells today?</p>
            </div>

            {/* Magic Pass / QR Ticket */}
            <motion.div
              className="max-w-sm mx-auto p-1 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-[#0f0824] rounded-lg p-4 flex items-center gap-5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                 
                <div className="bg-white p-2 rounded-lg z-10">
                   <QrCode className="w-12 h-12 text-black" />
                </div>
                
                <div className="text-left z-10 flex-1">
                  <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1">Magic Access Pass</p>
                  <p className="text-white text-lg font-mono tracking-widest">GP-2026-MAGIC</p>
                </div>

                <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/20 blur-3xl rounded-full" />
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Menu Grid */}
        <DashboardGrid 
          items={menuItems.filter((item) => item.id !== 'notifications' && item.id !== 'feedback')}
          onItemClick={handleMenuClick}
        />

        {/* Footer */}
        <motion.div
          className="mt-12 text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Footer />
          <div className="text-white/20 text-xs">
            Magic Is You • GP Marketing Convention 2026
          </div>
        </motion.div>
      </div>
    </div>
  );
}
