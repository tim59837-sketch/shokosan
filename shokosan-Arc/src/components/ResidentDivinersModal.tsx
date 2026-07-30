import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  UserCheck,
  MapPin,
  Calendar,
  Clock,
  Star,
  Sparkles,
  MessageCircle,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Award
} from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatars';
import shokoSmilingImg from '../assets/images/shoko_smiling_nobubble_1785155207476.jpg';
import sakurajimaMaiImg from '../assets/images/Sakurajima Mai.jpg';
import kogaTomoeImg from '../assets/images/Koga Tomoe.jpg';
import sakutaImg from '../assets/images/Azusagawa Sakuta.jpg';
import neneImg from '../assets/images/Iwamizawa Nene.jpg';

export interface Diviner {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isShoko?: boolean;
  rating: number;
  reviewCount: number;
  yearsOfExp: number;
  consultationsCount: string;
  storeLocation: string;
  availableTime: string;
  tags: string[];
  bio: string;
  badge: string;
  contactUrl?: string;
}

const DIVINERS_LIST: Diviner[] = [
  {
    id: 'shoko',
    name: '牧之原翔子',
    title: '心靈拿鐵創辦人 ‧ 駐館首席時空占卜師',
    avatar: shokoSmilingImg,
    isShoko: true,
    rating: 4.99,
    reviewCount: 520,
    yearsOfExp: 10,
    consultationsCount: '8,800+',
    storeLocation: '台北大安創始館',
    availableTime: '週二至週六 14:00 - 21:00',
    tags: ['九宮格撲克占卜', '時空軌跡對焦', '二選一決策特調'],
    bio: '「在平行世界的時空軌跡中，為您調配一杯最能映照靈魂真實模樣的心靈拿鐵。」',
    badge: '創始店長 ‧ 總導師'
  },
  {
    id: 'mai',
    name: '櫻島麻衣',
    title: '高階特約駐館導師 ‧ 演藝感情與關係氣場修復',
    avatar: sakurajimaMaiImg,
    rating: 4.98,
    reviewCount: 430,
    yearsOfExp: 8,
    consultationsCount: '6,500+',
    storeLocation: '台北信義精品館',
    availableTime: '週一至週五 13:00 - 20:00',
    tags: ['學姐感心靈指引', '感情關係修復', '氣場存在感對焦'],
    bio: '「即使身處人群中被暫時忽略，這杯特調也會為你點亮獨一無二的存在光芒。」',
    badge: '首席人氣學姐'
  },
  {
    id: 'koga',
    name: '古賀朋繪',
    title: '駐館活力占卜師 ‧ 青春抉擇與拉普拉斯因果解構',
    avatar: kogaTomoeImg,
    rating: 4.96,
    reviewCount: 310,
    yearsOfExp: 5,
    consultationsCount: '4,200+',
    storeLocation: '福岡博多特約館 / 台北大安館',
    availableTime: '週三至週日 12:00 - 20:00',
    tags: ['二選一抉擇對焦', '拉普拉斯因果論', '青春焦慮調和'],
    bio: '「不用擔心選錯路！就算時間重複旋轉，我也會陪你找到最美好的解答吧！」',
    badge: '拉普拉斯之魔'
  },
  {
    id: 'sakuta',
    name: '梓川咲太',
    title: '思春期現象觀察員 ‧ 駐館理性直覺剖析師',
    avatar: sakutaImg,
    rating: 4.97,
    reviewCount: 390,
    yearsOfExp: 7,
    consultationsCount: '5,800+',
    storeLocation: '神奈川江之島總館',
    availableTime: '週二至週六 14:00 - 21:00',
    tags: ['思春期症候群解讀', '告白直言突破', '潛意識特調指引'],
    bio: '「麻衣小姐！我喜歡妳！」',
    badge: '理性直覺導師'
  },
  {
    id: 'nene',
    name: '岩見澤寧寧',
    title: '靈魂共振引導師 ‧ 精靈魔法與情緒氣場調和',
    avatar: neneImg,
    rating: 4.95,
    reviewCount: 280,
    yearsOfExp: 6,
    consultationsCount: '3,900+',
    storeLocation: '台中勤美人文館',
    availableTime: '週五至週日 11:00 - 19:00',
    tags: ['靈魂魔法共振', '氣場淨化特調', '情緒直覺牌卡'],
    bio: '「將日常的小幸運注入咖啡奶泡，讓身心恢復最純粹輕盈的靈魂魔法。」',
    badge: '氣場魔法師'
  }
];

interface ResidentDivinersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResidentDivinersModal: React.FC<ResidentDivinersModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [bookingDiviner, setBookingDiviner] = useState<Diviner | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('14:00');
  const [consultType, setConsultType] = useState<'store' | 'online'>('store');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  if (!isOpen) return null;

  const allTags = ['ALL', '九宮格撲克', '感情關係', '二選一抉擇', '思春期症候群', '氣場淨化'];

  const filteredDiviners = DIVINERS_LIST.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.storeLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedTag === 'ALL') return matchesSearch;
    return matchesSearch && d.tags.some(t => t.includes(selectedTag));
  });

  const handleStartBooking = (diviner: Diviner) => {
    setBookingDiviner(diviner);
    setBookingSuccess(false);
    // default tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert('請填寫姓名與聯絡電話，以便咖啡館夥伴為您保留席位！');
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#FAF4F0] border-2 border-[#A87C66] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] font-serif text-[#4A3E3D]"
        >
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-r from-[#4A3E3D] via-[#5C4D4B] to-[#3A2E2D] text-[#FAF4F0] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b-2 border-[#A87C66] relative shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-300/40 flex items-center justify-center text-xl shrink-0">
                🔮
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold font-serif text-[#FAF4F0] tracking-wide">
                    合作實體駐館占卜師名單
                  </h2>
                  <span className="text-[10px] bg-amber-400/20 text-amber-200 border border-amber-300/40 px-2 py-0.5 rounded-full font-bold font-sans">
                    全台特約門市
                  </span>
                </div>
                <p className="text-xs text-[#D2BCA6] font-sans mt-0.5">
                  心靈拿鐵精選專業駐館導師 ‧ 提供 1對1 深度實體門市與線上視訊占卜
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#D2BCA6] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="關閉視窗"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filters Header */}
          <div className="bg-[#F5EBE6] px-4 sm:px-6 py-3 border-b border-[#E4D5C7] space-y-3 shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A87C66]" />
                <input
                  type="text"
                  placeholder="搜尋占卜師、地點或專長..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-[#D2BCA6] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#4A3E3D] placeholder-[#A87C66]/60 focus:outline-none focus:ring-2 focus:ring-[#A87C66] font-sans shadow-2xs"
                />
              </div>

              {/* Tag Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                <Filter className="w-3.5 h-3.5 text-[#A87C66] shrink-0 mr-1" />
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-[#A87C66] text-white shadow-2xs'
                        : 'bg-white border border-[#E4D5C7] text-[#4A3E3D] hover:bg-[#E4D5C7]/50'
                    }`}
                  >
                    {tag === 'ALL' ? '全部導師' : tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {filteredDiviners.length === 0 ? (
              <div className="text-center py-12 space-y-3 bg-white/60 rounded-2xl border border-dashed border-[#E4D5C7]">
                <p className="text-sm font-serif text-[#7A6A63]">
                  🔍 未找到符合「{searchTerm}」條件的駐館占卜師
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedTag('ALL'); }}
                  className="text-xs text-[#A87C66] underline font-bold"
                >
                  清除搜尋條件
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDiviners.map(diviner => (
                  <div
                    key={diviner.id}
                    className={`bg-white border-2 ${
                      diviner.isShoko
                        ? 'border-amber-500/80 shadow-md ring-2 ring-amber-200/50'
                        : 'border-[#E4D5C7] shadow-xs hover:border-[#A87C66]'
                    } rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden`}
                  >
                    {diviner.isShoko && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-600 to-amber-700 text-amber-50 text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-2xs font-sans flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-200" />
                        <span>創始店長 ‧ 首選推薦</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {/* Avatar & Header Info */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative shrink-0">
                          <CharacterAvatar
                            id={diviner.id}
                            name={diviner.name}
                            className="w-16 h-16 sm:w-20 sm:h-20"
                          />
                          <span className="absolute -bottom-1 -right-1 bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-1.5 py-0.2 rounded-md shadow-2xs font-mono z-10">
                            ★ {diviner.rating}
                          </span>
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-extrabold text-[#4A3E3D] font-serif leading-tight">
                              {diviner.name}
                            </h3>
                          </div>
                          
                          <p className="text-xs font-bold text-[#A87C66] font-sans leading-snug">
                            {diviner.title}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#7A6A63] font-sans pt-0.5">
                            <span className="bg-[#FAF4F0] px-2 py-0.5 rounded border border-[#E4D5C7] font-bold">
                              經驗 {diviner.yearsOfExp} 年
                            </span>
                            <span className="bg-[#FAF4F0] px-2 py-0.5 rounded border border-[#E4D5C7]">
                              累計 {diviner.consultationsCount} 人次
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bio Quote */}
                      <p className="text-xs text-[#5C4D4B] leading-relaxed font-serif bg-[#FAF4F0]/80 p-2.5 rounded-xl border border-[#E4D5C7]/70 italic">
                        {diviner.bio}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {diviner.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#A87C66]/10 text-[#4A3E3D] border border-[#A87C66]/20 px-2 py-0.5 rounded-md font-bold font-sans"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Store Location & Time */}
                      <div className="space-y-1 text-xs text-[#7A6A63] font-sans bg-[#F5EBE6]/60 p-2.5 rounded-xl border border-[#E4D5C7]/60">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#A87C66] shrink-0" />
                          <span className="font-bold text-[#4A3E3D]">{diviner.storeLocation}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-[#A87C66] shrink-0" />
                          <span>{diviner.availableTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 mt-3 border-t border-[#E4D5C7] flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[#A87C66] font-mono font-bold">
                        ⭐ {diviner.rating} ({diviner.reviewCount} 則正面評價)
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStartBooking(diviner)}
                        className="px-3.5 py-1.5 bg-[#4A3E3D] hover:bg-[#A87C66] text-[#FAF4F0] rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs cursor-pointer group-hover:shadow-md"
                      >
                        <Calendar className="w-3.5 h-3.5 text-amber-300" />
                        <span>預約實體/線上諮詢</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Notice */}
          <div className="bg-[#F5EBE6] px-4 sm:px-6 py-3 border-t border-[#E4D5C7] text-center text-xs text-[#7A6A63] font-sans flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#A87C66]" />
              <span>心靈拿鐵品質承諾：所有合作駐館占卜師皆通過專業資格與心靈溝通考核。</span>
            </span>
            <button
              onClick={onClose}
              className="text-[#A87C66] hover:text-[#4A3E3D] font-bold text-xs underline cursor-pointer"
            >
              返回咖啡館
            </button>
          </div>
        </motion.div>
      </div>

      {/* Booking Drawer / Sub-modal */}
      {bookingDiviner && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-lg bg-[#FAF4F0] border-2 border-[#A87C66] rounded-2xl shadow-2xl p-5 sm:p-6 relative font-serif text-[#4A3E3D]"
          >
            <button
              onClick={() => setBookingDiviner(null)}
              className="absolute top-4 right-4 p-1.5 text-[#A87C66] hover:text-[#4A3E3D] rounded-full hover:bg-[#E4D5C7]/50"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleSubmitBooking} className="space-y-4 text-left">
                <div className="flex items-center gap-3 border-b border-[#E4D5C7] pb-3">
                  <CharacterAvatar
                    id={bookingDiviner.id}
                    name={bookingDiviner.name}
                    className="w-12 h-12 shrink-0"
                  />
                  <div>
                    <h3 className="font-extrabold text-base text-[#4A3E3D]">
                      預約駐館諮詢 ‧ {bookingDiviner.name}
                    </h3>
                    <p className="text-xs text-[#A87C66] font-sans">
                      {bookingDiviner.storeLocation} ({bookingDiviner.title})
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="block text-[#4A3E3D] font-bold mb-1">諮詢形式：</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setConsultType('store')}
                        className={`p-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          consultType === 'store'
                            ? 'bg-[#4A3E3D] text-white border-[#4A3E3D]'
                            : 'bg-white border-[#E4D5C7] text-[#4A3E3D]'
                        }`}
                      >
                        🏠 門市實體面對面
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsultType('online')}
                        className={`p-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          consultType === 'online'
                            ? 'bg-[#4A3E3D] text-white border-[#4A3E3D]'
                            : 'bg-white border-[#E4D5C7] text-[#4A3E3D]'
                        }`}
                      >
                        💻 線上 HD 專屬視訊
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#4A3E3D] font-bold mb-1">預約日期：</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-white border border-[#D2BCA6] rounded-xl p-2 text-xs font-bold text-[#4A3E3D]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A3E3D] font-bold mb-1">希望時段：</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-white border border-[#D2BCA6] rounded-xl p-2 text-xs font-bold text-[#4A3E3D]"
                      >
                        <option value="14:00">14:00 - 15:00</option>
                        <option value="15:30">15:30 - 16:30</option>
                        <option value="17:00">17:00 - 18:00</option>
                        <option value="19:00">19:00 - 20:00</option>
                        <option value="20:30">20:30 - 21:30</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#4A3E3D] font-bold mb-1">預約人姓名：</label>
                      <input
                        type="text"
                        placeholder="請輸入姓名"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-white border border-[#D2BCA6] rounded-xl p-2 text-xs text-[#4A3E3D]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A3E3D] font-bold mb-1">手機號碼：</label>
                      <input
                        type="tel"
                        placeholder="09xx-xxx-xxx"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full bg-white border border-[#D2BCA6] rounded-xl p-2 text-xs text-[#4A3E3D]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#F5EBE6] p-3 rounded-xl border border-[#E4D5C7] text-[11px] text-[#7A6A63] font-sans">
                  💡 送出預約申請後，咖啡館駐館助理將於 1 小時內透過簡訊/電話與您確認席位與特調飲品。
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingDiviner(null)}
                    className="px-4 py-2 bg-white border border-[#E4D5C7] rounded-xl text-xs font-bold text-[#7A6A63] hover:bg-[#E4D5C7]/30 cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-amber-700 to-[#A87C66] hover:from-amber-800 hover:to-[#8C5D43] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>確認送出預約</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 font-serif">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 border-2 border-emerald-300 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                  ✨
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#4A3E3D]">
                    預約申請已成功送出！
                  </h3>
                  <p className="text-xs text-[#A87C66] font-sans mt-1">
                    感謝您的預約，【{bookingDiviner.name}】的專屬席位保留確認中。
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E4D5C7] text-xs font-sans text-left space-y-1.5 text-[#5C4D4B]">
                  <div>📍 門市/形式：<strong>{consultType === 'store' ? bookingDiviner.storeLocation : '線上視訊專線'}</strong></div>
                  <div>📅 預約日期：<strong>{bookingDate} ({bookingTime})</strong></div>
                  <div>👤 預約客戶：<strong>{userName} ({userPhone})</strong></div>
                </div>

                <button
                  type="button"
                  onClick={() => { setBookingDiviner(null); setBookingSuccess(false); }}
                  className="px-6 py-2.5 bg-[#4A3E3D] text-[#FAF4F0] rounded-xl text-xs font-bold hover:bg-[#A87C66] transition-all cursor-pointer"
                >
                  關閉預約視窗
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
