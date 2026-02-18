
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Anchor, Shield, Navigation } from 'lucide-react';

const Counter = ({ value, label, icon: Icon }: { value: number, label: string, icon: any }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = 2000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center p-6 glass-card rounded-xl">
      <Icon className="w-8 h-8 text-[#d4af37] mb-3" />
      <div className="text-4xl font-bold font-montserrat text-white">{count}</div>
      <div className="text-[#d4af37] text-xs font-bebas tracking-widest mt-1 uppercase">{label}</div>
    </div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Create parallax effect for background: move slower than the scroll
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);

  // Static motto replacing the AI generation
  const motto = "ETERNAL BROTHERHOOD, CHARTING THE GOLDEN COURSE.";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background Decorative Element with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" 
      />
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <p className="text-[#d4af37] font-bebas tracking-[0.5em] mb-4 text-sm md:text-base uppercase">MARINE VOCATIONAL HIGH SCHOOL • YEARBOOK</p>
        <h1 className="text-6xl md:text-9xl font-montserrat font-black text-white leading-none tracking-tighter mb-4 flex flex-col">
          <span className="opacity-80">THE GOLDEN</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-white to-[#d4af37] animate-pulse">VOYAGE</span>
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/60 italic font-light tracking-wide max-w-lg mx-auto mb-12 uppercase text-[10px] md:text-xs"
        >
          &quot;{motto}&quot;
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-10"
      >
        <Counter value={67} label="Cadets" icon={Anchor} />
        <Counter value={8} label="Guardians" icon={Shield} />
        <Counter value={2026} label="Class Of" icon={Navigation} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 flex flex-col items-center text-white/30 text-xs tracking-widest gap-2"
      >
        SCROLL TO DIVE
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
