
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, X } from 'lucide-react';

interface AuthModalProps {
  onVerify: () => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onVerify, onClose }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === 'VOYAGE2026') {
      onVerify();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#0a0f27]/95 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="w-full max-w-sm glass-card p-10 text-center relative border-[#d4af37]/20"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
        <Lock className="w-12 h-12 text-[#d4af37] mx-auto mb-6 opacity-50" />
        <h3 className="text-2xl font-bebas text-white mb-2 tracking-[0.2em]">SECURITY CLEARANCE</h3>
        <p className="text-white/40 text-[10px] tracking-widest mb-8">ADMIRAL OVERRIDE REQUIRED</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            autoFocus
            type="password"
            placeholder="ENTER ACCESS CODE..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-sm py-4 px-6 text-center text-white font-bebas tracking-[0.4em] focus:outline-none focus:border-[#d4af37] transition-all`}
          />
          <button type="submit" className="w-full py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-bebas tracking-widest text-xs hover:bg-[#d4af37] hover:text-[#0a0f27] transition-all">
            VERIFY IDENTITY
          </button>
        </form>
        {error && <p className="text-red-500/80 text-[10px] mt-4 font-bebas tracking-widest">ACCESS DENIED: INCORRECT CLEARANCE</p>}
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
