import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Sparkles } from 'lucide-react';

interface OrderBellProps {
  onRingBell: () => void;
  disabled?: boolean;
}

export const OrderBell: React.FC<OrderBellProps> = ({ onRingBell, disabled = false }) => {
  const [isRinging, setIsRinging] = useState(false);
  const [showRingingText, setShowRingingText] = useState(false);

  // Realistic Counter Service Bell (Call Bell) Sound Synthesizer - Ultra Crisp
  const playDingSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 1. Crystal Clapper Sharp Impact Click
      const strikeOsc = ctx.createOscillator();
      const strikeGain = ctx.createGain();
      strikeOsc.type = 'triangle';
      strikeOsc.frequency.setValueAtTime(5200, now);
      strikeOsc.frequency.exponentialRampToValueAtTime(1800, now + 0.015);
      strikeGain.gain.setValueAtTime(0.5, now);
      strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      strikeOsc.connect(strikeGain);
      strikeGain.connect(ctx.destination);
      strikeOsc.start(now);
      strikeOsc.stop(now + 0.02);

      // 2. High Crisp Bell Fundamental Tone (E7 - 2637 Hz)
      const mainOsc1 = ctx.createOscillator();
      const mainGain1 = ctx.createGain();
      mainOsc1.type = 'sine';
      mainOsc1.frequency.setValueAtTime(2637, now);
      mainGain1.gain.setValueAtTime(0.4, now);
      mainGain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      mainOsc1.connect(mainGain1);
      mainGain1.connect(ctx.destination);
      mainOsc1.start(now);
      mainOsc1.stop(now + 1.5);

      // 3. Shimmer Detuned Ring (2648 Hz) for rich metallic resonance
      const mainOsc2 = ctx.createOscillator();
      const mainGain2 = ctx.createGain();
      mainOsc2.type = 'sine';
      mainOsc2.frequency.setValueAtTime(2648, now);
      mainGain2.gain.setValueAtTime(0.3, now);
      mainGain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
      mainOsc2.connect(mainGain2);
      mainGain2.connect(ctx.destination);
      mainOsc2.start(now);
      mainOsc2.stop(now + 1.3);

      // 4. Ultra Crisp Upper Harmonic Overtones (E8 - 5274 Hz & B8 - 7902 Hz)
      const overtoneOsc = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(5274, now);
      overtoneGain.gain.setValueAtTime(0.2, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);
      overtoneOsc.start(now);
      overtoneOsc.stop(now + 1.0);

      const overtoneOsc2 = ctx.createOscillator();
      const overtoneGain2 = ctx.createGain();
      overtoneOsc2.type = 'sine';
      overtoneOsc2.frequency.setValueAtTime(7902, now);
      overtoneGain2.gain.setValueAtTime(0.1, now);
      overtoneGain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      overtoneOsc2.connect(overtoneGain2);
      overtoneGain2.connect(ctx.destination);
      overtoneOsc2.start(now);
      overtoneOsc2.stop(now + 0.6);
    } catch {
      // Ignore if audio context is restricted
    }
  };

  const handleBellClick = () => {
    if (disabled || isRinging) return;

    setIsRinging(true);
    setShowRingingText(true);
    playDingSound();

    setTimeout(() => {
      setIsRinging(false);
    }, 600);

    setTimeout(() => {
      setShowRingingText(false);
      onRingBell();
    }, 850);
  };

  return (
    <div className="flex flex-col items-center justify-center relative my-4">
      {/* Expanding Sound Wave Rings Animation */}
      <AnimatePresence>
        {isRinging && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute w-32 h-32 rounded-full border-2 border-amber-400/90 bg-amber-300/10 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
              className="absolute w-32 h-32 rounded-full border-2 border-[#A87C66] pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-amber-200/40 to-amber-400/40 blur-md pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating Ding Badge Text */}
      <AnimatePresence>
        {showRingingText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -30, scale: 1.15 }}
            exit={{ opacity: 0, y: -45 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute -top-7 text-amber-950 font-extrabold font-serif text-sm bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 border-2 border-amber-400 px-3.5 py-1 rounded-full shadow-lg z-20 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-700 animate-spin" />
            <span>叮～ 🔔 響鈴送單開牌！</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Call Bell Button */}
      <motion.button
        type="button"
        onClick={handleBellClick}
        disabled={disabled}
        animate={
          isRinging
            ? {
                rotate: [0, -12, 12, -8, 8, -4, 4, 0],
                y: [0, 2, -1, 0],
                scale: [1, 1.08, 1],
              }
            : { scale: 1 }
        }
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="relative group cursor-pointer p-3 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FAF4F0] via-amber-50 to-[#E4D5C7] border-2 border-[#A87C66] shadow-md hover:shadow-xl transition-all flex flex-col items-center justify-center w-full max-w-[280px] sm:max-w-sm mx-auto"
      >
        {/* Shiny Golden Dome Service Bell Graphic */}
        <div className="relative w-16 h-13 sm:w-20 sm:h-16 flex items-center justify-center">
          {/* Bell Top Button Plunger (Depresses on click) */}
          <motion.div
            animate={isRinging ? { y: [0, 4, 0] } : { y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 w-3.5 sm:w-4 h-2 sm:h-2.5 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-t-full border border-amber-800 z-10"
          />
          <div className="absolute top-1.5 sm:top-2 w-1.5 h-1.5 sm:h-2 bg-amber-800 z-0" />

          {/* Bell Dome */}
          <div className="absolute top-2.5 sm:top-3 w-13 sm:w-16 h-8 sm:h-10 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 rounded-t-full border border-amber-800 shadow-inner flex items-center justify-center overflow-hidden">
            {/* Highlight Shine */}
            <div className="absolute top-0.5 sm:top-1 left-2 sm:left-3 w-3 sm:w-4 h-1.5 sm:h-2 bg-white/80 rounded-full blur-[0.5px]" />
          </div>

          {/* Bell Base */}
          <div className="absolute bottom-1 w-16 sm:w-20 h-2.5 sm:h-3 bg-gradient-to-r from-[#4A3E3D] via-[#8C5C42] to-[#3A2E2D] rounded-full border border-amber-900 shadow-md" />
        </div>

        {/* Action Label Below Bell */}
        <div className="mt-1.5 sm:mt-2 text-center">
          <div className="text-xs sm:text-sm font-extrabold text-[#4A3E3D] font-serif flex items-center justify-center">
            <span>點好了，翔子小姐~</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
};
