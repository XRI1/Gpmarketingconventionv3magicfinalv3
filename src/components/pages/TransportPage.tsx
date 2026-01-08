import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { Plane, Bus, Phone, MapPin, Clock, AlertCircle, User } from 'lucide-react';

interface TransportPageProps {
  onBack: () => void;
  onHome: () => void;
}

export function TransportPage({ onBack, onHome }: TransportPageProps) {
  const flights = [
    { id: 'f1', airline: 'Biman Bangladesh', flightNo: 'BG-433', from: 'DAC', to: 'CXB', time: '09:00 AM', status: 'On Time' },
    { id: 'f2', airline: 'US-Bangla', flightNo: 'BS-143', from: 'DAC', to: 'CXB', time: '10:30 AM', status: 'Delayed' },
    { id: 'f3', airline: 'Novoair', flightNo: 'VQ-922', from: 'DAC', to: 'CXB', time: '12:15 PM', status: 'On Time' },
  ];

  const buses = [
    { id: 'b1', route: 'Hotel Route A', busNo: 'GP-01', time: '07:00 AM', pickup: 'GPHouse' },
    { id: 'b2', route: 'Hotel Route B', busNo: 'GP-02', time: '07:15 AM', pickup: 'Nikunja' },
    { id: 'b3', route: 'Hotel Route C', busNo: 'GP-03', time: '07:30 AM', pickup: 'Uttara' },
  ];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <PageHeader 
          title="Flight & Bus Schedule" 
          onBack={onBack} 
          onHome={onHome} 
        />

        <div className="space-y-6">
          {/* Flight Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#0092E4]" />
              Flight Schedule
            </h2>
            <div className="space-y-3">
              {flights.map((flight) => (
                <GlassCard key={flight.id} hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Plane className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{flight.airline}</p>
                        <p className="text-xs text-blue-200">{flight.flightNo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{flight.time}</p>
                      <p className={`text-xs font-medium ${
                        flight.status === 'On Time' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {flight.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-blue-200/80 border-t border-white/10 pt-3">
                    <span>{flight.from} (Dhaka)</span>
                    <div className="flex-1 border-b border-dashed border-white/20 mx-4 relative top-[1px]" />
                    <span>{flight.to} (Cox's Bazar)</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Bus Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
              <Bus className="w-5 h-5 text-green-400" />
              Bus Pickups
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {buses.map((bus) => (
                <GlassCard key={bus.id} hover className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Bus className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{bus.route}</p>
                      <p className="text-xs text-blue-200">{bus.busNo}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-blue-200">
                      <Clock className="w-4 h-4" />
                      <span>Departs: {bus.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-200">
                      <MapPin className="w-4 h-4" />
                      <span>Pickup: {bus.pickup}</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Emergency Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard neonBorder className="bg-red-500/10 border-red-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold mb-1">Transport Emergency</h3>
                  <p className="text-red-200 text-sm mb-4">
                    If you miss your flight or bus, please contact the transport coordinator immediately.
                  </p>
                  <a 
                    href="tel:+8801700000000"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Coordinator
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
