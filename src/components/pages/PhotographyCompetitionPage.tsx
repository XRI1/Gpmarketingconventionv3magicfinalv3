import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Heart, Upload, Trophy, ArrowLeft, BookOpen, ChevronDown, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import Masonry from 'react-responsive-masonry';

interface PhotographyCompetitionPageProps {
  onBack: () => void;
  onHome: () => void;
  onNavigate: (page: string) => void;
}

// Mock photo data
const mockPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500', photographer: 'Sarah Ahmed', loves: 142, height: 300 },
  { id: 2, url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500', photographer: 'Karim Hassan', loves: 238, height: 400 },
  { id: 3, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500', photographer: 'Fatima Khan', loves: 195, height: 350 },
  { id: 4, url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500', photographer: 'Ali Rahman', loves: 167, height: 320 },
  { id: 5, url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500', photographer: 'Nadia Islam', loves: 289, height: 380 },
  { id: 6, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500', photographer: 'Rashed Khan', loves: 156, height: 300 },
  { id: 7, url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500', photographer: 'Ayesha Begum', loves: 203, height: 350 },
  { id: 8, url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500', photographer: 'Imran Hossain', loves: 178, height: 400 },
  { id: 9, url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500', photographer: 'Zara Malik', loves: 221, height: 320 },
];

export function PhotographyCompetitionPage({ onBack, onHome }: PhotographyCompetitionPageProps) {
  const [dragActive, setDragActive] = useState(false);
  const [lovedPhotos, setLovedPhotos] = useState<Set<number>>(new Set());
  const [showRules, setShowRules] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Get top 3 loved photos
  const topPhotos = [...mockPhotos].sort((a, b) => b.loves - a.loves).slice(0, 3);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload here
      console.log('File dropped:', e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('File selected:', e.target.files[0]);
    }
  };

  const toggleLove = (photoId: number) => {
    setLovedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  const loadMore = () => {
    setVisiblePhotos(prev => Math.min(prev + 6, mockPhotos.length));
  };

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % mockPhotos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + mockPhotos.length) % mockPhotos.length);
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20" style={{ background: '#0D1A2E' }}>
      <ParallaxBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-4 z-50 mb-6"
        >
          <GlassCard className="py-4 px-4 backdrop-blur-xl bg-slate-900/80">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-white truncate">Photography Competition</h1>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-4">
            <Camera className="w-10 h-10 text-transparent bg-gradient-to-br from-pink-400 to-purple-400 bg-clip-text" style={{ 
              filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))'
            }}>
              <Camera className="w-10 h-10" style={{
                stroke: 'url(#camera-gradient)'
              }} />
            </Camera>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="camera-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="text-white mb-2">Photography Competition</h2>
          <p className="text-blue-200/80">Share your best shot. Explore & love others&apos; photos.</p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <GlassCard 
            className={`relative overflow-hidden transition-all duration-300 ${
              dragActive ? 'border-pink-400/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]' : 'border-white/10'
            }`}
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className="relative"
            >
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 mb-4">
                  <Upload className="w-8 h-8" style={{
                    stroke: 'url(#upload-gradient)'
                  }} />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="upload-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <h3 className="text-white mb-2">Upload Your Photo</h3>
                <p className="text-blue-200/70 text-sm mb-6">Drag and drop your image here, or click to browse</p>
                
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/jpeg,image/png"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-900/50"
                >
                  Upload Your Photo
                </label>
                
                <p className="text-blue-200/50 text-xs mt-4">
                  Accepted formats: JPG, PNG | Max 10MB
                </p>
              </div>
              
              {dragActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-pink-400/50 rounded-2xl">
                  <p className="text-pink-300">Drop your photo here</p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Top Loved Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white">Top Loved Photos</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-pink-400/30 transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(236,72,153,0.2)]"
              >
                <div className="absolute top-3 left-3 z-10">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm flex items-center gap-1 text-xs text-white">
                    <Award className="w-3 h-3" />
                    Top Loved
                  </div>
                </div>
                
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={`Photo by ${photo.photographer}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm mb-2">{photo.photographer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
                      <span className="text-white">{photo.loves}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competition Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">All Submissions</h3>
            <p className="text-blue-200/50 text-sm">{mockPhotos.length} photos</p>
          </div>

          <Masonry columnsCount={3} gutter="16px" className="masonry-grid">
            {mockPhotos.slice(0, visiblePhotos).map((photo, index) => (
              <motion.div
                key={photo.id}
                onClick={() => handlePhotoClick(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(168,85,247,0.2)] cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={`Photo by ${photo.photographer}`}
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                    style={{ display: 'block' }}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:bg-none md:pt-4 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm mb-3">{photo.photographer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                      <Heart className={`w-5 h-5 ${lovedPhotos.has(photo.id) ? 'fill-pink-400 text-pink-400' : 'text-white/70'}`} />
                      <span className="text-sm">{photo.loves + (lovedPhotos.has(photo.id) ? 1 : 0)}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLove(photo.id);
                      }}
                      className={`px-4 py-1.5 rounded-full transition-all text-sm ${
                        lovedPhotos.has(photo.id)
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {lovedPhotos.has(photo.id) ? 'Loved' : 'Love'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>

          {/* Load More Button */}
          {visiblePhotos < mockPhotos.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8"
            >
              <button
                onClick={loadMore}
                className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 mx-auto"
              >
                Load More Photos
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4 pb-8"
        >
          <button
            onClick={() => setShowRules(!showRules)}
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-blue-200 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            Rules
          </button>
          
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white hover:from-blue-600 hover:to-cyan-600 transition-all text-sm"
          >
            Back to Main Menu
          </button>
        </motion.div>

        {/* Rules Modal */}
        <AnimatePresence>
          {showRules && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowRules(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-md w-full"
              >
                <GlassCard className="border-pink-500/20">
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-pink-400" />
                    Competition Rules
                  </h3>
                  <div className="space-y-3 text-sm text-blue-200">
                    <p>• Maximum 3 photos per participant</p>
                    <p>• Photos must be original and taken during the event</p>
                    <p>• Accepted formats: JPG, PNG (Max 10MB each)</p>
                  </div>
                  <button
                    onClick={() => setShowRules(false)}
                    className="w-full mt-6 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:scale-105 active:scale-95 transition-all"
                  >
                    Got it!
                  </button>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <button 
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[101]"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[101]"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[101]"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-5xl w-full max-h-screen p-4 flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                 <img 
                   src={mockPhotos[selectedPhotoIndex].url} 
                   alt={mockPhotos[selectedPhotoIndex].photographer}
                   className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
                 />
                 <div className="mt-4 flex items-center gap-3">
                   <div className="flex items-center gap-4 text-white bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
                     <span className="font-medium">{mockPhotos[selectedPhotoIndex].photographer}</span>
                     <div className="w-1 h-1 bg-white/50 rounded-full" />
                     <div className="flex items-center gap-1">
                       <Heart className={`w-4 h-4 ${lovedPhotos.has(mockPhotos[selectedPhotoIndex].id) ? 'text-pink-500 fill-pink-500' : 'text-white/70'}`} />
                       <span>{mockPhotos[selectedPhotoIndex].loves + (lovedPhotos.has(mockPhotos[selectedPhotoIndex].id) ? 1 : 0)}</span>
                     </div>
                   </div>
                   
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       toggleLove(mockPhotos[selectedPhotoIndex].id);
                     }}
                     className={`px-6 py-2 rounded-full transition-all font-medium ${
                       lovedPhotos.has(mockPhotos[selectedPhotoIndex].id)
                         ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                         : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                     }`}
                   >
                     {lovedPhotos.has(mockPhotos[selectedPhotoIndex].id) ? 'Loved' : 'Love'}
                   </button>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}