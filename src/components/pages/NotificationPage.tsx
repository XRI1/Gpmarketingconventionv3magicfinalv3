import { useState } from 'react';
import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { ArrowLeft, Bell, Calendar, Plane, Utensils, Gamepad2 } from 'lucide-react';
import { usePageNavigation } from '../../hooks/usePageNavigation';

export function NotificationPage() {
  const [activeTab, setActiveTab] = useState('all');
  const { goBack } = usePageNavigation();

  const notifications = [
    {
      id: 1,
      category: 'event',
      icon: Calendar,
      title: 'Session Starting Soon',
      message: 'Leadership Workshop begins in 30 minutes at Grand Hall',
      time: '5 min ago',
      read: false,
      urgent: true
    },

    {
      id: 3,
      category: 'transport',
      icon: Plane,
      title: 'Flight Confirmation',
      message: 'Your return flight has been confirmed for March 25th',
      time: '1 hour ago',
      read: true,
      urgent: false
    },
    {
      id: 4,
      category: 'game',
      icon: Gamepad2,
      title: 'New High Score!',
      message: 'You\'re now in the top 10 leaderboard. Keep playing!',
      time: '2 hours ago',
      read: true,
      urgent: false
    },
    {
      id: 5,
      category: 'event',
      icon: Calendar,
      title: 'Welcome to GP Convention 2025',
      message: 'Check your schedule and enjoy the event!',
      time: '1 day ago',
      read: true,
      urgent: false
    },
  ];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'event', label: 'Event' },
    { id: 'transport', label: 'Transport' },
    { id: 'game', label: 'Game' },
  ];

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === activeTab);

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="max-w-3xl mx-auto py-6 z-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <GlassCard>
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-[#0092E4]" />
                <h1 className="text-white">Notifications</h1>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <GlassCard className="p-2">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white shadow-lg'
                      : 'text-blue-200 hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <GlassCard 
                className={`${!notification.read ? 'border-l-4 border-l-[#0092E4]' : ''}`}
                neonBorder={notification.urgent}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notification.urgent 
                      ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                      : 'bg-gradient-to-br from-[#0078D4] to-[#0092E4]'
                  }`}>
                    <notification.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white">{notification.title}</h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[#0092E4] rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-blue-200 text-sm mb-2">{notification.message}</p>
                    <span className="text-blue-200/60 text-xs">{notification.time}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center py-12">
              <Bell className="w-16 h-16 text-blue-200/50 mx-auto mb-4" />
              <p className="text-blue-200">No notifications in this category</p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}