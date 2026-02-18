
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_MEMORIES } from '../constants';
import { Memory } from '../types';
import { Camera, Edit3, Plus, X, Calendar, Type, ChevronLeft, ChevronRight } from 'lucide-react';

const MemoryCard = ({ 
  memory, 
  isEditMode, 
  onEdit 
}: { 
  memory: Memory; 
  isEditMode: boolean; 
  onEdit: (m: Memory) => void 
}) => {
  return (
    <motion.div
      layout
      whileHover={{ 
        scale: 1.05, 
        zIndex: 50,
        boxShadow: "0 20px 40px rgba(0,0,0,0.8)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex-shrink-0 w-[300px] md:w-[500px] aspect-video relative rounded-lg overflow-hidden group cursor-pointer bg-black/20 snap-start"
      onClick={() => isEditMode && onEdit(memory)}
    >
      <img 
        src={memory.image} 
        alt={memory.title} 
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[10px] text-[#d4af37] font-bebas tracking-[0.2em] mb-1">{memory.date}</p>
        <h4 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight uppercase tracking-wide">{memory.title}</h4>
        <p className="text-white/60 text-xs md:text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{memory.description}</p>
      </div>

      {isEditMode && (
        <div className="absolute inset-0 bg-[#d4af37]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="bg-[#d4af37] text-[#0a0f27] px-4 py-2 font-bebas tracking-widest text-xs flex items-center gap-2 rounded-sm shadow-xl">
            <Edit3 className="w-4 h-4" /> MODIFY MEMORY
          </div>
        </div>
      )}
    </motion.div>
  );
};

const EditMemoryModal = ({ 
  memory, 
  onClose, 
  onSave 
}: { 
  memory: Memory; 
  onClose: () => void; 
  onSave: (m: Memory) => void 
}) => {
  const [formData, setFormData] = useState<Memory>({ ...memory });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#0a0f27]/95 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg glass-card p-8 relative border-[#d4af37]/30"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
        <h3 className="text-3xl font-bebas text-[#d4af37] mb-8 tracking-widest">NAVIGATOR'S LOG ENTRY</h3>

        <div className="space-y-6">
          <div className="relative">
            <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">ENTRY TITLE</label>
            <div className="relative group">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#d4af37]" />
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">DESCRIPTION / FOOTNOTE</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-6 text-sm text-white focus:outline-none focus:border-[#d4af37] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">DATE OF EVENT</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#d4af37]" />
                <input 
                  type="text" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. OCT 2025"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-bebas tracking-[0.2em] text-[#d4af37] mb-2 block">VISUAL SOURCE</label>
              <div className="relative group">
                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#d4af37]" />
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => onSave(formData)}
            className="w-full py-4 bg-[#d4af37] text-[#0a0f27] font-bebas tracking-[0.3em] font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all mt-4"
          >
            ARCHIVE ENTRY
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MemoryLibrary: React.FC<{ isEditMode: boolean }> = ({ isEditMode }) => {
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleUpdateMemory = (updated: Memory) => {
    setMemories(prev => prev.map(m => m.id === updated.id ? updated : m));
    setEditingMemory(null);
  };

  const handleAddMemory = () => {
    const newMemory: Memory = {
      id: Date.now(),
      title: "NEW DISCOVERY",
      description: "A new story added to the batch chronicles.",
      image: "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=1200",
      date: "NEW ENTRY"
    };
    setMemories([newMemory, ...memories]);
    setEditingMemory(newMemory);
  };

  return (
    <section id="memories" className="py-32 bg-[#0a0f27] relative overflow-hidden">
      {/* Decorative background label */}
      <div className="absolute top-0 left-0 w-full flex justify-center opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[15rem] font-bebas leading-none whitespace-nowrap">CHRONICLES • CHRONICLES</h2>
      </div>

      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-bebas text-white mb-2 tracking-tight uppercase">MEMORY LIBRARY</h2>
          <div className="h-1 w-32 bg-[#d4af37]" />
          <p className="text-[#d4af37] text-xs font-bebas tracking-[0.4em] mt-4 uppercase">THE CHRONICLES OF BATCH 2026</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-3 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0f27] transition-all rounded-full glass-card group flex items-center justify-center"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 group-active:scale-90 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0f27] transition-all rounded-full glass-card group flex items-center justify-center"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 group-active:scale-90 transition-transform" />
            </button>
          </div>
          
          {isEditMode && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddMemory}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-[#d4af37]/30 text-[#d4af37] font-bebas tracking-widest text-sm rounded-sm hover:bg-[#d4af37] hover:text-[#0a0f27] transition-all"
            >
              <Plus className="w-4 h-4" /> ADD LOG ENTRY
            </motion.button>
          )}
        </div>
      </div>

      <div className="relative group/scroll">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 px-6 pb-12 items-center min-h-[400px] scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#d4af37] scrollbar-track-transparent"
        >
          <AnimatePresence>
            {memories.map((memory) => (
              <MemoryCard 
                key={memory.id} 
                memory={memory} 
                isEditMode={isEditMode}
                onEdit={setEditingMemory}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Subtle Side Gradients for Scroll Hinting */}
        <div className="absolute top-0 left-0 bottom-12 w-20 bg-gradient-to-r from-[#0a0f27] to-transparent pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 bottom-12 w-20 bg-gradient-to-l from-[#0a0f27] to-transparent pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity" />
      </div>

      <AnimatePresence>
        {editingMemory && (
          <EditMemoryModal 
            memory={editingMemory} 
            onClose={() => setEditingMemory(null)} 
            onSave={handleUpdateMemory} 
          />
        )}
      </AnimatePresence>
      
      <style>{`
        /* Scrollbar customization for the memory library row */
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          margin: 0 40px;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </section>
  );
};

export default MemoryLibrary;
