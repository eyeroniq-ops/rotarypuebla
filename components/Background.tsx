import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">
      {/* 1. Deep Blue - Top Right - Dominant */}
      <motion.div 
        className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-600/30 blur-[100px]"
        animate={{
          y: [0, 100, 0],
          x: [0, -80, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 20, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 2. Cyan/Teal - Bottom Left - Vibrant */}
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-cyan-400/25 blur-[120px]"
        animate={{
          y: [0, -100, 0],
          x: [0, 80, 0],
          scale: [1, 1.4, 1],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 3. Violet/Purple - Middle/Left - Contrast */}
      <motion.div 
        className="absolute top-[30%] left-[10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-violet-600/20 blur-[90px]"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.35, 1],
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* 4. Indigo - Bottom Right - Depth */}
      <motion.div 
        className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-indigo-600/20 blur-[80px]"
        animate={{
          y: [0, -60, 0],
          x: [0, -40, 0],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 5. Gold/Amber - Top Left - Warmth Highlight */}
      <motion.div 
        className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-amber-400/20 blur-[70px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 40, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.3] bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-multiply pointer-events-none"></div>
    </div>
  );
};

export default Background;