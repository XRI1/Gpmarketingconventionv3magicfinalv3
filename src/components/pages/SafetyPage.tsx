import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { Shield, Phone, User, AlertTriangle, HeartPulse, Waves } from 'lucide-react';

interface SafetyPageProps {
  onBack: () => void;
  onHome: () => void;
}

export function SafetyPage({ onBack, onHome }: SafetyPageProps) {
  const marshalls = [
    { id: 1, name: 'Kamrul Hasan', role: 'Head of Safety', phone: '+8801700000001' },
    { id: 2, name: 'Nasreen Akter', role: 'Medical Officer', phone: '+8801700000002' },
    { id: 3, name: 'Rafiqul Islam', role: 'Floor Marshall', phone: '+8801700000003' },
  ];

  const guidelines = [
    { icon: HeartPulse, title: 'Medical Emergency', desc: 'First aid kits are available at the registration desk and with all floor marshalls.' },
    { icon: Shield, title: 'Security', desc: 'Keep your event ID visible at all times. Report suspicious activity to marshalls.' },
    { icon: Waves, title: 'Beach Safety', desc: 'Swimming is only allowed in designated zones between 6 AM and 6 PM.' },
  ];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <PageHeader 
          title="Safety & Security" 
          onBack={onBack} 
          onHome={onHome} 
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Emergency Contact - Prominent */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard neonBorder className="bg-red-500/10 border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 animate-pulse">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Emergency Hotline</h2>
                    <p className="text-red-200">24/7 Dedicated Support Line</p>
                  </div>
                </div>
                <a 
                  href="tel:999"
                  className="w-full md:w-auto px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-900/50"
                >
                  <Phone className="w-6 h-6" />
                  Call Now
                </a>
              </GlassCard>
            </motion.div>
          </div>

          {/* Safety Marshalls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Safety Marshalls
            </h2>
            <div className="space-y-3">
              {marshalls.map((marshall) => (
                <GlassCard key={marshall.id} hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{marshall.name}</p>
                        <p className="text-xs text-blue-200">{marshall.role}</p>
                      </div>
                    </div>
                    <a 
                      href={`tel:${marshall.phone}`}
                      className="p-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Safety Guidelines
            </h2>
            <div className="space-y-3">
              {guidelines.map((item, idx) => (
                <GlassCard key={idx} className="p-4">
                  <div className="flex gap-3">
                    <item.icon className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white text-sm font-bold mb-1">{item.title}</h3>
                      <p className="text-xs text-blue-200 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
