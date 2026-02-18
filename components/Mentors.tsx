
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GUARDIANS } from '../constants';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Mentors: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="mentors" className="py-24 bg-[#0a0f27] relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-6xl font-bebas text-[#d4af37] mb-2">THE 8 GUARDIANS</h2>
            <div className="h-1 w-24 bg-[#d4af37]" />
            <p className="text-white/50 mt-4 max-w-xl">Our compass in the storm. The experienced navigators who guided the Class of 2026 through the turbulent waters of growth.</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0f27] transition-all rounded-full glass-card group"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0f27] transition-all rounded-full glass-card group"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-12 gap-8 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#d4af37] scrollbar-track-white/5 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GUARDIANS.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex-shrink-0 w-72 h-[450px] relative group rounded-xl overflow-hidden glass-card snap-center"
            >
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f27] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-[#d4af37] text-[10px] tracking-[0.2em] uppercase font-bold">{mentor.title}</span>
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-white mb-1 leading-tight">{mentor.name}</h3>
                <p className="text-white/60 text-xs italic tracking-wide">{mentor.specialty}</p>
                
                <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300 mt-4 opacity-0 group-hover:opacity-100">
                  <button className="w-full py-2 border border-[#d4af37] text-[#d4af37] text-xs font-bebas tracking-widest hover:bg-[#d4af37] hover:text-[#0a0f27] transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    READ LEGACY
                  </button>
                </div>
              </div>

              {/* Decorative side accent visible on hover */}
              <div className="absolute top-6 right-0 w-1 h-0 bg-[#d4af37] group-hover:h-12 transition-all duration-500 delay-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
