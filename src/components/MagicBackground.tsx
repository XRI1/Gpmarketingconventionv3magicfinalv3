import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import wandImage from 'figma:asset/0968f5b476c144ffca3bdea132b385d2f35385e8.png';
import magicianImage from 'figma:asset/5f375b03cf342c0c1929350686f9e2bb868e37cc.png';
import lampImage from 'figma:asset/5dc5e608900d2386d45cd80d9f0c85dc57d62d92.png';

export function MagicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0514]">
      {/* Deep Mystical Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a103c] via-[#0f0824] to-[#050210]" />
      
      {/* Animated Fog/Smoke Gradients */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Floating Particles/Dust */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-200/40 blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Parallax Layers with Images */}
      
      {/* Layer 1: Magician (Background/Side) */}
      <motion.div
        className="absolute top-0 right-[-10%] w-[50vh] h-[50vh] opacity-40 mix-blend-screen pointer-events-none"
        style={{
          y: y1,
          x: mousePosition.x * -1,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <img src={magicianImage} alt="" className="w-full h-full object-contain" />
      </motion.div>

      {/* Layer 2: Lamp (Bottom Left) */}
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[40vh] h-[40vh] opacity-60 mix-blend-screen pointer-events-none"
        style={{
          y: y2,
          x: mousePosition.x * 2,
        }}
      >
        <img src={lampImage} alt="" className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.4)]" />
        {/* Magic smoke rising from lamp */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200%] bg-gradient-to-t from-purple-500/20 to-transparent blur-xl -z-10" />
      </motion.div>

      {/* Layer 3: Wand (Foreground Top Left/Center) */}
      <motion.div
        className="absolute top-[-5%] left-[-5%] w-[45vh] h-[45vh] opacity-50 mix-blend-screen pointer-events-none"
        style={{
          y: y3,
          x: mousePosition.x * 1.5,
          rotate: mousePosition.x * 0.5,
        }}
      >
        <img src={wandImage} alt="" className="w-full h-full object-contain" />
      </motion.div>

      {/* Light Trails / Optical Flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-sm rotate-45" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm -rotate-45" />

    </div>
  );
}
