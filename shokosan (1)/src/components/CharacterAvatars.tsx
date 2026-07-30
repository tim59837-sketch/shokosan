import React from 'react';
import shokoSmilingImg from '../assets/images/shoko_smiling_nobubble_1785155207476.jpg';
import shokoNavyImg from '../assets/images/shoko_navy_hair_1785147098274.jpg';
import animeFemaleBaristaImg from '../assets/images/anime_female_barista_1785145313897.jpg';
import sakutaImg from '../assets/images/Azusagawa Sakuta.jpg';
import neneImg from '../assets/images/Iwamizawa Nene.jpg';

interface CharacterAvatarProps {
  id: string;
  name: string;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ id, name, className = "w-16 h-16 sm:w-20 sm:h-20" }) => {
  switch (id) {
    case 'shoko':
      // 牧之原翔子 (Makinohara Shoko)
      return (
        <img
          src={shokoSmilingImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-amber-400/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    case 'mai':
      // 櫻島麻衣 (Mai Sakurajima)
      return (
        <img
          src={shokoNavyImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-slate-300/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    case 'koga':
      // 古賀朋繪 (Tomoe Koga): Sweet anime heroine with short wavy brown bob hair, warm hazel-brown eyes, Minegahara school uniform with red bow tie
      return (
        <svg className={`${className} rounded-2xl border-2 border-amber-300/90 shadow-lg bg-gradient-to-b from-[#2E2824] via-[#1E1916] to-[#120E0C]`} viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="kogaHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9C7862" />
              <stop offset="50%" stopColor="#6E503E" />
              <stop offset="100%" stopColor="#422D20" />
            </linearGradient>
            <linearGradient id="kogaSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF5EE" />
              <stop offset="100%" stopColor="#F9D7C5" />
            </linearGradient>
            <linearGradient id="kogaEyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8A5A38" />
              <stop offset="60%" stopColor="#5E381E" />
              <stop offset="100%" stopColor="#301A0B" />
            </linearGradient>
            <linearGradient id="kogaBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D64545" />
              <stop offset="100%" stopColor="#8B2222" />
            </linearGradient>
          </defs>

          {/* Background Classroom Aura & Soft Bokeh */}
          <rect x="0" y="0" width="100" height="100" fill="#2B2320" />
          <path d="M0 0 L40 0 L25 100 L0 100 Z" fill="#3D4A3E" opacity="0.35" />
          <circle cx="80" cy="25" r="28" fill="#D98A5B" opacity="0.15" />
          <path d="M12 12 L 14 15 L 17 17 L 14 19 L 12 22 L 10 19 L 7 17 L 10 15 Z" fill="#FFE8D6" opacity="0.8" />
          <path d="M86 18 L 87 20 L 89 21 L 87 22 L 86 24 L 85 22 L 83 21 L 85 20 Z" fill="#FFE0CC" opacity="0.7" />

          {/* Back Outer Wavy Bob Hair Volume */}
          <path d="M14 30 C 8 50, 12 75, 25 88 C 30 78, 28 50, 28 32 Z" fill="url(#kogaHairGrad)" />
          <path d="M86 30 C 92 50, 88 75, 75 88 C 70 78, 72 50, 72 32 Z" fill="url(#kogaHairGrad)" />

          {/* Minegahara School Shirt & Red Bowtie */}
          <path d="M16 95 C 16 68, 30 62, 50 62 C 70 62, 84 68, 84 95 Z" fill="#FFFFFF" />
          <path d="M38 62 L 50 78 L 62 62 Z" fill="#F4EAE2" />
          <path d="M42 62 C 45 58, 55 58, 58 62 L 50 66 Z" fill="#3D3028" />

          {/* Red Ribbon Bow Tie */}
          <path d="M50 73 C 44 68, 32 66, 35 76 C 38 82, 48 76, 50 73 Z" fill="url(#kogaBowGrad)" />
          <path d="M50 73 C 56 68, 68 66, 65 76 C 62 82, 52 76, 50 73 Z" fill="url(#kogaBowGrad)" />
          <rect x="47" y="70" width="6" height="6" fill="#A82B2B" rx="1.5" />
          <path d="M46 76 L 42 92 L 48 88 Z" fill="url(#kogaBowGrad)" />
          <path d="M54 76 L 58 92 L 52 88 Z" fill="url(#kogaBowGrad)" />

          {/* Neck */}
          <rect x="44" y="50" width="12" height="15" fill="url(#kogaSkinGrad)" rx="2" />

          {/* Soft Female Face Contour */}
          <path d="M30 30 C 30 18, 70 18, 70 30 C 70 47, 59 58, 50 58 C 41 58, 30 47, 30 30 Z" fill="url(#kogaSkinGrad)" />

          {/* Large Warm Hazel-Brown Anime Eyes */}
          <g>
            <path d="M34 31 C 38 28, 45 29, 47 32" stroke="#2B180C" strokeWidth="2.3" strokeLinecap="round" fill="none" />
            <path d="M53 32 C 55 29, 62 28, 66 31" stroke="#2B180C" strokeWidth="2.3" strokeLinecap="round" fill="none" />

            <ellipse cx="41" cy="38" rx="4.5" ry="5.8" fill="url(#kogaEyeGrad)" />
            <ellipse cx="59" cy="38" rx="4.5" ry="5.8" fill="url(#kogaEyeGrad)" />

            <ellipse cx="41" cy="40" rx="2.8" ry="3.6" fill="#C98453" />
            <ellipse cx="59" cy="40" rx="2.8" ry="3.6" fill="#C98453" />

            <circle cx="41" cy="38" r="1.6" fill="#1A0A02" />
            <circle cx="59" cy="38" r="1.6" fill="#1A0A02" />

            <circle cx="39" cy="35" r="1.7" fill="#FFFFFF" />
            <circle cx="57" cy="35" r="1.7" fill="#FFFFFF" />
            <circle cx="42.5" cy="41" r="0.9" fill="#FFFFFF" opacity="0.85" />
            <circle cx="60.5" cy="41" r="0.9" fill="#FFFFFF" opacity="0.85" />
          </g>

          {/* Soft Pink Blush on Cheeks */}
          <ellipse cx="35" cy="44" rx="4" ry="2" fill="#F08A75" opacity="0.5" />
          <ellipse cx="65" cy="44" rx="4" ry="2" fill="#F08A75" opacity="0.5" />

          {/* Cute Smile */}
          <path d="M44 48 Q 50 52 56 48" stroke="#A8573B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Short Wavy Hair Bangs & Front Strands */}
          <path d="M25 28 C 30 12, 70 12, 75 28 C 66 22, 58 28, 50 20 C 42 28, 34 22, 25 28 Z" fill="url(#kogaHairGrad)" />
          <path d="M35 20 L 42 33 L 47 22 L 53 34 L 62 21" fill="url(#kogaHairGrad)" />
          <path d="M23 28 C 21 38, 25 52, 31 58 C 32 46, 28 35, 27 28 Z" fill="url(#kogaHairGrad)" />
          <path d="M77 28 C 79 38, 75 52, 69 58 C 68 46, 72 35, 73 28 Z" fill="url(#kogaHairGrad)" />

          {/* Hair Light Ring */}
          <path d="M30 18 Q 50 12 70 18" stroke="#CBB19F" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
        </svg>
      );

    case 'sakuta':
      // 梓川咲太 (Sakuta Azusagawa)
      return (
        <img
          src={sakutaImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-amber-600/80 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    case 'nene':
      // 岩見澤寧寧 (Nene Iwamizawa)
      return (
        <img
          src={neneImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-pink-300/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    default:
      return (
        <div className={`${className} rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl`}>
          🔮
        </div>
      );
  }
};


