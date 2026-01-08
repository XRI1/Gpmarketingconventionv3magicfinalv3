import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { 
  Image as ImageIcon, 
  Video, 
  Camera, 
  X, 
  Download, 
  Sparkles,
  Users,
  Star,
  TreePine,
  Award,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Heart
} from 'lucide-react';

interface GalleryPageProps {
  onBack: () => void;
  onHome: () => void;
}

type GalleryCategory = 'ai-you' | 'group' | 'highlights' | 'nature' | 'master' | 'video';

interface GalleryItem {
  id: number;
  type: 'photo' | 'video' | 'photobooth';
  category: GalleryCategory[];
  color: string;
  tags: string[];
  isMasterShot?: boolean;
}

export function GalleryPage({ onBack, onHome }: GalleryPageProps) {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Memories', icon: Sparkles },
    { id: 'ai-you', label: 'Your Photos', icon: UserCheck },
    { id: 'group', label: 'Group Photos', icon: Users },
    { id: 'highlights', label: 'Moments & Highlights', icon: Star },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'nature', label: 'Nature & Environment', icon: TreePine },
    { id: 'master', label: 'Master Shots', icon: Award },
  ];

  // Generate categorized gallery items
  const galleryItems: GalleryItem[] = Array.from({ length: 48 }, (_, i) => {
    const categories: GalleryCategory[] = [];
    const tags: string[] = [];
    
    // Distribute items across categories
    if (i % 8 === 0) {
      categories.push('ai-you');
      tags.push('You');
    }
    if (i % 6 === 0) {
      categories.push('group');
      tags.push('Group');
    }
    if (i % 7 === 0) {
      categories.push('highlights');
      tags.push('Highlight');
    }
    if (i % 9 === 0) {
      categories.push('nature');
      tags.push('Nature');
    }
    if (i % 10 === 0) {
      categories.push('master');
      tags.push('Master Shot');
    }
    if (i % 5 === 0) {
      categories.push('video');
      tags.push('Video');
    }

    // Default to highlights if no category
    if (categories.length === 0) {
      categories.push('highlights');
    }

    return {
      id: i + 1,
      type: categories.includes('video') ? 'video' : i % 3 === 0 ? 'photobooth' : 'photo',
      category: categories,
      color: [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-orange-500 to-red-500',
        'from-green-500 to-teal-500',
        'from-indigo-500 to-purple-500',
        'from-rose-500 to-pink-500',
        'from-amber-500 to-orange-500',
      ][i % 7],
      tags,
      isMasterShot: categories.includes('master'),
    };
  });

  const getFilteredItems = (categoryFilter: string): GalleryItem[] => {
    if (categoryFilter === 'all') return galleryItems;
    return galleryItems.filter(item => item.category.includes(categoryFilter as GalleryCategory));
  };

  const aiYouPhotos = getFilteredItems('ai-you');
  const groupPhotos = getFilteredItems('group');
  const highlightPhotos = getFilteredItems('highlights');
  const naturePhotos = getFilteredItems('nature');
  const masterPhotos = getFilteredItems('master');
  const videoItems = getFilteredItems('video');

  const displayItems = filter === 'all' ? null : getFilteredItems(filter);

  const selectedItem = galleryItems.find(i => i.id === selectedImage);
  const selectedIndex = galleryItems.findIndex(i => i.id === selectedImage);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedIndex === -1) return;
    const newIndex = direction === 'prev' 
      ? (selectedIndex - 1 + galleryItems.length) % galleryItems.length
      : (selectedIndex + 1) % galleryItems.length;
    setSelectedImage(galleryItems[newIndex].id);
  };

  const GalleryCard = ({ item, index, large = false }: { item: GalleryItem; index: number; large?: boolean }) => (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.02 }}
      className="break-inside-avoid"
    >
      <motion.div
        onClick={() => setSelectedImage(item.id)}
        className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
          large ? 'shadow-2xl shadow-cyan-500/20' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        style={{ 
          height: large ? `${Math.random() * 100 + 350}px` : `${Math.random() * 150 + 200}px`
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60`} />
        
        {/* Premium Glow for Master Shots */}
        {item.isMasterShot && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-400/20 animate-pulse" />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {item.type === 'video' ? (
            <Video className="w-12 h-12 text-white" />
          ) : item.type === 'photobooth' ? (
            <Camera className="w-12 h-12 text-white" />
          ) : (
            <ImageIcon className="w-12 h-12 text-white" />
          )}
        </div>

        {/* Type/Tag Badges - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {item.type === 'video' && (
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center gap-1">
              <Video className="w-4 h-4 text-white" />
            </div>
          )}
          {item.type === 'photobooth' && (
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center gap-1">
              <Camera className="w-4 h-4 text-white" />
            </div>
          )}
          {item.tags.includes('You') && (
            <div className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 backdrop-blur-sm flex items-center gap-1 text-xs text-white">
              <UserCheck className="w-3 h-3" />
            </div>
          )}
          {item.tags.includes('Group') && (
            <div className="px-2 py-1 rounded-full bg-purple-500/80 backdrop-blur-sm flex items-center gap-1">
              <Users className="w-4 h-4 text-white" />
            </div>
          )}
          {item.isMasterShot && (
            <div className="px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 backdrop-blur-sm flex items-center gap-1 text-xs text-white">
              <Award className="w-3 h-3" />
              <span>Premium</span>
            </div>
          )}
        </div>

        {/* Content placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${large ? 'w-20 h-20' : 'w-16 h-16'} rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center`}>
            {item.type === 'video' ? (
              <Video className={`${large ? 'w-10 h-10' : 'w-8 h-8'} text-white/50`} />
            ) : item.type === 'photobooth' ? (
              <Camera className={`${large ? 'w-10 h-10' : 'w-8 h-8'} text-white/50`} />
            ) : (
              <ImageIcon className={`${large ? 'w-10 h-10' : 'w-8 h-8'} text-white/50`} />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <div className="flex items-center gap-3 mb-4 mt-8">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-white">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-6xl mx-auto z-10 relative">
        <PageHeader 
          title="Your Event Memories" 
          subtitle="AI-curated photos & videos featuring you"
          onBack={onBack}
          onHome={onHome}
        />

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <GlassCard className="p-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    filter === filterOption.id
                      ? 'bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white shadow-lg'
                      : 'text-blue-200 hover:bg-white/10'
                  }`}
                >
                  <filterOption.icon className="w-4 h-4" />
                  {filterOption.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Filtered View (when specific filter is active) */}
        {filter !== 'all' && displayItems && (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {displayItems.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} large={item.isMasterShot} />
            ))}
          </motion.div>
        )}

        {/* Sectioned View (when "All Memories" is active) */}
        {filter === 'all' && (
          <div>
            {/* AI Matched Photos of You */}
            {aiYouPhotos.length > 0 && (
              <div>
                <SectionHeader icon={Sparkles} title="✨ AI Matched Photos of You" />
                <motion.div
                  layout
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mb-8"
                >
                  {aiYouPhotos.slice(0, 8).map((item, index) => (
                    <GalleryCard key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Group Photos */}
            {groupPhotos.length > 0 && (
              <div>
                <SectionHeader icon={Users} title="👥 Group Photos You're In" />
                <motion.div
                  layout
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mb-8"
                >
                  {groupPhotos.slice(0, 8).map((item, index) => (
                    <GalleryCard key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Event Highlights */}
            {highlightPhotos.length > 0 && (
              <div>
                <SectionHeader icon={Star} title="⭐ Event Highlights" />
                <motion.div
                  layout
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mb-8"
                >
                  {highlightPhotos.slice(0, 12).map((item, index) => (
                    <GalleryCard key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Nature & Environment */}
            {naturePhotos.length > 0 && (
              <div>
                <SectionHeader icon={TreePine} title="🌿 Venue & Nature Shots" />
                <motion.div
                  layout
                  className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mb-8"
                >
                  {naturePhotos.slice(0, 6).map((item, index) => (
                    <GalleryCard key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Master Shots */}
            {masterPhotos.length > 0 && (
              <div>
                <SectionHeader icon={Award} title="📸 Master Shots by Photographers" />
                <motion.div
                  layout
                  className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mb-8"
                >
                  {masterPhotos.slice(0, 6).map((item, index) => (
                    <GalleryCard key={item.id} item={item} index={index} large />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Event Videos */}
            {videoItems.length > 0 && (
              <div>
                <SectionHeader icon={Video} title="🎬 Event Videos" />
                <motion.div
                  layout
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
                >
                  {videoItems.slice(0, 8).map((item, index) => (
                    <GalleryCard key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {displayItems && displayItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-blue-200/50 mx-auto mb-4" />
              <p className="text-blue-200">No items in this category</p>
            </GlassCard>
          </motion.div>
        )}
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation Arrows */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full aspect-video rounded-2xl overflow-hidden relative"
            >
              <GlassCard neonBorder className="h-full relative group">
                <div className={`h-full bg-gradient-to-br ${selectedItem.color} flex items-center justify-center relative`}>
                  {selectedItem.type === 'video' ? (
                    <Video className="w-24 h-24 text-white/50" />
                  ) : (
                    <ImageIcon className="w-24 h-24 text-white/50" />
                  )}

                  {/* Tags Display */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-sm flex items-center gap-2"
                      >
                        {tag === 'You' && <UserCheck className="w-4 h-4" />}
                        {tag === 'Group' && <Users className="w-4 h-4" />}
                        {tag === 'Highlight' && <Star className="w-4 h-4" />}
                        {tag === 'Master Shot' && <Award className="w-4 h-4" />}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
                    <Heart className="w-4 h-4" />
                    Love
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white backdrop-blur-md transition-colors shadow-lg">
                    <Download className="w-4 h-4" />
                    Download High Res
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
