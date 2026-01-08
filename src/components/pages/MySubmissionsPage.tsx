import { motion } from 'motion/react';
import { Clock, CheckCircle2, Star, XCircle, Camera, Plus } from 'lucide-react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';

interface MySubmissionsPageProps {
  onBack: () => void;
  onHome: () => void;
  onNavigate: (page: string) => void;
}

type SubmissionStatus = 'pending' | 'approved' | 'shortlisted' | 'rejected';

interface Submission {
  id: string;
  imageUrl: string;
  title: string;
  status: SubmissionStatus;
  timestamp: string;
  points?: number;
}

export function MySubmissionsPage({ onBack, onHome, onNavigate }: MySubmissionsPageProps) {
  // Mock Data - In a real app, this would come from a backend
  const submissions: Submission[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1704703335952-10b90cd0312a?q=80&w=1080&auto=format&fit=crop',
      title: 'Golden Hour at Cox\'s Bazar',
      status: 'shortlisted',
      timestamp: '10 mins ago',
      points: 50
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080&auto=format&fit=crop',
      title: 'Team Building Fun',
      status: 'approved',
      timestamp: '1 hour ago',
      points: 20
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1519671482503-d75c38c0ed58?q=80&w=1080&auto=format&fit=crop',
      title: 'Sunset Vibes',
      status: 'pending',
      timestamp: 'Just now'
    }
  ];

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-md bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
      case 'approved':
        return (
          <span className="px-2 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        );
      case 'shortlisted':
        return (
          <span className="px-2 py-1 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            <Star className="w-3 h-3" /> Shortlisted
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <PageHeader 
          title="Your Submissions" 
          onBack={onBack}
          onHome={onHome}
        />

        {submissions.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Camera className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-white font-medium text-lg mb-2">No Photos Yet</h3>
            <p className="text-blue-200/60 text-sm mb-8">You haven't submitted any photos for the competition.</p>
            <button 
              onClick={() => onNavigate('photo-upload')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold flex items-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-5 h-5" />
              Upload Now
            </button>
          </div>
        ) : (
          // Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-0 overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video bg-black/50">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    <p className="text-blue-200/60 text-xs mb-4">{item.timestamp}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      {item.points ? (
                        <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                          +{item.points} Points
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Add New Button Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: submissions.length * 0.1 }}
            >
              <button
                onClick={() => onNavigate('photo-upload')}
                className="w-full h-full min-h-[200px] rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-white/60" />
                </div>
                <span className="text-white/60 font-medium">Submit Another Photo</span>
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
