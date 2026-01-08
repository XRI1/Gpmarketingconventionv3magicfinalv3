import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { Camera, Check } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export function ProfileVerificationPage() {
  const [showCamera, setShowCamera] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const navigate = useNavigate();
  const { employeeId, setUserName } = useAppContext();
  
  // Mock data
  const userData = {
    name: 'Ahmed Rahman',
    employeeId: employeeId || 'GP123456',
    region: 'Dhaka Central',
    territory: 'Gulshan',
    designation: 'Senior Sales Executive'
  };

  const steps = [
    { id: 1, name: 'Profile', active: true },
    { id: 2, name: 'Photo', active: showCamera },
    { id: 3, name: 'NID', active: false },
    { id: 4, name: 'Complete', active: false },
  ];

  const handleCapturePhoto = () => {
    setShowCamera(true);
  };

  const handlePhotoTaken = () => {
    setPhotoTaken(true);
    setTimeout(() => {
      setUserName(userData.name);
      navigate('/nid');
    }, 1500);
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <ParallaxBackground />
      
      <div className="max-w-2xl mx-auto py-8 z-10 relative">
        {/* Progress Steps */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step.active 
                        ? 'bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white shadow-[0_0_20px_rgba(0,146,228,0.5)]' 
                        : 'bg-white/10 text-blue-200 border border-white/20'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {step.id}
                  </motion.div>
                  <span className={`mt-2 text-xs ${step.active ? 'text-white' : 'text-blue-200/60'}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 ${step.active ? 'bg-[#0092E4]' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {!showCamera ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard neonBorder>
              <h2 className="text-white mb-6 text-center">Welcome to GP Marketing Convention 2025</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-blue-200">Name</span>
                  <span className="text-white">{userData.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-blue-200">Employee ID</span>
                  <span className="text-white">{userData.employeeId}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-blue-200">Region</span>
                  <span className="text-white">{userData.region}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-blue-200">Territory</span>
                  <span className="text-white">{userData.territory}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-blue-200">Designation</span>
                  <span className="text-white">{userData.designation}</span>
                </div>
              </div>

              <motion.button
                onClick={handleCapturePhoto}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <Camera className="w-5 h-5" />
                  Capture Your Photo
                </span>
              </motion.button>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard neonBorder>
              <h2 className="text-white mb-6 text-center">Take Your Photo</h2>
              
              <div className="relative aspect-[3/4] max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Camera preview placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!photoTaken ? (
                    <div className="w-64 h-64 rounded-full border-4 border-[#0092E4] border-dashed flex items-center justify-center">
                      <Camera className="w-16 h-16 text-blue-200" />
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-full h-full bg-gradient-to-br from-[#0078D4]/20 to-[#0092E4]/20 flex items-center justify-center"
                    >
                      <Check className="w-24 h-24 text-green-400" />
                    </motion.div>
                  )}
                </div>
                
                {/* Grid overlay */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-white/10" />
                  ))}
                </div>
              </div>

              {!photoTaken ? (
                <motion.button
                  onClick={handlePhotoTaken}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">Capture</span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-green-400"
                >
                  Photo captured successfully! Processing...
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}