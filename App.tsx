
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Mentors from './components/Mentors';
import CadetGrid from './components/CadetGrid';
import MemoryLibrary from './components/MemoryLibrary';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { AppState } from './types';
import { Lock, ShieldCheck, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [isCommandMode, setIsCommandMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleLoadingComplete = () => {
    setAppState(AppState.READY);
    setTimeout(() => {
        setAppState(AppState.CONTENT);
    }, 100);
  };

  const handlePortalClick = () => {
    if (isCommandMode) {
      setIsCommandMode(false);
    } else {
      setShowAuth(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f27] text-white selection:bg-[#d4af37] selection:text-[#0a0f27]">
      <AnimatePresence mode="wait">
        {appState === AppState.LOADING && (
          <LoadingScreen onComplete={handleLoadingComplete} key="loading" />
        )}

        {appState === AppState.CONTENT && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Glassmorphism Nav Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center bg-white/[0.02] backdrop-blur-xl border-b border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-[#d4af37] flex items-center justify-center rotate-45">
                    <div className="w-6 h-6 bg-[#d4af37] -rotate-45 flex items-center justify-center">
                        <span className="text-[#0a0f27] font-bold text-[10px]">51</span>
                    </div>
                </div>
                <div>
                    <p className="font-bebas text-white tracking-[0.2em] leading-none text-lg">FORCE 51</p>
                    <p className="text-[8px] text-[#d4af37] tracking-[0.3em] font-bold">BATCH COMMAND</p>
                </div>
              </div>
              
              <div className="hidden md:flex gap-10 items-center">
                <a href="#" className="text-[10px] font-bebas tracking-widest text-white/70 hover:text-[#d4af37] transition-all duration-300 relative group">
                  DECK
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#mentors" className="text-[10px] font-bebas tracking-widest text-white/70 hover:text-[#d4af37] transition-all duration-300 relative group">
                  GUARDIANS
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#cadets" className="text-[10px] font-bebas tracking-widest text-white/70 hover:text-[#d4af37] transition-all duration-300 relative group">
                  NAVIGATORS
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#memories" className="text-[10px] font-bebas tracking-widest text-white/70 hover:text-[#d4af37] transition-all duration-300 relative group">
                  MEMORIES
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
                </a>
                
                <div className="h-4 w-px bg-white/10 ml-2"></div>
                
                <button 
                  onClick={handlePortalClick}
                  className={`px-5 py-1.5 border font-bebas text-[10px] tracking-widest rounded-sm transition-all duration-500 flex items-center gap-2 ${
                    isCommandMode 
                      ? 'bg-[#d4af37] text-[#0a0f27] border-[#d4af37]' 
                      : 'border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0f27]'
                  }`}
                >
                  {isCommandMode ? <ShieldCheck className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  {isCommandMode ? 'COMMAND ACTIVE' : 'SECURE PORTAL'}
                </button>
              </div>

              <div className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 hover:bg-white/5 rounded-md transition-colors">
                <div className="w-6 h-[1.5px] bg-[#d4af37]" />
                <div className="w-4 h-[1.5px] bg-[#d4af37] self-end" />
                <div className="w-6 h-[1.5px] bg-[#d4af37]" />
              </div>
            </nav>

            <Hero />
            
            <section id="stats-banner" className="py-20 border-y border-white/5 relative overflow-hidden bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
                <div className="flex whitespace-nowrap animate-infinite-scroll">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-[#d4af37]/20 font-bebas text-6xl px-12 tracking-widest">
                            DISCIPLINE • HONOR • ETERNAL BROTHERHOOD •
                        </span>
                    ))}
                </div>
                <style>{`
                    @keyframes infinite-scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                    .animate-infinite-scroll {
                        display: flex;
                        width: fit-content;
                        animation: infinite-scroll 40s linear infinite;
                    }
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </section>

            <Mentors />
            
            <CadetGrid isEditMode={isCommandMode} />

            <MemoryLibrary isEditMode={isCommandMode} />

            <Footer />
            
            <AnimatePresence>
              {showAuth && (
                <AuthModal 
                  onVerify={() => { setShowAuth(false); setIsCommandMode(true); }} 
                  onClose={() => setShowAuth(false)} 
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
