import React from 'react';
import shokoSmilingImg from '../assets/images/shoko_smiling_nobubble_1785155207476.jpg';
import sakurajimaMaiImg from '../assets/images/Sakurajima Mai.jpg';
import kogaTomoeImg from '../assets/images/Koga Tomoe.jpg';
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
      // 牧之原翔子
      return (
        <img
          src={shokoSmilingImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-amber-400/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    case 'mai':
      // 櫻島麻衣
      return (
        <img
          src={sakurajimaMaiImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-slate-300/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
      );

    case 'koga':
      // 古賀朋繪
      return (
        <img
          src={kogaTomoeImg}
          alt={name}
          className={`${className} rounded-2xl object-cover border-2 border-amber-300/90 shadow-md hover:scale-105 transition-transform duration-300`}
        />
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


