import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import gpLogo from 'figma:asset/ba0475f150d991038bef3e4771a910127f1b18fb.png';

interface ParallaxBackgroundProps {
  variant?: 'default' | 'light' | 'waves' | 'conference';
}

export function ParallaxBackground({ variant = 'default' }: ParallaxBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grameenphone gradient background - vibrant cyan to deeper blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E1] via-[#0092E4] to-[#0078D4]" />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#00A8E1]/40 via-transparent to-white/10"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* GP Logo watermark pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url(${gpLogo})`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      />

      {/* Parallax waves - GP themed */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      >
        <svg className="absolute w-full h-full opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <motion.path
            d="M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z"
            fill="url(#gp-wave-gradient-1)"
            animate={{
              d: [
                "M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z",
                "M0,400 Q360,500 720,400 T1440,400 L1440,800 L0,800 Z",
                "M0,400 Q360,300 720,400 T1440,400 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="gp-wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00A8E1" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute w-full h-full opacity-15" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <motion.path
            d="M0,500 Q360,400 720,500 T1440,500 L1440,800 L0,800 Z"
            fill="url(#gp-wave-gradient-2)"
            animate={{
              d: [
                "M0,500 Q360,400 720,500 T1440,500 L1440,800 L0,800 Z",
                "M0,500 Q360,600 720,500 T1440,500 L1440,800 L0,800 Z",
                "M0,500 Q360,400 720,500 T1440,500 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <defs>
            <linearGradient id="gp-wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0092E4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating particles - white for contrast */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 0.2,
          y: mousePosition.y * 0.2,
        }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Digital grid - subtle */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* GP Cyan glow spots */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00A8E1]/30 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle GP petal shapes floating */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-64 h-64 opacity-5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img src={gpLogo} alt="" className="w-full h-full object-contain" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-48 h-48 opacity-5"
        animate={{
          rotate: [360, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <img src={gpLogo} alt="" className="w-full h-full object-contain" />
      </motion.div>
    </div>
  );
}
