
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CADETS as INITIAL_CADETS } from '../constants';
import { Instagram, Linkedin, Search, Edit3, X, Save, Camera, User, Lock, ShieldCheck, Quote } from 'lucide-react';
import { Cadet } from '../types';

const CadetCard = ({ 
  cadet, 
  isEditMode, 
  onEdit 
}: { 
  cadet: Cadet; 
  isEditMode: boolean; 
  onEdit: (cadet: Cadet) => void 
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={`relative aspect-[4/5] rounded-lg overflow-hidden glass-card group cursor-pointer ${isEditMode ? 'ring-1 ring-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]' : ''}`}
      onClick={() => isEditMode && onEdit(cadet)}
    >
      <img 
        src={cadet.image} 
        alt={cadet.name} 
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f27] via-transparent to-transparent opacity-80" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      {isEditMode && (
        <div className="absolute inset-0 bg-[#d4af37]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <div className="bg-[#d4af37] text-[#0a0f27] px-4 py-2 font-bebas tracking-widest text-xs flex items-center gap-2 rounded-sm shadow-xl">
            <Edit3 className="w-3 h-3" /> EDIT PROFILE
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className="text-[9px] text-[#d4af37] font-bebas tracking-widest mb-1">{cadet.role}</p>
        <h4 className="text-sm font-bold text-white tracking-wide uppercase leading-tight mb-1">{cadet.name}</h4>
        <p className="text-[10px] text-white/40 italic line-clamp-2 leading-relaxed">&quot;{cadet.quote}&quot;</p>
        
        {!isEditMode && (
          <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
            <Instagram className="w-3.5 h-3.5 text-white/70 hover:text-[#d4af37]" />
            <Linkedin className="w-3.5 h-3.5 text-white/70 hover:text-[#d4af37]" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const EditModal = ({ 
  cadet, 
  onClose, 
  onSave 
}: { 
  cadet: Cadet; 
  onClose: () => void; 
  onSave: (updated: Cadet) => void 
}) => {
  const [formData, setFormData] = useState<Cadet>({ ...cadet });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0a0f27]/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg glass-card p-8 relative border-[#d4af37]/30 max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-3xl font-bebas text-[#d4af37] mb-8 tracking-widest">PROFILE CUSTOMIZATION</h3>

        <div className="space-y-6">
          <div className="relative">
            <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">FULL NAME</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#d4af37] transition-colors" />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">ASSIGNED ROLE</label>
            <input 
              type="text" 
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-6 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>

          <div className="relative">
            <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">PERSONAL QUOTE</label>
            <div className="relative group">
              <Quote className="absolute left-4 top-4 w-4 h-4 text-white/20 group-focus-within:text-[#d4af37] transition-colors" />
              <textarea 
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-all resize-none italic"
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">IMAGE URL / DATABASE PATH</label>
            <div className="relative group">
              <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#d4af37] transition-colors" />
              <input 
                type="text" 
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => onSave(formData)}
              className="w-full py-4 bg-[#d4af37] text-[#0a0f27] font-bebas tracking-[0.3em] font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              COMMIT CHANGES
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CadetGrid: React.FC<{ isEditMode: boolean }> = ({ isEditMode }) => {
  const [filter, setFilter] = useState('');
  const [cadets, setCadets] = useState<Cadet[]>(INITIAL_CADETS);
  const [editingCadet, setEditingCadet] = useState<Cadet | null>(null);
  
  const filteredCadets = cadets.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase()) || 
    c.role.toLowerCase().includes(filter.toLowerCase())
  );

  const handleUpdateCadet = (updated: Cadet) => {
    setCadets(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditingCadet(null);
  };

  return (
    <section id="cadets" className="py-24 px-6 bg-[#0a0f27] min-h-screen relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bebas text-[#d4af37] mb-2 tracking-tight">THE 67 NAVIGATORS</h2>
            <div className="h-1 w-32 bg-[#d4af37]" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37] opacity-50 group-focus-within:opacity-100" />
              <input 
                type="text" 
                placeholder="SEARCH COORDINATES..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
            </div>
            
            {isEditMode && (
                <div className="flex items-center gap-2 px-6 py-3 bg-[#d4af37]/10 border border-[#d4af37] rounded-full text-[#d4af37] font-bebas text-xs tracking-widest animate-pulse">
                    <ShieldCheck className="w-4 h-4" /> COMMAND OVERRIDE ACTIVE
                </div>
            )}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
        >
          <AnimatePresence>
            {filteredCadets.map((cadet) => (
              <CadetCard 
                key={cadet.id} 
                cadet={cadet} 
                isEditMode={isEditMode}
                onEdit={(c) => setEditingCadet(c)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredCadets.length === 0 && (
          <div className="text-center py-20 text-white/30 italic font-light">
            No cadets found in current search coordinates.
          </div>
        )}
      </div>

      <AnimatePresence>
        {editingCadet && (
          <EditModal 
            cadet={editingCadet} 
            onClose={() => setEditingCadet(null)} 
            onSave={handleUpdateCadet} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CadetGrid;
