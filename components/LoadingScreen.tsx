
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowButton(true), 500);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const playSonarSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // Sonar "ping" characteristics
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.6);

      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.0);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 2.0);
    } catch (e) {
      console.warn("Audio context not supported or blocked", e);
    }
  };

  const handleReadyClick = () => {
    playSonarSound();
    // Small delay to allow sound to start before transition
    setTimeout(onComplete, 200);
  };

  return (
    <div className="fixed inset-0 bg-[#0a0f27] flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ 
              y: '-10%', 
              opacity: [0, 0.3, 0],
              x: `${Math.random() * 100}%` 
            }}
            transition={{ 
              duration: 3 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-2 h-2 bg-white rounded-full blur-sm"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showButton ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-64 flex flex-col items-center gap-4"
          >
            <h2 className="text-[#d4af37] font-bebas text-2xl tracking-widest animate-pulse">
              INITIALIZING NAVAL DATABASE...
            </h2>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#d4af37]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/40 font-mono text-sm">{Math.round(progress)}% ENCRYPTED CONNECTION</p>
          </motion.div>
        ) : (
          <motion.button
            key="ready-btn"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
            onClick={handleReadyClick}
            className="relative group px-12 py-4 bg-[#d4af37] text-[#0a0f27] font-bold tracking-[0.3em] rounded-sm transition-all"
          >
            <div className="absolute inset-0 border border-[#d4af37] scale-110 group-hover:scale-125 transition-transform duration-500 opacity-50 rounded-sm" />
            READY?
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;
