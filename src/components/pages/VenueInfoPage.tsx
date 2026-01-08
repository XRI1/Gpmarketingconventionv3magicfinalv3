import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  MapPin, 
  Navigation,
  Gamepad2,
  Utensils,
  Mic2,
  Camera,
  QrCode,
  Info
} from 'lucide-react';

interface VenueInfoPageProps {
  onBack: () => void;
  onHome: () => void;
}

export function VenueInfoPage({ onBack, onHome }: VenueInfoPageProps) {
  const locations = [
    {
      id: 'main-hall',
      name: 'Main Convention Hall',
      location: 'Grand Ballroom, Level 1',
      description: 'The heart of the convention. Join here for the opening keynote, marketing insights sessions, and the grand closing ceremony.',
      image: 'https://images.unsplash.com/photo-1760001553923-2ef42f65a730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25mZXJlbmNlJTIwaGFsbCUyMGJsdWUlMjBsaWdodGluZyUyMGV2ZW50fGVufDF8fHx8MTc2NzAzMDUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Mic2,
      features: ['Keynote Stage', 'Seating for 500+', 'Audio/Visual Hub'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'game-zone',
      name: 'GP Game Zone',
      location: 'Pool Side Area',
      description: 'Experience the future of gaming. Participate in the AR Scavenger Hunt, VR demos, and relax by the pool between sessions.',
      image: 'https://images.unsplash.com/photo-1759171053096-e7dbe7c36eb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZ2FtaW5nJTIwem9uZSUyMGZ1dHVyaXN0aWMlMjBhcmNhZGV8ZW58MXx8fHwxNzY3NzcxNTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Gamepad2,
      features: ['AR Scavenger Start', 'VR Stations', 'Lounge Area'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'food-zone',
      name: 'Food & Refreshment Zone',
      location: 'Ocean View Terrace',
      description: 'Savor a wide variety of cuisines while enjoying the breathtaking ocean view. Open for lunch, networking snacks, and dinner.',
      image: 'https://images.unsplash.com/photo-1581796085954-d5be6daa44d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY2F0ZXJpbmclMjBidWZmZXQlMjBkaW5pbmclMjBsdXh1cnl8ZW58MXx8fHwxNzY3MDMwNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Utensils,
      features: ['Buffet Dining', 'Live Stations', 'Beverage Bar'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'tech-zone',
      name: 'Tech Experience & Photobooth',
      location: 'Garden Area',
      description: 'Step into the future. Capture memories at our AI/AR Photobooth and explore the latest tech showcases from Grameenphone.',
      image: 'https://images.unsplash.com/photo-1713336677521-a7caec235ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGhvdG8lMjBib290aCUyMGZ1dHVyaXN0aWMlMjBldmVudHxlbnwxfHx8fDE3NjcwMzA1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Camera,
      features: ['AR Photobooth', 'Tech Demos', 'Interactive Displays'],
      color: 'from-cyan-500 to-teal-500'
    },
    {
      id: 'registration',
      name: 'Registration & Help Desk',
      location: 'Main Hotel Lobby',
      description: 'Your first stop. Collect your RFID badge, convention kit, and get assistance from our dedicated support team.',
      image: 'https://images.unsplash.com/photo-1760385737059-c65b583ec23e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBldmVudCUyMHJlZ2lzdHJhdGlvbiUyMGRlc2slMjB0ZWNofGVufDF8fHx8MTc2NzAzMDUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: QrCode,
      features: ['Check-in', 'Info Desk', 'Bag Collection'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20" style={{ background: '#0D1A2E' }}>
      <ParallaxBackground />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <PageHeader 
          title="Program Locations" 
          onBack={onBack}
          onHome={onHome}
        />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <p className="text-blue-200">
            Navigate through the different zones of the GP Marketing Convention 2025 at Sea Pearl Beach Resort.
          </p>
        </motion.div>

        <div className="space-y-6">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-0 overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-48 md:h-auto overflow-hidden">
                    <ImageWithFallback
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/50" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${loc.color} shadow-lg`}>
                        {loc.location}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${loc.color} bg-opacity-20`}>
                        <loc.icon className="w-6 h-6 text-white" />
                      </div>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sea Pearl Beach Resort " + loc.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors"
                      >
                        <Navigation className="w-5 h-5" />
                      </a>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{loc.name}</h3>
                    <p className="text-blue-200/80 text-sm mb-4 leading-relaxed">
                      {loc.description}
                    </p>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                        Highlights
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {loc.features.map((feature, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-blue-100"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Global Map Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mb-8"
        >
          <GlassCard neonBorder className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-blue-500/20 text-cyan-400">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-1">Lost in the venue?</h3>
                <p className="text-blue-200 text-sm mb-4">View the full resort map to find your way around.</p>
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00A8E1] to-[#0078A0] text-white font-semibold shadow-lg hover:shadow-cyan-500/20 transition-shadow">
                  Download Resort Map (PDF)
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}