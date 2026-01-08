import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';

interface PhotoUploadPageProps {
  onBack: () => void;
  onHome: () => void;
  onNavigate: (page: string) => void;
}

type UploadStep = 'select' | 'preview' | 'submitting' | 'success';

export function PhotoUploadPage({ onBack, onHome, onNavigate }: PhotoUploadPageProps) {
  const [step, setStep] = useState<UploadStep>('select');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setStep('preview');
    }
  };

  const handleSubmit = () => {
    setStep('submitting');
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const tags = ['Beach', 'Team', 'Sunset', 'Adventure', 'Gala', 'Food'];

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        {step !== 'success' && (
          <PageHeader 
            title="Upload Photo" 
            onBack={step === 'preview' ? () => setStep('select') : onBack}
            onHome={onHome}
          />
        )}

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-[calc(100vh-150px)] flex flex-col"
            >
              <GlassCard className="flex-1 flex flex-col items-center justify-center border-dashed border-2 border-blue-400/30 bg-blue-900/10">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileSelect}
                />
                
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-6 animate-pulse">
                  <Camera className="w-10 h-10 text-pink-400" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Upload your masterpiece</h3>
                <p className="text-blue-200 text-center mb-8 max-w-xs">
                  Take a photo or select one from your gallery to enter the competition.
                </p>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    <Camera className="w-5 h-5" />
                    Take Photo / Gallery
                  </button>
                </div>

                <p className="mt-8 text-sm text-blue-300/60">
                  1/3 Submissions Used
                </p>
              </GlassCard>
            </motion.div>
          )}

          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard className="overflow-hidden p-0">
                <div className="relative aspect-[4/3] bg-black/40">
                  {selectedImage && (
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                  )}
                  <button 
                    onClick={() => {
                      setSelectedImage(null);
                      setStep('select');
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-blue-300 ml-1 mb-1 block">Title (Optional)</label>
                    <input 
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Sunset at the Beach"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-blue-300 ml-1 mb-1 block">Description (Optional)</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell us about this moment..."
                      rows={3}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-blue-300 ml-1 mb-2 block">Suggested Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <button 
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-blue-100 hover:bg-white/10 hover:border-pink-500/30 transition-all"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-emerald-900/20"
                  >
                    <Check className="w-5 h-5" />
                    Submit Photo
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === 'submitting' && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-900/80 backdrop-blur-sm"
            >
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
              <p className="text-white text-lg font-medium">Uploading...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6"
            >
              {/* Confetti effect using simple particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0,
                    opacity: 1,
                    backgroundColor: ['#FF0080', '#7928CA', '#FF0080'][i % 3]
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 400, 
                    y: (Math.random() - 0.5) * 400,
                    opacity: 0
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              ))}

              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <Check className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Success!</h2>
              <p className="text-blue-200 mb-8 max-w-xs">
                Your photo has been submitted successfully. Good luck!
              </p>

              <div className="w-full max-w-xs space-y-3">
                <button 
                  onClick={() => onNavigate('photo-submissions')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <ImageIcon className="w-5 h-5" />
                  View My Photos
                </button>
                
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-3.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium hover:bg-white/15 transition-all"
                >
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
