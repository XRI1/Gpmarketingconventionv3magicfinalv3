import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { Hotel, Key, Users, Wifi, Coffee, Waves, Dumbbell, Clock, Info } from 'lucide-react';

interface HotelPageProps {
  onBack: () => void;
  onHome: () => void;
}

export function HotelPage({ onBack, onHome }: HotelPageProps) {
  const facilities = [
    { icon: Wifi, label: 'Free Wi-Fi' },
    { icon: Coffee, label: 'Breakfast' },
    { icon: Waves, label: 'Pool Access' },
    { icon: Dumbbell, label: 'Gym' },
  ];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <PageHeader 
          title="Hotel Accommodation" 
          onBack={onBack} 
          onHome={onHome} 
        />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Room Info - Main Column */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard neonBorder className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-[#0092E4]/20 rounded-bl-2xl border-b border-l border-[#0092E4]/30">
                  <span className="text-[#0092E4] font-bold">Room 402</span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-1">Sea Pearl Royal Tulip</h2>
                <p className="text-blue-200 text-sm mb-6">Superior Sea View Suite</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Key className="w-4 h-4 text-yellow-400" />
                      <span className="text-blue-200 text-xs uppercase">Check-in</span>
                    </div>
                    <p className="text-white font-bold">12:00 PM</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-blue-200 text-xs uppercase">Check-out</span>
                    </div>
                    <p className="text-white font-bold">11:00 AM</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    Roommate
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                      TM
                    </div>
                    <div>
                      <p className="text-white font-medium">Tanvir Mahbub</p>
                      <p className="text-xs text-blue-200">Area Manager, Sylhet</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white font-bold mb-3">Hotel Facilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {facilities.map((facility, idx) => (
                  <GlassCard key={idx} className="flex flex-col items-center justify-center p-4 text-center">
                    <facility.icon className="w-6 h-6 text-blue-300 mb-2" />
                    <span className="text-white text-xs">{facility.label}</span>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Guidelines - Side Column */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="h-full"
            >
              <GlassCard className="h-full">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  Guidelines
                </h3>
                <ul className="space-y-4 text-sm text-blue-200">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>Present your NID/Passport at the reception desk for check-in.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>Key cards must be returned during check-out.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>Breakfast is served from 6:30 AM to 10:00 AM at the main restaurant.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>No smoking inside the rooms. Use designated areas.</span>
                  </li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
