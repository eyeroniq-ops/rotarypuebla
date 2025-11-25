import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Main Blue Orb - Top Right - Soft and large */}
      <motion.div 
        className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-600/20 blur-[100px]"
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />

      {/* Secondary Sky Orb - Bottom Left - Lighter blue */}
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-sky-500/20 blur-[120px]"
        animate={{
          y: [0, -60, 0],
          x: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />

      {/* Third Blue Accent - Floating Middle */}
      <motion.div 
        className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-400/15 blur-[90px]"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.2, 1],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'opacity, transform' }}
      />
      
      {/* Subtle Texture for "Paper" feel */}
      <div className="absolute inset-0 opacity-[0.25] bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-multiply pointer-events-none"></div>
    </div>
  );
};

export default Background;