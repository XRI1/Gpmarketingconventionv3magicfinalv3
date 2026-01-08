import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { Footer } from '../Footer';
import { Upload, Camera, Check, Loader, Pencil } from 'lucide-react';

export function NIDUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleUpload = () => {
    setUploading(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      setExtractedData({
        nidNo: '1234567890123',
        dob: '15 Jan 1990',
        name: 'Ahmed Rahman'
      });
      setUploading(false);
      setUploaded(true);
    }, 2000);
  };

  const handleConfirm = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="max-w-2xl mx-auto py-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard neonBorder>
            <h2 className="text-white mb-6 text-center">Upload NID / Passport</h2>
            
            {!uploaded ? (
              <>
                <div className="mb-8">
                  <motion.div
                    className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center cursor-pointer hover:border-[#0092E4] transition-colors"
                    whileHover={{ scale: 1.01 }}
                    onClick={handleUpload}
                  >
                    {uploading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader className="w-16 h-16 text-[#0092E4] mx-auto mb-4" />
                      </motion.div>
                    ) : (
                      <Upload className="w-16 h-16 text-blue-200 mx-auto mb-4" />
                    )}
                    <p className="text-white mb-2">
                      {uploading ? 'Processing...' : 'Drop your NID here or click to upload'}
                    </p>
                    <p className="text-blue-200 text-sm">
                      Supports JPG, PNG, PDF
                    </p>
                  </motion.div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleUpload}
                    className="flex-1 py-3 rounded-xl bg-white/10 border border-white/30 text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Upload className="w-5 h-5" />
                    Upload File
                  </motion.button>
                  <motion.button
                    onClick={handleUpload}
                    className="flex-1 py-3 rounded-xl bg-white/10 border border-white/30 text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera className="w-5 h-5" />
                    Capture
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-6 p-6 rounded-xl bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Check className="w-6 h-6 text-green-400" />
                    <span className="text-green-400">NID Scanned Successfully</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <motion.div
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">NID Number</span>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={extractedData?.nidNo}
                            onChange={(e) =>
                              setExtractedData({ ...extractedData, nidNo: e.target.value })
                            }
                            className="bg-transparent border-b border-white text-white focus:outline-none w-40"
                            autoFocus
                          />
                          <button onClick={() => setIsEditing(false)} className="text-green-400">
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-white">{extractedData?.nidNo}</span>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-200 hover:text-white transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  onClick={handleConfirm}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    Save & Continue
                    <Check className="w-5 h-5" />
                  </span>
                </motion.button>
              </motion.div>
            )}
          </GlassCard>
          
          <div className="mt-8">
            <Footer />
          </div>
        </motion.div>
      </div>
    </div>
  );
}