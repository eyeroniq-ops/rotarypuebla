import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`glass-panel rounded-2xl px-6 py-3 flex justify-between items-center transition-all duration-300 ${scrolled ? 'shadow-md bg-white/80' : ''}`}>
          
          {/* Logo Area */}
          <div className="flex items-center space-x-2">
             <Globe className="w-8 h-8 text-blue-700 animate-pulse-slow" />
             <div className="flex flex-col">
               <span className="text-lg font-bold tracking-wider text-slate-800">ROTARY</span>
               <span className="text-xs text-yellow-500 font-bold tracking-widest">PUEBLA VIVO</span>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors uppercase tracking-wide relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 focus:outline-none">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-4 mt-2">
          <div className="glass-panel rounded-2xl p-4 flex flex-col space-y-4 bg-white/95">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-700 hover:text-blue-600 font-bold py-2 border-b border-slate-200 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;