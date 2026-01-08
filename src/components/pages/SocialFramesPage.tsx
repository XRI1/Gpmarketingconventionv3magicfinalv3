import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { 
  Camera, 
  Upload, 
  Download, 
  Share2, 
  RefreshCw, 
  Check, 
  ChevronRight, 
  UserPlus,
  Heart
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SocialFramesPageProps {
  onBack: () => void;
  onHome: () => void;
}

interface Frame {
  id: string;
  name: string;
  icon: any;
  overlay: string; // URL to transparent PNG frame
  color: string;
}

export function SocialFramesPage({ onBack, onHome }: SocialFramesPageProps) {
  const [step, setStep] = useState<'upload' | 'frame' | 'share'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<string>('tour-buddy');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock frames - normally these would be actual transparent PNGs
  // For this demo, we'll draw borders on the canvas to simulate frames
  const frames: Frame[] = [
    { 
      id: 'tour-buddy', 
      name: 'Best Tour Buddy', 
      icon: UserPlus, 
      overlay: '', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      id: 'best-moments', 
      name: 'Best Moments', 
      icon: Heart, 
      overlay: '', 
      color: 'from-pink-500 to-rose-500' 
    },
    { 
      id: 'gp-2025', 
      name: 'GP Marketing 2025', 
      icon: Check, 
      overlay: '', 
      color: 'from-purple-500 to-indigo-500' 
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setStep('frame');
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      // Set canvas dimensions to match image aspect ratio, but max width 1080
      const maxWidth = 1080;
      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw Frame Overlay
      const frameColor = frames.find(f => f.id === selectedFrame)?.color || 'from-white to-white';
      
      // Simulate frame drawing (since we don't have actual PNG assets)
      // Bottom Bar
      const gradient = ctx.createLinearGradient(0, canvas.height - 150, canvas.width, canvas.height);
      // Extract colors from tailwind class roughly (mocking for canvas)
      if (selectedFrame === 'tour-buddy') {
        gradient.addColorStop(0, '#3B82F6');
        gradient.addColorStop(1, '#06B6D4');
      } else if (selectedFrame === 'best-moments') {
        gradient.addColorStop(0, '#EC4899');
        gradient.addColorStop(1, '#F43F5E');
      } else {
        gradient.addColorStop(0, '#8B5CF6');
        gradient.addColorStop(1, '#6366F1');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

      // Text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      
      let text = 'GP Marketing Convention 2025';
      if (selectedFrame === 'tour-buddy') text = 'My Best Tour Buddy';
      if (selectedFrame === 'best-moments') text = 'Best Moments @ GP 2025';

      ctx.fillText(text, canvas.width / 2, canvas.height - 60);

      // Logo/Brand watermark
      ctx.font = '24px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText('Sea Pearl Beach Resort, Cox\'s Bazar', canvas.width / 2, canvas.height - 25);
      
      // Border
      ctx.lineWidth = 20;
      ctx.strokeStyle = 'white';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };
  };

  useEffect(() => {
    if (step === 'frame' || step === 'share') {
      // Small delay to ensure canvas is in DOM
      setTimeout(drawCanvas, 100);
    }
  }, [step, selectedImage, selectedFrame]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `gp-2025-${selectedFrame}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success('Image downloaded successfully!');
    }
  };

  const handleShare = () => {
    // Web Share API if available
    if (navigator.share && canvasRef.current) {
        canvasRef.current.toBlob(blob => {
            if (blob) {
                const file = new File([blob], 'shared-image.png', { type: 'image/png' });
                navigator.share({
                    title: 'GP Marketing Convention 2025',
                    text: 'Check out my moment from the event!',
                    files: [file]
                }).catch(console.error);
            }
        });
    } else {
        toast.success('Image saved to share!');
        handleDownload();
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20" style={{ background: '#0D1A2E' }}>
      <ParallaxBackground />
      
      <div className="max-w-2xl mx-auto z-10 relative">
        <PageHeader 
          title="Social Frames" 
          onBack={onBack}
          onHome={onHome}
        />

        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh]"
          >
            <GlassCard className="w-full text-center p-8">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Capture the Moment</h2>
              <p className="text-blue-200 mb-8">
                Upload a photo or take a selfie to add exclusive GP Marketing Convention 2025 frames.
              </p>
              
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A8E1] to-[#0078A0] text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Upload className="w-6 h-6" />
                Select Photo
              </button>
            </GlassCard>
          </motion.div>
        )}

        {(step === 'frame' || step === 'share') && (
          <div className="space-y-6">
            {/* Canvas Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20"
            >
              <canvas ref={canvasRef} className="w-full h-auto bg-black" />
            </motion.div>

            {/* Frame Selection */}
            {step === 'frame' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white mb-4 text-center">Choose a Frame</h3>
                <div className="grid grid-cols-3 gap-3">
                  {frames.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame.id)}
                      className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        selectedFrame === frame.id 
                          ? 'bg-white/20 border-cyan-400 scale-105' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${frame.color} flex items-center justify-center`}>
                        <frame.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white text-xs font-medium text-center">{frame.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={() => setStep('upload')}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20"
                  >
                    Change Photo
                  </button>
                  <button 
                    onClick={() => setStep('share')}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00A8E1] to-[#0078A0] text-white font-semibold shadow-lg"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Share Actions */}
            {step === 'share' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                <button 
                  onClick={handleDownload}
                  className="p-4 rounded-xl bg-white/10 border border-white/20 text-white flex flex-col items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  <Download className="w-6 h-6 text-cyan-400" />
                  <span>Save to Gallery</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="p-4 rounded-xl bg-white/10 border border-white/20 text-white flex flex-col items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-6 h-6 text-cyan-400" />
                  <span>Share Now</span>
                </button>
                <button 
                  onClick={() => setStep('frame')}
                  className="col-span-2 py-3 text-blue-200 text-sm hover:text-white"
                >
                  Edit Frame
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}