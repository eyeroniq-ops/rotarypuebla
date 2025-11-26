import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Eventos', href: '#events' },
    { name: 'Directorio', href: '#directory' },
    { name: 'Galería', href: '#gallery' },
  ];

  return (
    <nav className="fixed w-full z-50 py-4 flex justify-center">
      <motion.div 
        className={`w-[95%] md:w-[85%] max-w-6xl transition-all duration-500 ease-in-out ${
          scrolled ? 'glass-liquid rounded-full px-6 py-2 shadow-lg' : 'glass-liquid rounded-2xl px-8 py-4 bg-white/40 border-transparent shadow-none'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="flex justify-between items-center">
          
          {/* Logo Area */}
          <div className="flex items-center space-x-3">
             <img 
               src="/rtr.png" 
               alt="Rotary International" 
               className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-sm"
             />
             <div className="flex flex-col leading-none">
               <span className="text-lg font-bold tracking-wider text-slate-800">ROTARY</span>
               <span className="text-[10px] text-yellow-500 font-extrabold tracking-[0.2em] uppercase">Puebla Vivo</span>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-all rounded-full hover:bg-white/50"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#join"
              className="ml-4 px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:scale-105"
            >
              Unirse
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-white/50 text-slate-800 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-24 left-4 right-4 z-40"
        >
          <div className="glass-liquid rounded-2xl p-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-700 hover:text-blue-600 font-bold px-4 py-3 rounded-xl hover:bg-white/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
             <a 
                href="#join"
                className="text-center font-bold px-4 py-3 rounded-xl bg-blue-600 text-white shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Unirse al Club
              </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;