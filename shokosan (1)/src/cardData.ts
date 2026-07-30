export interface Card {
  suit: '黑桃' | '紅心' | '方塊' | '梅花';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
}

export interface GridPosition {
  id: number;
  name: string;
  role: string;
}

export const GRID_POSITIONS: GridPosition[] = [
  { id: 1, name: '過去意識', role: '過去在心智層面積累的思考習慣與信念起點' },
  { id: 2, name: '現在意識', role: '您此刻的核心思考與理智焦點' },
  { id: 3, name: '未來意識', role: '指向您潛意識對未來的期待、理想藍圖與願景遠景' },
  { id: 4, name: '隱蔽現實', role: '過往外部給予的條件限制、舊有資源或既有框架條件' },
  { id: 5, name: '核心現實', role: '由現在行動所導致的現狀，代表當前的實際算牌結果' },
  { id: 6, name: '未來現實', role: '最後導致的未來局勢結果，需要未來行動來配合顯化' },
  { id: 7, name: '過去作為', role: '您過去習慣採取的行動路徑與舊有執行方式' },
  { id: 8, name: '現在行動', role: '您當前採取的具體行動，是導致當前核心現實的根本原因' },
  { id: 9, name: '未來作為', role: '要達成理想的未來局勢，您所需要採取的關鍵未來行動' }
];

export const SUIT_TAROT_MAP = {
  '黑桃': { name: '寶劍', icon: '♠' },
  '紅心': { name: '聖杯', icon: '♥' },
  '方塊': { name: '星幣', icon: '♦' },
  '梅花': { name: '權杖', icon: '♣' }
};

export const RANK_TAROT_MAP = {
  'A': '王牌',
  '2': '二號牌',
  '3': '三號牌',
  '4': '四號牌',
  '5': '五號牌',
  '6': '六號牌',
  '7': '七號牌',
  '8': '八號牌',
  '9': '九號牌',
  '10': '十號牌',
  'J': '侍從',
  'Q': '王后',
  'K': '國王'
};

export function getCardInterpretation(card: Card, role: string): { text: string } {
  let suitDesc = '';
  switch (card.suit) {
    case '黑桃':
      suitDesc = '此能量象徵**理性的思辨與思維磨練**，提示當前心智活動頻繁，需以冷靜、客觀的態度看清迷霧。';
      break;
    case '紅心':
      suitDesc = '此能量關乎**直覺引領與情感共鳴**，象徵內心深處的真實渴望、情緒流動與溫柔對接。';
      break;
    case '方塊':
      suitDesc = '此能量代表**現實資源整合與物質穩固**，象徵具體成果、實質利益與穩定的基底。';
      break;
    case '梅花':
      suitDesc = '此能量蘊含**充沛行動力與全新開創**，象徵意志實踐、熱情探索與大膽跨出步伐。';
      break;
  }

  let rankDesc = '';
  if (card.rank === 'A') {
    rankDesc = '代表**全新起點與純粹能量**的降臨，充滿無限潛能，生命種子正在發芽。';
  } else if (['2', '3', '4'].includes(card.rank)) {
    rankDesc = '正處於**奠基、初步選擇與維持平衡**的穩定階段，能量穩步在內部流動。';
  } else if (['5', '6', '7'].includes(card.rank)) {
    rankDesc = '面臨**瓶頸與轉折**，需要做出重要選擇或克服眼前的波折阻礙。';
  } else if (['8', '9', '10'].includes(card.rank)) {
    rankDesc = '能量已累積至**成熟飽和與收穫階段**，迎來功德圓滿或重要的階段性收尾。';
  } else {
    rankDesc = '代表**關鍵影響力人物**或您內在需要被喚醒的某種人格特質（如冷靜、實幹或熱情）。';
  }

  const text = `${suitDesc}${rankDesc}`;

  return { text };
}

export function extractOptionsFromText(text: string): string[] {
  if (!text) return [];

  let cleanText = text.trim();

  // Strip prefix noise
  cleanText = cleanText.replace(/^(請問|到底要|想問|如果|考慮|糾結於|要在|到底該|我該|想知道|評估|選擇|到底|究竟)+/g, '').trim();

  // Strip suffix noise
  cleanText = cleanText.replace(/(哪個好|比較好|比較合適|合適|好呢|呢|嗎|哪個|該選哪一個|應該選哪個|哪一個|如何選擇|怎麼選|選哪種|選哪個|哪個比較好|\?|？|!|！)+$/g, '').trim();

  // Universal regex splitting for multiple separators
  const parts = cleanText
    .split(/(?:還是要|還是選擇|或者是|或是說|還是|或者|或是|對比|\bvs\b|\bVS\b|[、,，/&+]|\s+)+/i)
    .map(p => {
      return p
        .trim()
        .replace(/^(請問|到底要|想問|如果|考慮|糾結於|要在|到底該|我該|想知道|評估|選擇|到底|究竟)+/g, '')
        .replace(/(哪個好|比較好|比較合適|合適|好呢|呢|嗎|哪個|該選哪一個|應該選哪個|哪一個|如何選擇|怎麼選|選哪種|選哪個|哪個比較好|\?|？|!|！)+$/g, '')
        .trim();
    })
    .filter(p => p.length > 0 && p.length < 30);

  // Return unique non-empty items
  return Array.from(new Set(parts));
}

export function getQuickAnswerData(matrixCards: (Card | null)[], userQuestion: string, readingMode: string, customOptionsList?: string[]) {
  const activeCards = matrixCards.filter((c): c is Card => c !== null);
  const heartsCount = activeCards.filter(c => c.suit === '紅心').length;
  const spadesCount = activeCards.filter(c => c.suit === '黑桃').length;
  const diamondsCount = activeCards.filter(c => c.suit === '方塊').length;
  const clubsCount = activeCards.filter(c => c.suit === '梅花').length;

  const options = (customOptionsList && customOptionsList.length > 0)
    ? customOptionsList.map(o => o.trim()).filter(Boolean)
    : extractOptionsFromText(userQuestion);

  const baseScore = Math.min(92, Math.max(50, Math.round(55 + (heartsCount * 5) + (diamondsCount * 5) + (clubsCount * 3) - (spadesCount * 2))));

  const optionBreakdowns = options.map((opt, idx) => {
    let hash = 0;
    for (let i = 0; i < opt.length; i++) {
      hash = (hash << 5) - hash + opt.charCodeAt(i);
      hash |= 0;
    }
    const cardPosInfluence = activeCards[idx % (activeCards.length || 1)];
    let cardBonus = 0;
    if (cardPosInfluence) {
      if (cardPosInfluence.suit === '紅心') cardBonus += 12;
      else if (cardPosInfluence.suit === '方塊') cardBonus += 8;
      else if (cardPosInfluence.suit === '梅花') cardBonus += 4;
      else cardBonus -= 4;
    }
    const variance = (Math.abs(hash) % 17) - 8 + cardBonus;
    const score = Math.min(99, Math.max(38, Math.round(baseScore + variance)));
    return { name: opt, score };
  });

  const sortedOptions = [...optionBreakdowns].sort((a, b) => b.score - a.score);
  const bestOption = sortedOptions.length > 0 ? sortedOptions[0] : null;

  let verdictTag = '時空重力平衡';
  let headlineVerdict = '九宮格能量波幅相對穩定，正是靜心覺察的最佳時機。';
  let directAnswerSummary = '您的算牌結果顯示：當前局勢是由您過去的一貫思維與現實框架共同塑造成的。核心的落差在於「意識的理想」與「現實的行動」沒有完全對齊。不必焦慮，先回到當下。';
  let keyTakeaway = '在日常生活中，為自己保留 5 分鐘的深呼吸與一杯溫熱拿鐵的時間。只做一件當下能立即完成的小事，就能逐步啟動好運。';

  let verdictBadgeStyle = { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' };

  if (spadesCount > 3) {
    verdictTag = '理性思維激盪';
    headlineVerdict = '心智與理性的能量十分高昂，需防範過度思考與自我焦慮。';
    directAnswerSummary = '寶劍（黑桃）能量極強，代表您正經歷激烈的思想鬥爭或高度專注。這雖能提供冷靜的智力，但也容易帶來心理內耗。此時您最需要的是關閉過多的平行線索，直接著眼於現實執行。';
    keyTakeaway = '將腦海中所有的擔憂寫在紙上，只挑出一個「當下可以立即採取行動」的具體事項，其餘的先放下。';
    verdictBadgeStyle = { bg: 'bg-slate-150', text: 'text-slate-800', border: 'border-slate-300' };
  } else if (heartsCount > 3) {
    verdictTag = '情感直覺湧現';
    headlineVerdict = '內在的情感起伏與直覺敏銳度極高，順應內心深處的感召。';
    directAnswerSummary = '聖杯（紅心）能量占優，代表您在此事中寄託了深厚的情感，極在乎和諧與心理感受。不要忽視您的直覺與身體感受，它們是引領您走出目前迷霧的關鍵。';
    keyTakeaway = '找個安靜的角落，靜靜喝一杯拿鐵，聽聽自己內心最真實的聲音。允許自己有軟弱與遲疑，用溫柔寬容的態度來對待當下的局勢。';
    verdictBadgeStyle = { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300' };
  } else if (diamondsCount > 3) {
    verdictTag = '現實顯化交織';
    headlineVerdict = '物質、資源與現實基礎相當穩固，宜採取最務實的行動。';
    directAnswerSummary = '星幣（方塊）能量占主導，這是一個非常務實的信號！表明此事有很好的物質資源、既定規則或健康狀態作為支撐。此時不需要過多抽象的討論，只要按照既定日程表與具體步驟推進，就能取得良好回報。';
    keyTakeaway = '制定一張極其精準、量化的每日任務表。專注於眼前看得見、摸得著的實際成效，用成果來回答一切疑問。';
    verdictBadgeStyle = { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' };
  } else if (clubsCount > 3) {
    verdictTag = '行動開創先鋒';
    headlineVerdict = '靈魂深處的意志與行動力被點燃，正是跨越邊界的契機。';
    directAnswerSummary = '權杖（梅花）能量高漲，預示著改變的渴望正在甦醒。當前局勢之所以停滯不前，不是因為做不到，而是因為等待了太久。這是在呼喚您拿出勇氣，大膽且堅定地踏出第一步。';
    keyTakeaway = '今天就做一個以往一直猶豫不決的決定。不管是主動聯絡某人還是啟動新計劃，行動將為您創造意想不到的轉運奇蹟。';
    verdictBadgeStyle = { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' };
  }

  return {
    verdictTag,
    headlineVerdict,
    directAnswerSummary,
    keyTakeaway,
    verdictBadgeStyle,
    options,
    optionBreakdowns,
    bestOption
  };
}

export function getCardMagicMagic(card: Card): string {
  if (card.suit === '梅花' && card.rank === '9') {
    return '保持彈性調整心態，主動適應改變';
  }
  if (card.suit === '黑桃' && card.rank === '10') {
    return '需要作中重大進階轉變的時刻';
  }

  const rankStr = card.rank;
  switch (card.suit) {
    case '黑桃':
      if (rankStr === 'A') return '勇敢看清迷霧，冷靜剖析現狀，做出理性的斷捨離。';
      if (['2', '3', '4'].includes(rankStr)) return '冷靜思考理清頭緒，在紛雜的想法中尋求心智平衡。';
      if (['5', '6', '7'].includes(rankStr)) return '在理智拉扯中看清迷霧，勇敢做出必要的冷靜調整。';
      if (['8', '9', '10'].includes(rankStr)) return '能量已累積至極高點，面臨需要做出重大理智轉變的時刻。';
      return '喚醒內在冷靜的思維與精準判斷力，用智慧與理智看透現狀。';
      
    case '紅心':
      if (rankStr === 'A') return '傾聽內心最初的渴望，向內探索直覺，開啟溫柔的自我關懷對話。';
      if (['2', '3', '4'].includes(rankStr)) return '關照身邊的人際共鳴，在溫柔的互動與滋養中維持情感和諧。';
      if (['5', '6', '7'].includes(rankStr)) return '接納自身情緒的起伏與脆弱，重拾對內在靈魂與美感的溫柔信任。';
      if (['8', '9', '10'].includes(rankStr)) return '情感與直覺的能量極其豐沛，傾聽內心最真實的聲音，擁抱圓滿。';
      return '展現內在的慈愛、包容與溫柔，用直覺與美感共情去療癒周遭。';
      
    case '方塊':
      if (rankStr === 'A') return '腳踏實地制定新計劃，專注於那些能帶來實質改變與成長的方案。';
      if (['2', '3', '4'].includes(rankStr)) return '專注於眼前看得到、拿得著的實際成效，腳踏實地穩步累積成果。';
      if (['5', '6', '7'].includes(rankStr)) return '在變動中尋找物質或技能的微調空間，務實整合手邊的所有資源。';
      if (['8', '9', '10'].includes(rankStr)) return '物質基礎與具體成果已然穩固，大膽顯化更有價值的終極方案。';
      return '調動實幹家精神，發揮穩健務實的人格特質，逐步解鎖並整合資源。';
      
    case '梅花':
      if (rankStr === 'A') return '主動出擊探索未知，點燃心中的熱情與意志，大膽開創前路。';
      if (['2', '3', '4'].includes(rankStr)) return '維持穩定前進的意志，協調資源與行動力，為目標奠定穩固基礎。';
      if (['5', '6', '7'].includes(rankStr)) return '保持彈性調整心態，主動適應改變，用意志力克服當前瓶頸。';
      if (['8', '9', '10'].includes(rankStr)) return '行動力與意志達到頂峰，保持對當下行動的專注並勇敢跨越邊界。';
      return '啟動內在的領袖野心與冒險精神，用飽滿的熱情主動領導開創新局。';
  }
}

export function getShokoMagicDialogue(card: Card): string {
  let baseMagic = getCardMagicMagic(card).trim();
  if (!baseMagic.endsWith('。')) {
    baseMagic += '。';
  }
  
  let content = '';
  if (card.suit === '黑桃') {
    content = `${baseMagic}理智可以幫您看清迷霧，找回最清晰的判斷力喔 ✨`;
  } else if (card.suit === '紅心') {
    content = `${baseMagic}試著傾聽直覺並接納情緒，對自己溫柔一點吧 ✨`;
  } else if (card.suit === '方塊') {
    content = `${baseMagic}一步步踩穩步伐，物質與成果自然會順利顯化 ✨`;
  } else { // 梅花
    content = `${baseMagic}拿出行動力，大膽踏出第一步去開創新局 ✨`;
  }
  
  content = content.replace(/。。/g, '。');
  return `「${content}」`;
}

export function getNineGridStructureBreakdown(matrixCards: (Card | null)[]) {
  const activeCards = matrixCards.filter((c): c is Card => c !== null);
  if (activeCards.length === 0) return null;

  return {
    consciousnessAxis: {
      name: '腦力意識流',
      subtitle: '橫向軸 P1-P2-P3：解碼您的思考軌跡、預期與信念起點。',
      summary: '代表您在此事上的思考核心。若此處充斥寶劍，說明腦力內耗嚴重，需要平復思緒。若為聖杯，則代表富含理想與情感寄託。',
      evidence: `已啟動 ${matrixCards[0] ? 'P1' : ''} ${matrixCards[1] ? 'P2' : ''} ${matrixCards[2] ? 'P3' : ''} 空間意識波幅。`
    },
    realityAxis: {
      name: '現實資源流',
      subtitle: '橫向軸 P4-P5-P6：揭示隱蔽資源、當前局面與未來結果。',
      summary: '核心現狀是由您與周邊資源的拉扯決定的。隱蔽現實中的條件（位置 4）通常是不易察覺的基石，而未來現實（位置 6）則是需要積極引導的目標。',
      evidence: `已啟動 ${matrixCards[3] ? 'P4' : ''} ${matrixCards[4] ? 'P5' : ''} ${matrixCards[5] ? 'P6' : ''} 物質波幅顯化。`
    },
    actionAxis: {
      name: '行為行動流',
      subtitle: '橫向軸 P7-P8-P9：貫穿過去習慣、當前具體實踐與未來策略。',
      summary: '行動是唯一能打破意識與現實落差的橋樑。您當前採取的現在行動（位置 8）是因果之所在。如果與現在意識（位置 2）不符，就會形成思緒VS行動的落差。',
      evidence: `已啟動 ${matrixCards[6] ? 'P7' : ''} ${matrixCards[7] ? 'P8' : ''} ${matrixCards[8] ? 'P9' : ''} 意志實踐波。`
    },
    coreColumn: {
      name: '命運奇異柱',
      subtitle: '縱向軸 P2-P5-P8：貫穿此刻思維、當前現狀與實踐。',
      summary: '這是九宮格的精髓。頂端是您此刻所想，中段是您此刻所得，底端是您此刻所做。當這三個點花色相合、點數和諧時，即達成完美的「時空共鳴」狀態，萬事皆順。',
      evidence: `已啟動 ${matrixCards[1] ? 'P2' : ''} ${matrixCards[4] ? 'P5' : ''} ${matrixCards[7] ? 'P8' : ''} 核心引力共振。`
    },
    gaps: {
      knowDoGap: {
        title: '思緒VS行動（意識構面 ↔ 行為構面）',
        levelTag: '輕微失調',
        description: '此裂痕代表您的核心思考（現在意識）與實際行動（現在行動）之間的差距。若意識與行動不一，會感到思慮過度或焦慮。',
        actionPush: '嘗試為自己制定一個最簡單的 5 分鐘具體小行動，不要只停留在腦袋中思考。',
        evidence: '位置 2【現在意識】與位置 8【現在行動】之能量對照。',
        badgeStyle: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' }
      },
      beliefRealityGap: {
        title: '信念VS現實（預期構面 ↔ 結果構面）',
        levelTag: '輕微失調',
        description: '此裂痕代表您潛意識中對未方的期望（未來意識）與當前現實結果（核心現實）之間的拉扯與張力。',
        actionPush: '重新評估您的期望是否契合當前現狀，在現實中找到一個微小的著力點，逐步顯化理想。',
        evidence: '位置 3【未來意識】與位置 5【核心現實】之能量對照。',
        badgeStyle: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' }
      },
      actionEnvGap: {
        title: '掛念VS行動（行為構面 ↔ 環境構面）',
        levelTag: '輕微失調',
        description: '此裂痕代表您目前採取的具體行動與外部給予的條件限制、舊有既定框架（隱蔽現實）之間的張力。',
        actionPush: '審視外部限制，善用隱蔽現實中被遺忘的舊有資源，將外部阻力轉化為前進的推力。',
        evidence: '位置 4【隱蔽現實】與位置 8【現在行動】之能量對照。',
        badgeStyle: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' }
      }
    }
  };
}

export function generateReadingReport(matrixCards: (Card | null)[], userQuestion: string, readingMode: string, customOptions?: string[]): string {
  const dateStr = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  const activeCount = matrixCards.filter(Boolean).length;
  
  let reportText = `☕【心靈拿鐵 ‧ 時空九宮格占卜純文字深度報告】☕
📅 占卜日期：${dateStr}
❓ 測算提問：${userQuestion.trim() || '今日時空與命運指引'}
🔮 占卜模式：${readingMode === 'decision' ? '二選一 / 多選項決策模式' : readingMode === 'luck' ? '今日運勢轉運模式' : '心靈對焦模式'}
==================================================

📋【時空九宮格牌面詳情】(共指定 ${activeCount} 張卡牌)
`;

  GRID_POSITIONS.forEach((pos, idx) => {
    const card = matrixCards[idx];
    if (card) {
      const suitInfo = SUIT_TAROT_MAP[card.suit];
      const rankName = RANK_TAROT_MAP[card.rank];
      const interpretation = getCardInterpretation(card, pos.role);
      
      reportText += `
--------------------------------------------------
📌 位置 ${pos.id}【${pos.name}】
🃏 出現卡牌：${card.suit}${card.rank} (${suitInfo.icon} ${card.suit})
🔮 塔羅對應：${suitInfo.name} ${rankName}
🧭 空間角色：${pos.role}
💬 深度解讀：${interpretation.text}
`;
    } else {
      reportText += `
--------------------------------------------------
📌 位置 ${pos.id}【${pos.name}】
🃏 出現卡牌：[未指定]
`;
    }
  });

  const quickAnswer = getQuickAnswerData(matrixCards, userQuestion, readingMode, customOptions);
  
  reportText += `
==================================================
✨【時空波幅與解答總評】
🌟 總評標籤：【${quickAnswer.verdictTag}】
💬 時空宣告：${quickAnswer.headlineVerdict}

💡 直擊解答與局勢透析：
${quickAnswer.directAnswerSummary}
`;

  if (quickAnswer.optionBreakdowns && quickAnswer.optionBreakdowns.length > 0) {
    reportText += `
🎯 多選項時空契合度評估：
`;
    quickAnswer.optionBreakdowns.forEach((opt, idx) => {
      const isBest = quickAnswer.bestOption && quickAnswer.bestOption.name === opt.name;
      reportText += `  ${idx + 1}. 【${opt.name}】：${opt.score}% 契合度 ${isBest ? '🏆 (首選推薦)' : ''}\n`;
    });
  }

  reportText += `
🧭 翔子的生活具體行動指引：
${quickAnswer.keyTakeaway}

==================================================
☕ 心靈拿鐵 Café ‧ 祝您今日安好 ☕
「無論抽到什麼牌，只要為自己調配一杯熱騰騰的拿鐵，回到當下，您便掌握了顯化命運的開關。」`;

  return reportText;
}
