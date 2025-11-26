import React, { useState, useEffect } from 'react';
import { CLUB_MEMBERS } from '../constants'; // Keep as fallback/initial state if needed
import { Member } from '../types';
import MemberCard from './MemberCard';
import { Search, Loader2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200
    }
  }
};

const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/get-members');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error("Using fallback data due to:", err);
        setMembers(CLUB_MEMBERS); // Fallback to local data
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.businessHelp && member.businessHelp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="directory" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">Directorio de Socios</h2>
            <p className="text-slate-600">Conecta con los líderes de nuestra comunidad</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="relative w-full md:w-96"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 rounded-xl glass-panel text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all bg-white/50"
              placeholder="Buscar por nombre o profesión..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          </div>
        ) : filteredMembers.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredMembers.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <MemberCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 glass-panel rounded-2xl bg-white/50"
          >
            <p className="text-xl text-slate-500">No se encontraron socios que coincidan con tu búsqueda.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Directory;