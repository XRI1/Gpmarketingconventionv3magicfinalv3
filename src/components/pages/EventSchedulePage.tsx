import { useState } from 'react';
import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { Clock, MapPin, User, Download } from 'lucide-react';

interface EventSchedulePageProps {
  onBack: () => void;
  onHome: () => void;
}

export function EventSchedulePage({ onBack, onHome }: EventSchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState(1);

  const scheduleData = {
    1: [
      {
        time: '09:00 AM',
        title: 'Registration & Welcome Coffee',
        location: 'Grand Hall Entrance',
        speaker: null,
      },
      {
        time: '10:00 AM',
        title: 'Opening Ceremony & CEO Address',
        location: 'Grand Hall',
        speaker: 'Yasir Azman - CEO, Grameenphone',
      },
      {
        time: '11:30 AM',
        title: 'Marketing Excellence Workshop',
        location: 'Conference Room A',
        speaker: 'Dr. Sarah Ahmed',
      },
      {
        time: '01:00 PM',
        title: 'Networking Lunch',
        location: 'Dining Area',
        speaker: null,
      },
      {
        time: '02:30 PM',
        title: '2025 Strategy Roadmap',
        location: 'Grand Hall',
        speaker: 'Mohammad Sajjad - COO',
      },
      {
        time: '04:00 PM',
        title: 'Team Building Activities',
        location: 'Beach',
        speaker: null,
      },
      {
        time: '07:00 PM',
        title: 'Welcome Dinner & Cultural Night',
        location: 'Poolside',
        speaker: null,
      },
    ],
    2: [
      {
        time: '08:00 AM',
        title: 'Morning Yoga & Wellness',
        location: 'Beach',
        speaker: null,
      },
      {
        time: '09:30 AM',
        title: 'Digital Transformation Panel',
        location: 'Conference Room A',
        speaker: 'Industry Leaders Panel',
      },
      {
        time: '11:00 AM',
        title: 'Product Innovation Showcase',
        location: 'Grand Hall',
        speaker: 'Product Team',
      },
      {
        time: '01:00 PM',
        title: 'Lunch Break',
        location: 'Dining Area',
        speaker: null,
      },
      {
        time: '02:30 PM',
        title: 'Leadership Masterclass',
        location: 'Conference Room B',
        speaker: 'International Guest Speaker',
      },
      {
        time: '05:00 PM',
        title: 'Awards & Recognition Ceremony',
        location: 'Grand Hall',
        speaker: null,
      },
      {
        time: '08:00 PM',
        title: 'Gala Dinner',
        location: 'Grand Hall',
        speaker: null,
      },
    ],
    3: [
      {
        time: '08:00 AM',
        title: 'Breakfast',
        location: 'Dining Area',
        speaker: null,
      },
      {
        time: '09:30 AM',
        title: 'Q&A with Leadership',
        location: 'Grand Hall',
        speaker: 'Executive Team',
      },
      {
        time: '11:00 AM',
        title: 'Closing Remarks & Way Forward',
        location: 'Grand Hall',
        speaker: 'CEO',
      },
      {
        time: '12:30 PM',
        title: 'Farewell Lunch',
        location: 'Dining Area',
        speaker: null,
      },
      {
        time: '02:00 PM',
        title: 'Checkout & Departure',
        location: 'Hotel Lobby',
        speaker: null,
      },
    ],
  };

  const currentSchedule = scheduleData[selectedDay as keyof typeof scheduleData];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-3xl mx-auto z-10 relative">
        <PageHeader 
          title="Event Schedule" 
          onBack={onBack}
          onHome={onHome}
          rightContent={
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-200 hover:text-white" title="Download Schedule">
              <Download className="w-5 h-5" />
            </button>
          }
        />

        {/* Day Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <GlassCard className="p-2">
            <div className="flex gap-2">
              {[1, 2].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-1 py-3 rounded-xl transition-all ${
                    selectedDay === day
                      ? 'bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white shadow-lg'
                      : 'text-blue-200 hover:bg-white/10'
                  }`}
                >
                  Day {day}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-4">
          {currentSchedule.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <GlassCard hover className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-[#0078D4] to-[#0092E4] border-4 border-slate-900" />
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20">
                    <div className="flex items-center gap-2 text-blue-200">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-white mb-2">{event.title}</h3>
                    
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-2 text-blue-200">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      
                      {event.speaker && (
                        <div className="flex items-center gap-2 text-blue-200">
                          <User className="w-4 h-4" />
                          <span>{event.speaker}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
