import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { Camera, Download, Share2, Sparkles, Grid3x3, Info, Upload, ArrowRight, RefreshCw, Check } from 'lucide-react';

interface AIPhotoboothPageProps {
  onBack: () => void;
  onHome: () => void;
}

export function AIPhotoboothPage({ onBack, onHome }: AIPhotoboothPageProps) {
  const [step, setStep] = useState<'capture' | 'theme' | 'result'>('capture');
  const [selectedFrame, setSelectedFrame] = useState(1);
  const [showGallery, setShowGallery] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const frames = [
    { id: 1, name: 'GP Blue', color: 'from-[#0078D4] to-[#0092E4]' },
    { id: 2, name: 'Golden', color: 'from-yellow-500 to-orange-500' },
    { id: 3, name: 'Emerald', color: 'from-green-500 to-teal-500' },
    { id: 4, name: 'Purple', color: 'from-purple-500 to-pink-500' },
  ];

  const galleryPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleCapture = () => {
    // Mock capture delay
    setStep('theme');
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStep('theme');
    }
  };

  const handleMagic = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('result');
    }, 2500);
  };

  const handleReset = () => {
    setStep('capture');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleUpload}
      />
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <PageHeader 
          title="AR Photobooth" 
          onBack={onBack}
          onHome={onHome}
          rightContent={
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
              title={showGallery ? "Switch to Camera" : "View Gallery"}
            >
              {showGallery ? <Camera className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
            </button>
          }
        />

        <AnimatePresence mode="wait">
          {!showGallery ? (
            <motion.div
              key="camera-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Instructions Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 justify-center text-blue-200 text-sm bg-blue-900/20 p-2 rounded-lg border border-blue-500/20"
              >
                <Info className="w-4 h-4" />
                <span>
                  {step === 'capture' && "Take a selfie or upload a photo to start"}
                  {step === 'theme' && "Select a frame style for your photo"}
                  {step === 'result' && "Your AI-enhanced photo is ready!"}
                </span>
              </motion.div>

              {/* Main Display Area */}
              <motion.div
                layout
                className="mb-6"
              >
                <GlassCard neonBorder={step === 'result'}>
                  <div className="aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 relative">
                    
                    {/* Placeholder / Image Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {step === 'capture' ? (
                        <div className="flex flex-col items-center gap-4 text-blue-200/50">
                          <Camera className="w-16 h-16 animate-pulse" />
                          <span className="text-sm">Camera Preview</span>
                        </div>
                      ) : (
                        <div className="relative w-full h-full bg-slate-800">
                          {/* Mock Captured Image */}
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-700/50">
                             {/* User Avatar Placeholder */}
                             <div className="w-32 h-32 rounded-full bg-blue-100/10 flex items-center justify-center">
                               <span className="text-4xl">👤</span>
                             </div>
                          </div>

                          {/* Processing Overlay */}
                          {isProcessing && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
                            >
                              <Sparkles className="w-16 h-16 text-yellow-400 animate-spin mb-4" />
                              <span className="text-white font-medium animate-pulse">Applying AI Magic...</span>
                            </motion.div>
                          )}

                          {/* Result Sparkles */}
                          {step === 'result' && (
                             <motion.div
                               initial={{ opacity: 0, scale: 1.5 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ duration: 0.5 }}
                               className="absolute inset-0 pointer-events-none"
                             >
                               <div className="absolute top-10 right-10"><Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" /></div>
                               <div className="absolute bottom-20 left-10"><Sparkles className="w-4 h-4 text-blue-400 animate-pulse" /></div>
                             </motion.div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Frame overlay - Always visible in theme/result, hidden in capture unless we want a preview */}
                    {step !== 'capture' && (
                      <div className={`absolute inset-0 border-[12px] rounded-2xl bg-gradient-to-br ${frames.find(f => f.id === selectedFrame)?.color} opacity-80 pointer-events-none`} />
                    )}
                    
                    {/* Event branding - Visible in Theme/Result */}
                    {step !== 'capture' && (
                      <>
                        <div className="absolute top-4 left-4 right-4 z-10">
                          <div className="text-white text-center text-sm p-2 bg-black/50 rounded-lg backdrop-blur-sm">
                            GP Marketing Convention 2026
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 z-10">
                          <div className="text-white text-center text-xs p-2 bg-black/50 rounded-lg backdrop-blur-sm">
                            Sea Pearl Royal Tulip • Cox's Bazar
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Controls Area */}
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Step 1: Capture Controls */}
                {step === 'capture' && (
                  <GlassCard>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleCapture}
                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white flex items-center justify-center gap-2 font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Camera className="w-5 h-5" />
                        Capture Photo
                      </motion.button>
                      <motion.button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-4 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload className="w-5 h-5" />
                        Upload
                      </motion.button>
                    </div>
                  </GlassCard>
                )}

                {/* Step 2: Theme Selection */}
                {step === 'theme' && (
                  <div className="space-y-4">
                    <GlassCard>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">Select Theme</h3>
                        <span className="text-xs text-blue-200">{frames.find(f => f.id === selectedFrame)?.name}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {frames.map((frame) => (
                          <motion.button
                            key={frame.id}
                            onClick={() => setSelectedFrame(frame.id)}
                            className={`aspect-square rounded-xl bg-gradient-to-br ${frame.color} p-1 relative ${
                              selectedFrame === frame.id ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'opacity-70 hover:opacity-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {selectedFrame === frame.id && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                                <Check className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </GlassCard>

                    <GlassCard>
                      <div className="flex gap-3">
                        <motion.button
                          onClick={handleReset}
                          className="px-4 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RefreshCw className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          onClick={handleMagic}
                          disabled={isProcessing}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center gap-2 font-medium relative overflow-hidden group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          <Sparkles className="w-5 h-5" />
                          See the Magic
                        </motion.button>
                      </div>
                    </GlassCard>
                  </div>
                )}

                {/* Step 3: Result Actions */}
                {step === 'result' && (
                  <GlassCard>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <motion.button
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white flex items-center justify-center gap-2 font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Download className="w-5 h-5" />
                          Save Photo
                        </motion.button>
                        <motion.button
                          className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Share2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={handleReset}
                        className="w-full py-3 rounded-xl text-blue-200 hover:text-white hover:bg-white/5 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        Take Another Photo
                      </motion.button>
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard>
                <h2 className="text-white mb-4 flex items-center gap-2">
                  <Grid3x3 className="w-5 h-5 text-[#0092E4]" />
                  Your Gallery
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {galleryPhotos.map((photo, index) => (
                    <motion.div
                      key={photo}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer hover:ring-2 hover:ring-[#0092E4] transition-all group relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-blue-200/50 group-hover:text-blue-200 transition-colors" />
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Download className="w-5 h-5 text-white" />
                        <Share2 className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
