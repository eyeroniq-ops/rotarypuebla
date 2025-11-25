import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">
      {/* 1. Deep Blue - Top Right - Dominant */}
      <motion.div 
        className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-700/20 blur-[100px]"
        animate={{
          y: [0, 50, 0],
          x: [0, -40, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />

      {/* 2. Cyan/Teal - Bottom Left - Vibrant */}
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{
          y: [0, -60, 0],
          x: [0, 50, 0],
          scale: [1, 1.15, 1],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />

      {/* 3. Violet/Purple - Middle/Left - Contrast */}
      <motion.div 
        className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-violet-500/15 blur-[90px]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.25, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'opacity, transform' }}
      />
      
      {/* 4. Indigo - Bottom Right - Depth */}
      <motion.div 
        className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-indigo-600/15 blur-[80px]"
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />

      {/* 5. Subtle Gold Hint - Top Left - Warmth/Contrast */}
      <motion.div 
        className="absolute top-[15%] left-[5%] w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] rounded-full bg-amber-400/10 blur-[70px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'opacity, transform' }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.35] bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-multiply pointer-events-none"></div>
    </div>
  );
};

export default Background;