import { motion } from 'motion/react';
import { Trophy, Heart, User } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';

interface PhotoLeaderboardPageProps {
  onBack: () => void;
}

interface LeaderboardEntry {
  id: string;
  imageUrl: string;
  photographer: string;
  region: string;
  score: number;
  rank?: number;
}

export function PhotoLeaderboardPage({ onBack }: PhotoLeaderboardPageProps) {
  // Mock Data
  const topPhotos: LeaderboardEntry[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      photographer: 'Rahim Ahmed',
      region: 'Dhaka North',
      score: 98,
      rank: 1
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=800&auto=format&fit=crop',
      photographer: 'Fatima Khan',
      region: 'Chittagong',
      score: 95,
      rank: 2
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
      photographer: 'Karim Ullah',
      region: 'Sylhet',
      score: 92,
      rank: 3
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1519671482503-d75c38c0ed58?q=80&w=800&auto=format&fit=crop',
      photographer: 'Nasreen Akter',
      region: 'Rajshahi',
      score: 89
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?q=80&w=800&auto=format&fit=crop',
      photographer: 'Tanvir Hasan',
      region: 'Khulna',
      score: 88
    },
    {
      id: '6',
      imageUrl: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=800&auto=format&fit=crop',
      photographer: 'Ayesha Siddiqua',
      region: 'Barisal',
      score: 85
    },
    {
      id: '7',
      imageUrl: 'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?q=80&w=800&auto=format&fit=crop',
      photographer: 'Mahmudul Hoque',
      region: 'Comilla',
      score: 84
    }
  ];

  const getRankStyle = (rank?: number) => {
    switch (rank) {
      case 1:
        return 'ring-4 ring-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.3)]';
      case 2:
        return 'ring-4 ring-slate-300/50 shadow-[0_0_30px_rgba(203,213,225,0.3)]';
      case 3:
        return 'ring-4 ring-amber-700/50 shadow-[0_0_30px_rgba(180,83,9,0.3)]';
      default:
        return '';
    }
  };

  const getRankIcon = (rank?: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-slate-300 fill-slate-300" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-700 fill-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <PageHeader 
          title="Top Photos" 
          onBack={onBack}
        />

        {/* Top 3 Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1"
          >
             <div className="relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                   <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-300 flex items-center justify-center shadow-lg">
                      <span className="text-slate-300 font-bold">2</span>
                   </div>
                </div>
                <GlassCard className="p-0 overflow-hidden ring-4 ring-slate-300/30 shadow-[0_0_20px_rgba(203,213,225,0.2)]">
                  <div className="relative aspect-[3/4]">
                    <img 
                      src={topPhotos[1].imageUrl} 
                      alt="Second Place" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold truncate">{topPhotos[1].photographer}</p>
                      <p className="text-slate-300 text-xs">{topPhotos[1].region}</p>
                      <div className="mt-2 flex items-center justify-between">
                         <div className="px-2 py-1 rounded-md bg-slate-300/20 text-slate-200 text-xs font-bold">
                            {topPhotos[1].score} pts
                         </div>
                         <Heart className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
             </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-1 md:order-2 -mt-8 md:-mt-12 z-10"
          >
             <div className="relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                   <div className="w-14 h-14 rounded-full bg-yellow-900 border-2 border-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                      <Trophy className="w-7 h-7 text-yellow-400 fill-yellow-400" />
                   </div>
                </div>
                <GlassCard className="p-0 overflow-hidden ring-4 ring-yellow-400/50 shadow-[0_0_40px_rgba(250,204,21,0.3)] transform md:scale-110">
                  <div className="relative aspect-[3/4]">
                    <img 
                      src={topPhotos[0].imageUrl} 
                      alt="First Place" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-lg truncate">{topPhotos[0].photographer}</p>
                      <p className="text-yellow-200 text-sm">{topPhotos[0].region}</p>
                      <div className="mt-3 flex items-center justify-between">
                         <div className="px-3 py-1 rounded-md bg-yellow-500/20 text-yellow-300 text-sm font-bold border border-yellow-500/30">
                            {topPhotos[0].score} pts
                         </div>
                         <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
             </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="order-3"
          >
             <div className="relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                   <div className="w-10 h-10 rounded-full bg-amber-900 border border-amber-700 flex items-center justify-center shadow-lg">
                      <span className="text-amber-600 font-bold">3</span>
                   </div>
                </div>
                <GlassCard className="p-0 overflow-hidden ring-4 ring-amber-700/30 shadow-[0_0_20px_rgba(180,83,9,0.2)]">
                  <div className="relative aspect-[3/4]">
                    <img 
                      src={topPhotos[2].imageUrl} 
                      alt="Third Place" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold truncate">{topPhotos[2].photographer}</p>
                      <p className="text-amber-200 text-xs">{topPhotos[2].region}</p>
                      <div className="mt-2 flex items-center justify-between">
                         <div className="px-2 py-1 rounded-md bg-amber-700/20 text-amber-500 text-xs font-bold">
                            {topPhotos[2].score} pts
                         </div>
                         <Heart className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
             </div>
          </motion.div>
        </div>

        {/* Masonry Grid for Rest */}
        <ResponsiveMasonry
            columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}
        >
            <Masonry gutter="16px">
                {topPhotos.slice(3).map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                        <GlassCard className="p-0 overflow-hidden group cursor-pointer hover:ring-2 hover:ring-pink-500/50 transition-all">
                            <div className="relative">
                                <img 
                                    src={photo.imageUrl} 
                                    alt={photo.photographer}
                                    className="w-full h-auto block"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-xs font-bold truncate">{photo.photographer}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-[10px] text-blue-300">{photo.region}</span>
                                        <span className="text-[10px] font-bold text-pink-400">{photo.score} pts</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </Masonry>
        </ResponsiveMasonry>

      </div>
    </div>
  );
}
