import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { Card, getCardInterpretation } from '../cardData';
import shokoAvatarImg from '../assets/images/shoko_whisper_mode_1785157154222.jpg';

interface ShokoCompanionChatProps {
  matrixCards: (Card | null)[];
  userQuestion: string;
  readingMode: string;
  structureBreakdown: any;
  onClose: () => void;
}

interface Message {
  sender: 'shoko' | 'user';
  text: string;
  timestamp: Date;
}

export const ShokoCompanionChat: React.FC<ShokoCompanionChatProps> = ({
  matrixCards,
  userQuestion,
  readingMode,
  structureBreakdown,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    '我第一步能怎麼做？',
    '如何加深身心契合？',
    '怎麼做減少外在阻力？'
  ];

  const gifts = [
    '☕【翔子為你遞上一杯特調拿鐵】',
    '🍬【翔子為你遞上砂糖】',
    '🥄【翔子為你遞上攪拌棒】',
    '🍪【翔子為你遞上手作餅乾】',
    '🍲【翔子為你端上暖心茶泡飯】'
  ];

  // Generate initial personalized greeting based on user cards
  useEffect(() => {
    const greetingText = `我是牧之原翔子，「牧之原」休息站的牧之原、「天空飛翔之子」的翔子😇別彆扭了，說出來讓大姐姐聽聽吧～我會像陪伴庭安那樣，一直陪伴著你哦❤️`;

    setMessages([
      {
        sender: 'shoko',
        text: greetingText,
        timestamp: new Date()
      }
    ]);
  }, [userQuestion, matrixCards]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Generate localized intelligent response based on Nine-Grid Cards
  const generateFallbackResponse = (userMsg: string, gift: string): string => {
    const card2 = matrixCards[1]; // 現在意識
    const card5 = matrixCards[4]; // 核心現實
    const card8 = matrixCards[7]; // 現在行動

    let advice = '';

    if (userMsg.includes('第一步') || userMsg.includes('怎麼做') || userMsg.includes('行動')) {
      if (card8) {
        advice = `關於第一步，對照位置 8【現在行動】出現的【${card8.suit}${card8.rank}】，這代表您當前的關鍵能量！${getCardInterpretation(card8, '現在行動').text}\n\n具體建議：從小事切入，先調整心態並給自己 10 分鐘沉澱，專注於當下能控制的一小步，就能打開新的局勢。`;
      } else {
        advice = `第一步最重要的是先回歸當下的呼吸。先把紛亂的念頭放下一小會兒，為自己泡一杯溫熱的飲品，然後試著將心中的想法寫在紙上，釐清優先順序。`;
      }
    } else if (userMsg.includes('契合') || userMsg.includes('身心')) {
      if (card2 && card8) {
        advice = `對照位置 2【現在意識】的【${card2.suit}${card2.rank}】與位置 8【現在行動】的【${card8.suit}${card8.rank}】，關鍵在於讓「內在思考」與「外在行動」同頻共振。\n\n當您感到知行落差時，不妨微調腳步，讓行動為思想注入現實的力量。`;
      } else {
        advice = `身心契合的秘訣在於「誠實面對感受」。當想法與行動方向一致時，心靈自然會感到無比輕盈與安定。`;
      }
    } else if (userMsg.includes('阻力') || userMsg.includes('外在')) {
      if (card5) {
        advice = `看看位置 5【核心現實】的【${card5.suit}${card5.rank}】，外在環境的條件與限制其實也是養分的一種。\n\n別把限制當成牆壁，試著將它看作支撐您轉身跳躍的階梯吧！`;
      } else {
        advice = `減少外在阻力的第一步，是先分清「自己能控制的」與「無法控制的」。專注於自身能改變的部分，外在的迷霧自然會慢慢散開。`;
      }
    } else {
      const coreCard = card5 || card2 || card8 || matrixCards.find(Boolean);
      if (coreCard) {
        advice = `結合您抽到的【${coreCard.suit}${coreCard.rank}】，您現在正處於積蓄力量的關鍵時刻。${getCardInterpretation(coreCard, '關鍵能量').text}\n\n順應當下的韻律，像品嚐拿鐵一樣，細細感受每一層風味，答案就在您心中。`;
      } else {
        advice = `翔子聽到了您的心聲哦！無論眼前看似多麼迷茫，只要回到當下、相信自己的直覺，就一定能找到最適合自己的解答。`;
      }
    }

    return `${gift}\n\n${advice}`;
  };

  const sendUserMessage = async (msgText: string) => {
    if (!msgText.trim() || isTyping) return;

    setInputValue('');

    const newUserMessage: Message = {
      sender: 'user',
      text: msgText.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    const currentGift = gifts[turnCount % gifts.length];

    // Build rich context prompt for Gemini
    const chatHistory = messages
      .map((m) => `${m.sender === 'shoko' ? '翔子' : '使用者'}: ${m.text}`)
      .join('\n');

    const cardsText = matrixCards
      .map((c, i) => c ? `位置 ${i + 1}: ${c.suit}${c.rank}` : null)
      .filter(Boolean)
      .join(', ');

    const fullPrompt = `【測算脈絡】
使用者提問：${userQuestion || '今日指引'}
牌陣花色點數：${cardsText}
對話歷史：
${chatHistory}
使用者最新提問：${msgText}

【翔子此時的心意動作】
${currentGift}

請在 150 字內，以溫柔、專業、療癒且具洞察力的語氣回答使用者。將占卜的意識、現實或行為構面與拿鐵咖啡的意象融合，給予可行的具體實操小步驟。`;

    const systemInstruction = `你是心靈拿鐵相談室的親切店員翔子，性格溫柔隨和且極具客觀洞察力。你擅長以溫暖客觀的語氣，將九宮格占卜的構面（意識、現實、行為）與落差分析，轉化為具體可行的行動建議與心靈陪伴。每次回答必須簡潔有條理（不超過 180 字），字裡行間透著咖啡香氣與對當下的專注。`;

    let shokoText = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          systemInstruction
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.text) {
          shokoText = `${currentGift}\n\n${data.text}`;
        } else {
          shokoText = generateFallbackResponse(msgText, currentGift);
        }
      } else {
        shokoText = generateFallbackResponse(msgText, currentGift);
      }
    } catch (err) {
      console.error('Chat API error:', err);
      shokoText = generateFallbackResponse(msgText, currentGift);
    } finally {
      const shokoResponse: Message = {
        sender: 'shoko',
        text: shokoText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, shokoResponse]);
      setTurnCount((prev) => prev + 1);
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserMessage(inputValue);
  };

  return (
    <div className="bg-white border-2 border-[#A87C66]/40 rounded-2xl shadow-md overflow-hidden flex flex-col h-[540px] max-w-4xl mx-auto">
      {/* Header bar */}
      <div className="bg-[#4A3E3D] px-4 py-3 flex items-center justify-between border-b border-[#A87C66]/20">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={shokoAvatarImg}
              alt="Shoko Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#E4D5C7]"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
          </div>
          <div className="text-left">
            <h3 className="font-extrabold text-sm text-[#FAF4F0] font-serif flex items-center gap-1">
              <span>牧之原翔子</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Green light status indicator */}
          <div className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-400/40 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>上線中</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#FAF4F0]/60 space-y-3.5 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            {m.sender === 'shoko' ? (
              <img
                src={shokoAvatarImg}
                alt="Shoko"
                className="w-8 h-8 rounded-full object-cover border border-[#D2BCA6]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#A87C66] text-[#FAF4F0] flex items-center justify-center text-xs font-bold shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}

            {/* Bubble */}
            <div className="max-w-[75%] space-y-1">
              <div
                className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-3xs text-left ${
                  m.sender === 'user'
                    ? 'bg-[#A87C66] text-white rounded-tr-none'
                    : 'bg-white text-[#4A3E3D] border border-[#E4D5C7] rounded-tl-none font-serif'
                }`}
              >
                {m.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                    {line}
                  </p>
                ))}
              </div>
              <span className={`text-[9px] text-[#7A6A63] font-mono block ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {m.timestamp.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <img
              src={shokoAvatarImg}
              alt="Shoko"
              className="w-8 h-8 rounded-full object-cover border border-[#D2BCA6]"
              referrerPolicy="no-referrer"
            />
            <div className="bg-white border border-[#E4D5C7] p-3 rounded-2xl rounded-tl-none shadow-3xs flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-[#A87C66] rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-[#A87C66] rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-[#A87C66] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Preset Question Chips Bar */}
      <div className="px-3 py-2 bg-[#FAF4F0] border-t border-[#E4D5C7]/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-[#A87C66] shrink-0 font-serif flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          預設提問：
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {presetQuestions.map((qText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendUserMessage(qText)}
              disabled={isTyping}
              className="text-xs bg-white text-[#4A3E3D] hover:bg-[#A87C66] hover:text-white border border-[#D2BCA6] px-2.5 py-1 rounded-full whitespace-nowrap transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50 font-medium"
            >
              {qText}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-white border-t border-[#E4D5C7] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="我第一步能怎麼做？"
          className="flex-1 bg-[#FAF4F0] border-2 border-[#D2BCA6] rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#4A3E3D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A87C66]"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className={`p-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-white shadow-xs ${
            inputValue.trim() && !isTyping
              ? 'bg-[#A87C66] hover:bg-[#8C5C42]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

