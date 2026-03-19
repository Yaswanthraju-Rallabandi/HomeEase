import React from 'react';
import { motion } from 'framer-motion';

export function EtherealBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-transparent" />
      
      {/* Light beams */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-300/50 rounded-full blur-[100px]"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[10%] right-[-10%] w-[50%] h-[70%] bg-sky-300/50 rounded-full blur-[100px]"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[20%] w-[70%] h-[50%] bg-indigo-300/40 rounded-full blur-[100px]"
      />
    </div>
  );
}

export function EtherealBeamsDark() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
      
      {/* Dark beams */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/30 rounded-full blur-[100px]"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[10%] right-[-10%] w-[50%] h-[70%] bg-sky-400/30 rounded-full blur-[100px]"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[20%] w-[70%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px]"
      />
    </div>
  );
}
