import React from 'react';
import { motion } from 'motion/react';
import shokoBaristaImg from '../assets/images/shoko_greeting_open_mouth_1785157425669.jpg';
import shokoSmilingImg from '../assets/images/shoko_smiling_nobubble_1785155207476.jpg';

interface BaristaStaffProps {
  isHandingMenu: boolean;
  selectedModeName?: string;
  onClickStaff?: () => void;
  greetingIndex?: number;
}

const WELCOME_GREETINGS = [
  "「歡迎光臨，你把手機丟進海裡面了嗎？」",
  "「你知道嗎？人一眼望去最遠能看到四公里哦。」",
  "「『謝謝、你很努力了、最喜歡了』是我最喜歡的話哦！」",
  "「我會一直回來，直到每個人幸福為止。」",
  "「沒事了，因為我來了哦。」"
];

export const BaristaStaff: React.FC<BaristaStaffProps> = ({
  isHandingMenu,
  selectedModeName,
  onClickStaff,
  greetingIndex = 0
}) => {
  const currentGreeting = WELCOME_GREETINGS[greetingIndex % WELCOME_GREETINGS.length];

  return (
    <div className="relative flex flex-col items-center justify-center my-2 sm:my-3 select-none px-2">
      {/* Background Soft Coffee Aura & Light Glow */}
      <div className="absolute w-48 h-48 sm:w-80 sm:h-80 bg-amber-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Speech Bubble from Barista Staff */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-2.5 bg-white/95 text-[#4A3E3D] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border-2 border-[#A87C66]/50 shadow-lg text-xs sm:text-sm font-bold font-serif flex items-center justify-center gap-1.5 relative w-full max-w-[280px] sm:max-w-md text-center z-20 leading-snug"
      >
        <span className="text-amber-700 text-sm sm:text-base animate-bounce shrink-0">☕</span>
        <span className="line-clamp-2">
          {!isHandingMenu
            ? currentGreeting
            : `「已經為您準備好『${selectedModeName || '專屬特調'}』菜單囉！」`}
        </span>
        {/* Triangle pointer pointing down to female barista */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white drop-shadow-xs" />
      </motion.div>

      {/* Hand-Drawn Female Barista Illustration */}
      <motion.div
        animate={
          isHandingMenu
            ? { y: [0, -6, 0], rotate: [0, 5, 4] }
            : { y: [0, -3, 0], rotate: 0 }
        }
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        onClick={onClickStaff}
        className="relative cursor-pointer group z-10"
      >
        {/* Image Container Frame with Warm Wood/Paper Border */}
        <div className="relative w-48 h-60 sm:w-64 sm:h-80 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-[#F5EBE6] via-[#E4D5C7] to-[#8C5C42] shadow-2xl border-3 sm:border-4 border-[#8C5C42]/80 overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
          
          {/* Inner Shadow and Gloss Overlay */}
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#2D1B18]">
            <img
              src={isHandingMenu ? shokoSmilingImg : shokoBaristaImg}
              alt="心靈咖啡師 翔子"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHandingMenu
                  ? 'scale-[1.32] origin-[50%_15%] object-top translate-y-1'
                  : 'object-center group-hover:scale-105'
              }`}
            />

            {/* Warm Coffee Shop Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E2D]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Name Badge Overlay */}
            <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-amber-100 border border-amber-300/40 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold font-serif flex items-center gap-1.5 shadow-md whitespace-nowrap">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isHandingMenu ? "咖啡師 • 翔子 (燦笑✨)" : "咖啡師 • 翔子"}</span>
            </div>
          </div>
        </div>

        {/* Animated Wooden Clipboard/Menu in Barista's Hands */}
        <motion.div
          className="absolute left-1/2 -bottom-3 sm:-bottom-4 transform -translate-x-1/2 z-20"
          animate={
            isHandingMenu
              ? { scale: 1.1, y: -10, rotate: -2 }
              : { scale: 1.0, y: 0, rotate: 0 }
          }
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <div className="w-28 sm:w-36 bg-[#FAF4F0] border-2 border-[#5C4D4B] rounded-lg sm:rounded-xl p-2 sm:p-2.5 shadow-xl text-center relative group-hover:border-[#A87C66] transition-colors">
            {/* Clipboard Top Metallic Clip */}
            <div className="absolute -top-2.5 sm:-top-3 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-3 sm:h-3.5 bg-[#5C4D4B] rounded-xs sm:rounded-sm flex items-center justify-center shadow-xs">
              <div className="w-4 sm:w-5 h-0.5 sm:h-1 bg-[#D2BCA6] rounded-xs" />
            </div>

            {/* Menu Header Line */}
            <div className="mt-0.5 text-[9px] sm:text-[11px] font-extrabold text-[#8C5C42] border-b border-[#E4D5C7] pb-0.5 font-serif flex items-center justify-center gap-1 whitespace-nowrap">
              翔子本日特調💖
            </div>

            {/* Menu Content indicator lines */}
            <div className="my-1 sm:my-1.5 space-y-0.5 sm:space-y-1">
              <div className="h-0.5 sm:h-1 bg-[#A87C66]/50 rounded-full w-full" />
              <div className="h-0.5 sm:h-1 bg-[#A87C66]/35 rounded-full w-4/5 mx-auto" />
              <div className="h-0.5 sm:h-1 bg-[#A87C66]/25 rounded-full w-3/5 mx-auto" />
            </div>

            <div className="text-[8px] sm:text-[9px] bg-gradient-to-r from-[#A87C66] to-[#8C5C42] text-white rounded-md px-1 py-0.5 font-bold shadow-xs whitespace-nowrap">
              {isHandingMenu ? "反悔了嗎？任性一下吧❤️" : "那，讓我決定囉😈"}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};


