
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-32 bg-[#0a0f27] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bebas text-white mb-6">THE FINAL VOYAGE</h2>
          <p className="text-[#d4af37] text-xl md:text-2xl font-light italic max-w-2xl mx-auto">
            &quot;8 Mentors, 67 Stories, One Infinite Ocean.&quot;
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
          <button className="group relative px-8 py-4 bg-[#0a0f27] border border-[#d4af37] text-[#d4af37] font-bebas tracking-[0.2em] rounded overflow-hidden">
            <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 group-hover:text-[#0a0f27] flex items-center gap-3">
              <Instagram className="w-5 h-5" /> INSTAGRAM ANGKATAN
            </span>
          </button>
          
          <button className="group relative px-8 py-4 bg-[#d4af37] text-[#0a0f27] font-bebas tracking-[0.2em] rounded overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="relative z-10 flex items-center gap-3">
              <Globe className="w-5 h-5" /> WEBSITE RESMI SEKOLAH
            </span>
          </button>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col items-center">
          <p className="text-white/20 text-[10px] tracking-[0.4em] mb-4">EST. 2026 • ETERNAL CONNECTION</p>
          <div className="flex gap-8 mb-8">
            <div className="h-px w-12 bg-[#d4af37]/30" />
            <AnchorIcon className="w-6 h-6 text-[#d4af37]/50" />
            <div className="h-px w-12 bg-[#d4af37]/30" />
          </div>
          <p className="text-white/40 text-xs">Developed for the Eternal Connection of Batch 2026.</p>
        </div>
      </div>
      
      {/* Background Graphic */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-[#d4af37]/5 to-transparent blur-[100px] pointer-events-none" />
    </footer>
  );
};

const AnchorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><circle cx="12" cy="5" r="3" />
  </svg>
);

export default Footer;
