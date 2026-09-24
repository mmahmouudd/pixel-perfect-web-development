import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Moon, 
  Sun, 
  Globe, 
  Play, 
  Pause, 
  BookOpen, 
  Check, 
  X, 
  Sparkles, 
  GitCompare, 
  Mic,
  Mic2,
  ChevronDown,
  ChevronLeft
} from 'lucide-react';
import { 
  SURAHS_DATA, 
  RECITERS_LIST, 
  SUPPORTED_LANGUAGES, 
  QIRAAT_INFO,
  type Verse,
  type WordDiff,
  type Reciter,
  getAyahAudioUrl,
  getAyahFallbackAudioUrl
} from '../data/quranData';
import { ReciterSelectorModal } from './ReciterSelectorModal';
import { AudioPlayerBar } from './AudioPlayerBar';

interface QuranPlatformProps {
  initialFocusVerse?: number | null;
  onCloseFocus?: () => void;
}

export const QuranPlatform: React.FC<QuranPlatformProps> = ({ 
  initialFocusVerse 
}) => {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'home' | 'compare' | 'reader' | 'languages'>('home');
  const [selectedSurahIndex, setSelectedSurahIndex] = useState(0);
  const [selectedRiwayah, setSelectedRiwayah] = useState<'hafs' | 'warsh' | 'compare'>('compare');
  const [selectedLanguage, setSelectedLanguage] = useState('ar');
  const [themeMode, setThemeMode] = useState<'emerald-dark' | 'obsidian-gold' | 'parchment'>('emerald-dark');
  
  // Drawer & Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isReciterModalOpen, setIsReciterModalOpen] = useState(false);
  const [selectedWordDiff, setSelectedWordDiff] = useState<WordDiff | null>(null);
  const [showTafsirForVerse, setShowTafsirForVerse] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciterId, setCurrentReciterId] = useState('alafasy');
  const [currentPlayingVerseIndex, setCurrentPlayingVerseIndex] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [isRepeatAyah, setIsRepeatAyah] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Surah & Verse data
  const currentSurah = SURAHS_DATA[selectedSurahIndex];
  const currentReciter = RECITERS_LIST.find(r => r.id === currentReciterId) || RECITERS_LIST[0];

  // If chat jumped to a specific verse
  useEffect(() => {
    if (initialFocusVerse) {
      setActiveTab('compare');
      const verseObj = currentSurah.verses.find(v => v.number === initialFocusVerse);
      if (verseObj && verseObj.diffs && verseObj.diffs.length > 0) {
        setSelectedWordDiff(verseObj.diffs[0]);
      }
    }
  }, [initialFocusVerse, currentSurah]);

  // Audio player synchronization with dynamic reciter URL
  const playVerse = (verseIndex: number, overrideReciterId?: string) => {
    setCurrentPlayingVerseIndex(verseIndex);
    setIsPlaying(true);
    if (audioRef.current) {
      const reciterIdToUse = overrideReciterId || currentReciterId;
      const targetVerse = currentSurah.verses[verseIndex];
      const audioUrl = getAyahAudioUrl(reciterIdToUse, currentSurah.number, targetVerse.number);
      
      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = audioSpeed;
      
      audioRef.current.play().catch(e => {
        console.warn('Audio play failed, attempting fallback URL:', e);
        if (audioRef.current) {
          audioRef.current.src = getAyahFallbackAudioUrl(currentSurah.number, targetVerse.number);
          audioRef.current.playbackRate = audioSpeed;
          audioRef.current.play().catch(err => console.error('Fallback audio failed:', err));
        }
      });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playVerse(currentPlayingVerseIndex);
    }
  };

  const handleNextVerse = () => {
    if (isRepeatAyah) {
      playVerse(currentPlayingVerseIndex);
      return;
    }
    if (currentPlayingVerseIndex < currentSurah.verses.length - 1) {
      playVerse(currentPlayingVerseIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevVerse = () => {
    if (currentPlayingVerseIndex > 0) {
      playVerse(currentPlayingVerseIndex - 1);
    }
  };

  const handleAudioEnded = () => {
    handleNextVerse();
  };

  // Reciter Selection Callback
  const handleSelectReciter = (reciter: Reciter) => {
    setCurrentReciterId(reciter.id);
    setToastMessage(`تم التبديل بنجاح إلى: ${reciter.nameAr} (${reciter.riwayah})`);
    setTimeout(() => setToastMessage(null), 3500);

    // If currently playing, smoothly switch audio stream for the current ayah
    if (isPlaying) {
      playVerse(currentPlayingVerseIndex, reciter.id);
    }
  };

  const toggleTheme = () => {
    if (themeMode === 'emerald-dark') setThemeMode('obsidian-gold');
    else if (themeMode === 'obsidian-gold') setThemeMode('parchment');
    else setThemeMode('emerald-dark');
  };

  // Helper for rendering verse text with interactive highlighted differences
  const renderVerseWords = (verse: Verse, riwayah: 'hafs' | 'warsh') => {
    const text = riwayah === 'hafs' ? verse.textHafs : verse.textWarsh;
    const words = text.split(' ');

    return (
      <span className="leading-loose inline">
        {words.map((word, wIdx) => {
          const hasDiff = verse.diffs?.some(d => d.wordIndex === wIdx);
          const diffItem = verse.diffs?.find(d => d.wordIndex === wIdx);

          if (hasDiff && diffItem) {
            const isSelected = selectedWordDiff === diffItem;
            return (
              <button
                key={wIdx}
                type="button"
                onClick={() => setSelectedWordDiff(diffItem)}
                className={`inline-block mx-1 px-1.5 py-0.5 rounded transition-all cursor-pointer font-bold ${
                  riwayah === 'hafs'
                    ? isSelected 
                      ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300 shadow-lg' 
                      : 'bg-amber-950/70 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60'
                    : isSelected
                      ? 'bg-emerald-400 text-stone-950 ring-2 ring-emerald-300 shadow-lg'
                      : 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60'
                }`}
                title={`انقر لمطالعة الفرق: ${diffItem.hafs} / ${diffItem.warsh}`}
              >
                {word}
              </button>
            );
          }

          return (
            <span key={wIdx} className="inline-block mx-0.5">
              {word}
            </span>
          );
        })}
      </span>
    );
  };

  // Background style based on theme
  const getThemeContainerClass = () => {
    if (themeMode === 'parchment') {
      return 'bg-[#f8f5ee] text-stone-900';
    }
    if (themeMode === 'obsidian-gold') {
      return 'bg-[#0b0c0e] text-zinc-100';
    }
    return 'islamic-pattern text-zinc-100';
  };

  return (
    <div className={`relative w-full h-full min-h-screen overflow-y-auto flex flex-col transition-colors duration-300 ${getThemeContainerClass()}`} dir="rtl">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
      />

      {/* Floating Toast Notification on Reciter Change */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-[#121f28]/95 border border-amber-400/50 shadow-2xl shadow-black/80 text-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-cairo backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 flex-1 flex flex-col">
        {/* Top Navbar Card matching screenshot */}
        <header className="w-full bg-[#11191f]/85 backdrop-blur-md rounded-2xl border border-white/10 p-3 sm:px-5 flex items-center justify-between shadow-xl shadow-black/40 mb-6">
          {/* Right Side in RTL: Golden Star Emblem & Brand Title */}
          <div className="flex items-center gap-3.5">
            {/* Luminous Golden 8-Point Rub-el-Hizb Star Icon on the far right */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1c2830] to-[#141d24] border border-amber-500/30 flex items-center justify-center shadow-md shadow-amber-500/10">
              <svg 
                className="w-6 h-6 text-amber-400 fill-amber-400/20" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                {/* 8-pointed star / Rub el Hizb geometry */}
                <polygon points="12,2 15,6.5 20,4 17.5,9 22,12 17.5,15 20,20 15,17.5 12,22 9,17.5 4,20 6.5,15 2,12 6.5,9 4,4 9,6.5" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
            </div>

            <div className="text-right">
              <h1 className="font-cinzel text-lg sm:text-xl font-semibold tracking-wide text-amber-100/90 leading-tight">
                Nūr al-Qirā&apos;āt
              </h1>
              <p className="text-[11px] sm:text-xs text-amber-200/60 font-cairo font-medium">
                القرآن الكريم بالقراءات
              </p>
            </div>
          </div>

          {/* Left Side in RTL: Action Controls (Globe AR, Theme Moon, Hamburger) */}
          <div className="flex items-center gap-2">
            {/* Quick Reciter Modal Trigger Button */}
            <button
              onClick={() => setIsReciterModalOpen(true)}
              className="h-10 px-3 rounded-xl bg-[#19242c] hover:bg-[#22323e] border border-white/5 flex items-center gap-2 text-zinc-300 hover:text-white transition-all shadow-sm group"
              title="تغيير القارئ والرواية"
            >
              <div className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                {currentReciter.avatarInitials}
              </div>
              <span className="text-xs font-cairo font-medium hidden sm:inline group-hover:text-amber-300">
                {currentReciter.nameAr.split(' ')[0]} {currentReciter.nameAr.split(' ')[1] || ''}
              </span>
              <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-amber-400" />
            </button>

            {/* Globe Toggle with "AR" Badge */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="relative h-10 px-3 rounded-xl bg-[#19242c] hover:bg-[#22323e] border border-white/5 flex items-center gap-1.5 text-zinc-300 hover:text-white transition-all shadow-sm"
              title="اختر لغة الواجهة والترجمة"
            >
              <Globe className="w-4 h-4 text-zinc-300" />
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded-md border border-amber-500/30">
                {selectedLanguage.toUpperCase()}
              </span>
            </button>

            {/* Dark/Theme Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-[#19242c] hover:bg-[#22323e] border border-white/5 flex items-center justify-center text-zinc-300 hover:text-amber-300 transition-all shadow-sm"
              title={`تبديل المظهر: ${themeMode}`}
            >
              {themeMode === 'parchment' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-10 h-10 rounded-xl bg-[#19242c] hover:bg-[#22323e] border border-white/5 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm"
              title="القائمة والخيارات"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-[#121a20]/90 rounded-xl border border-white/5 mb-5 max-w-md mx-auto text-xs font-cairo">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
              activeTab === 'home' 
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            الرئيسية والمزايا
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'compare' 
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>مقارنة الروايات</span>
          </button>
          <button
            onClick={() => setActiveTab('reader')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'reader' 
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' 
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>المصحف المرتل</span>
          </button>
        </div>

        {/* SECTION 1: Exact 3 Cards shown in screenshot */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Card 1: مقارنة الروايات كلمةً بكلمة */}
            <div 
              onClick={() => setActiveTab('compare')}
              className="group relative bg-[#0e171d]/90 hover:bg-[#121d25] border border-white/5 hover:border-amber-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer shadow-lg shadow-black/30 hover:shadow-amber-500/5 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                {/* Icon Container on Far Right in RTL */}
                <div className="w-12 h-12 rounded-xl bg-[#142129] border border-white/10 flex items-center justify-center flex-shrink-0 text-zinc-300 group-hover:text-amber-300 group-hover:border-amber-500/30 transition-all shadow-inner">
                  <svg 
                    className="w-5 h-5" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  >
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </svg>
                </div>

                {/* Text Content to Left of Icon */}
                <div className="flex-1 text-right">
                  <h2 className="text-base sm:text-lg font-bold font-cairo text-zinc-100 group-hover:text-amber-200 transition-colors mb-1.5">
                    مقارنة الروايات كلمةً بكلمة
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-cairo leading-relaxed">
                    تُصطف الروايات آية بآية وتُميّز الكلمات المختلفة، فلا يفوتك موضع اختلاف.
                  </p>
                </div>
              </div>

              {/* Interactive badge preview hint */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-cairo text-zinc-400">
                <span className="flex items-center gap-1.5 text-amber-400/90 font-medium group-hover:translate-x-[-4px] transition-transform">
                  استكشف اختلاف (مَالِكِ / مَلِكِ) في سورة الفاتحة &larr;
                </span>
                <span className="text-[11px] bg-amber-950/40 text-amber-300/80 px-2 py-0.5 rounded border border-amber-500/20">
                  حفص &bull; ورش &bull; قالون &bull; الدوري
                </span>
              </div>
            </div>

            {/* Card 2: تلاوة آية بآية */}
            <div 
              onClick={() => {
                setActiveTab('reader');
                playVerse(0);
              }}
              className="group relative bg-[#0e171d]/90 hover:bg-[#121d25] border border-white/5 hover:border-emerald-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer shadow-lg shadow-black/30 hover:shadow-emerald-500/5 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                {/* Right-aligned Icon Container with Glowing Green Microphone */}
                <div className="w-12 h-12 rounded-xl bg-[#142129] border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400 group-hover:text-emerald-300 transition-all shadow-inner shadow-emerald-500/10">
                  <Mic className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-right">
                  <h2 className="text-base sm:text-lg font-bold font-cairo text-zinc-100 group-hover:text-emerald-200 transition-colors mb-1.5">
                    تلاوة آية بآية
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-cairo leading-relaxed">
                    تُظلّل الآية الجاري تلاوتها وتنتقل تلقائيًا إلى ما بعدها، بالسرعة التي تختارها.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-cairo text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400/90 font-medium group-hover:translate-x-[-4px] transition-transform">
                  استمع الآن بأصوات كبار القرّاء &larr;
                </span>
                <span className="text-[11px] bg-emerald-950/40 text-emerald-300/80 px-2 py-0.5 rounded border border-emerald-500/20">
                  {currentReciter.nameAr} &bull; {currentReciter.riwayah}
                </span>
              </div>
            </div>

            {/* Card 3: معاني القرآن بثماني وتسعين لغة */}
            <div 
              onClick={() => setIsLanguageModalOpen(true)}
              className="group relative bg-[#0e171d]/90 hover:bg-[#121d25] border border-white/5 hover:border-sky-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer shadow-lg shadow-black/30 hover:shadow-sky-500/5 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                {/* Right-aligned Icon Container with Globe */}
                <div className="w-12 h-12 rounded-xl bg-[#142129] border border-sky-500/30 flex items-center justify-center flex-shrink-0 text-sky-400 group-hover:text-sky-300 transition-all shadow-inner shadow-sky-500/10">
                  <Globe className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-right">
                  <h2 className="text-base sm:text-lg font-bold font-cairo text-zinc-100 group-hover:text-sky-200 transition-colors mb-1.5">
                    معاني القرآن بثماني وتسعين لغة
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-cairo leading-relaxed">
                    بدّل لغة الواجهة ولغة الترجمة كلّاً على حدة، بأي لغة في العالم، ومنها اللغات التي تُكتب من اليمين.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-cairo text-zinc-400">
                <span className="flex items-center gap-1.5 text-sky-400/90 font-medium group-hover:translate-x-[-4px] transition-transform">
                  اختر لغة الترجمة الفورية &larr;
                </span>
                <span className="text-[11px] bg-sky-950/40 text-sky-300/80 px-2 py-0.5 rounded border border-sky-500/20">
                  98 لغة معتمدة
                </span>
              </div>
            </div>

            {/* Royal Reciter Highlight Card */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-right">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-bold font-cairo shadow-lg shadow-amber-500/20 flex-shrink-0">
                  {currentReciter.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-amber-200 font-cairo flex items-center gap-2">
                    <span>القارئ الحالي: {currentReciter.nameAr}</span>
                    <span className="text-[10px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                      {currentReciter.riwayah}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 font-cairo">
                    {currentReciter.titleAr} &bull; نمط التلاوة: {currentReciter.style}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsReciterModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-xs font-cairo transition-all shadow-md shadow-amber-500/20 whitespace-nowrap flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>تبديل صوت القارئ</span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: Interactive Qira'at Comparison Studio */}
        {activeTab === 'compare' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Header / Filter Toolbar with Luxurious Reciter Selector Card */}
            <div className="bg-[#0e171d] p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-cairo">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">السورة:</span>
                <select
                  value={selectedSurahIndex}
                  onChange={(e) => setSelectedSurahIndex(Number(e.target.value))}
                  className="bg-[#17232b] text-zinc-200 border border-white/10 rounded-lg px-2.5 py-1.5 outline-none font-medium cursor-pointer"
                >
                  {SURAHS_DATA.map((s, idx) => (
                    <option key={s.number} value={idx}>
                      {s.number}. {s.nameAr} ({s.nameTranslit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Prestigious Reciter Switcher Pill */}
              <button
                onClick={() => setIsReciterModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#17242d] hover:bg-[#20313e] border border-amber-500/30 text-amber-200 font-medium transition-all group"
                title="تغيير صوت القارئ"
              >
                <Mic2 className="w-3.5 h-3.5 text-amber-400" />
                <span>القارئ: {currentReciter.nameAr}</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                  {currentReciter.riwayah.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-amber-400" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-zinc-400">عرض الروايات:</span>
                <div className="flex items-center gap-1 bg-[#17232b] p-0.5 rounded-lg border border-white/10">
                  <button
                    onClick={() => setSelectedRiwayah('compare')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      selectedRiwayah === 'compare' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    مقارنة متزامنة
                  </button>
                  <button
                    onClick={() => setSelectedRiwayah('hafs')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      selectedRiwayah === 'hafs' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    حفص فقط
                  </button>
                  <button
                    onClick={() => setSelectedRiwayah('warsh')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      selectedRiwayah === 'warsh' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    ورش فقط
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Word Diff Spotlight (Verse 1:4 Mālik vs Malik) */}
            {selectedWordDiff && (
              <div className="bg-gradient-to-b from-[#18232c] to-[#0f171d] border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
                <button
                  onClick={() => setSelectedWordDiff(null)}
                  className="absolute top-3 left-3 p-1 text-zinc-400 hover:text-white rounded-lg bg-black/20"
                  title="إغلاق التفاصيل"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2 font-cairo">
                  <Sparkles className="w-4 h-4" />
                  <span>تفصيل موضع الاختلاف اللفظي والدلالي:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
                  {/* Hafs Box */}
                  <div className="bg-[#121c22] p-3 rounded-xl border border-amber-500/30 text-right">
                    <div className="text-[11px] text-amber-400 font-bold font-cairo mb-1 flex items-center justify-between">
                      <span>رواية حفص عن عاصم</span>
                      <span className="text-[10px] bg-amber-950/80 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/30">
                        بالألف (مَالِكِ)
                      </span>
                    </div>
                    <div className="text-2xl font-amiri font-bold text-amber-200 my-1">
                      {selectedWordDiff.hafs}
                    </div>
                    <div className="text-xs text-zinc-400 font-cairo">
                      من المِلْكِ، أي المالك الحقيقي المتصرف بالعدل والرحمة.
                    </div>
                  </div>

                  {/* Warsh Box */}
                  <div className="bg-[#121c22] p-3 rounded-xl border border-emerald-500/30 text-right">
                    <div className="text-[11px] text-emerald-400 font-bold font-cairo mb-1 flex items-center justify-between">
                      <span>رواية ورش وقراءة نافع</span>
                      <span className="text-[10px] bg-emerald-950/80 px-1.5 py-0.5 rounded text-emerald-300 border border-emerald-500/30">
                        بغير ألف (مَلِكِ)
                      </span>
                    </div>
                    <div className="text-2xl font-amiri font-bold text-emerald-200 my-1">
                      {selectedWordDiff.warsh}
                    </div>
                    <div className="text-xs text-zinc-400 font-cairo">
                      من المُلْكِ والسيادة والتدبير، أي الملك الأعظم ليوم الجزاء.
                    </div>
                  </div>
                </div>

                <div className="bg-[#0b1014] p-3 rounded-xl text-xs text-zinc-300 font-cairo leading-relaxed border border-white/5">
                  <p className="text-zinc-200 mb-1">
                    <strong className="text-amber-300">البيان والتكامل الإعجازي:</strong>{' '}
                    {selectedWordDiff.explanation.ar}
                  </p>
                  <p className="text-zinc-400 text-[11px] mt-1 italic" dir="ltr">
                    {selectedWordDiff.explanation.en}
                  </p>
                </div>
              </div>
            )}

            {/* Verse-by-Verse Comparison Cards */}
            <div className="space-y-4">
              {currentSurah.verses.map((verse, vIdx) => {
                const isVersePlaying = isPlaying && currentPlayingVerseIndex === vIdx;
                const hasDifferences = verse.diffs && verse.diffs.length > 0;

                return (
                  <div
                    key={verse.number}
                    className={`bg-[#0e171d]/90 rounded-2xl border transition-all p-5 shadow-lg ${
                      isVersePlaying 
                        ? 'border-amber-400/80 ring-2 ring-amber-400/20 bg-[#14222a]' 
                        : 'border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Verse Top Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs text-zinc-400 font-cairo">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-[11px]">
                          {verse.number}
                        </span>
                        <span className="font-semibold text-zinc-200">
                          الآية {verse.number}
                        </span>
                        {hasDifferences && (
                          <span className="bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full">
                            يوجد اختلاف رواية
                          </span>
                        )}
                      </div>

                      {/* Verse Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowTafsirForVerse(showTafsirForVerse === verse.number ? null : verse.number)}
                          className="hover:text-amber-300 text-zinc-400 transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>التفسير</span>
                        </button>
                        <button
                          onClick={() => playVerse(vIdx)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isVersePlaying 
                              ? 'bg-amber-400 text-stone-950 font-bold' 
                              : 'bg-[#1b2730] text-zinc-300 hover:text-white'
                          }`}
                          title={`تلاوة الآية بصوت: ${currentReciter.nameAr}`}
                        >
                          {isVersePlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Verse Text */}
                    <div className="py-4 space-y-3">
                      {(selectedRiwayah === 'compare' || selectedRiwayah === 'hafs') && (
                        <div className="bg-[#121c22]/70 p-3.5 rounded-xl border border-white/5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-amber-400/80 mb-2 font-cairo">
                            <span>رواية حفص عن عاصم</span>
                            <span className="text-[10px] text-zinc-500">طريق الشاطبية</span>
                          </div>
                          <div className="text-xl sm:text-2xl font-amiri text-zinc-100 text-right leading-loose">
                            {renderVerseWords(verse, 'hafs')}
                          </div>
                        </div>
                      )}

                      {(selectedRiwayah === 'compare' || selectedRiwayah === 'warsh') && (
                        <div className="bg-[#101b20]/70 p-3.5 rounded-xl border border-white/5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400/80 mb-2 font-cairo">
                            <span>رواية ورش عن نافع</span>
                            <span className="text-[10px] text-zinc-500">طريق الأزرق</span>
                          </div>
                          <div className="text-xl sm:text-2xl font-amiri text-zinc-100 text-right leading-loose">
                            {renderVerseWords(verse, 'warsh')}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tafsir expansion */}
                    {showTafsirForVerse === verse.number && (
                      <div className="mt-2 p-3 bg-[#0a1014] rounded-xl border border-amber-500/20 text-xs font-cairo text-zinc-300 leading-relaxed">
                        <div className="font-bold text-amber-300 mb-1">
                          التفسير الميسر:
                        </div>
                        {verse.tafsirMuyassar}
                      </div>
                    )}

                    {/* Translation Preview */}
                    <div className="text-xs text-zinc-400 font-sans text-right pt-2 border-t border-white/5" dir="ltr">
                      <span className="text-zinc-500 mr-2 font-mono text-[10px]">EN:</span>
                      {verse.translationEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: Mushaf Reader & Recitation */}
        {activeTab === 'reader' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Elegant Reciter Header Card (Replaces the ugly select!) */}
            <div className="bg-[#0e171d] p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-cairo">
              {/* Clickable Reciter Card */}
              <button
                type="button"
                onClick={() => setIsReciterModalOpen(true)}
                className="group flex items-center gap-3 bg-[#132029] hover:bg-[#182732] border border-amber-500/30 hover:border-amber-400 p-2.5 rounded-2xl transition-all text-right cursor-pointer"
                title="انقر لتغيير القارئ أو الرواية"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-bold text-sm font-cairo shadow-md">
                  {currentReciter.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {currentReciter.nameAr}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-cairo ${
                      currentReciter.riwayahId === 'warsh'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                    }`}>
                      {currentReciter.riwayah}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span>{currentReciter.style}</span>
                    <span>&bull;</span>
                    <span className="text-amber-400 font-medium flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>تغيير القارئ</span>
                    </span>
                  </div>
                </div>
              </button>

              {/* Speed controls */}
              <div className="flex items-center gap-1.5 bg-[#142028] p-1 rounded-xl border border-white/5">
                <span className="text-zinc-400 text-xs px-2">سرعة التلاوة:</span>
                {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      setAudioSpeed(speed);
                      if (audioRef.current) audioRef.current.playbackRate = speed;
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                      audioSpeed === speed 
                        ? 'bg-amber-400 text-stone-950 font-bold' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Bismillah Header */}
            <div className="text-center py-6 bg-[#0e171d]/60 rounded-2xl border border-white/5 my-2">
              <div className="font-amiri text-2xl sm:text-3xl text-amber-200/90 tracking-wide">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <div className="text-[11px] text-zinc-400 font-cairo mt-1">
                سورة {currentSurah.nameAr} &bull; {currentSurah.versesCount} آيات &bull; نزلت بمكة المكرمة
              </div>
            </div>

            {/* Mushaf Continuous Verses View with Real-time Recitation Highlight */}
            <div className="bg-[#0e171d] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl">
              <div className="text-right leading-[3.2rem] sm:leading-[3.8rem] font-amiri text-2xl sm:text-3xl text-zinc-100">
                {currentSurah.verses.map((verse, vIdx) => {
                  const isVersePlaying = isPlaying && currentPlayingVerseIndex === vIdx;

                  return (
                    <span 
                      key={verse.number}
                      onClick={() => playVerse(vIdx)}
                      className={`inline cursor-pointer px-1.5 py-1 rounded-xl transition-all ${
                        isVersePlaying 
                          ? 'bg-amber-400/25 text-amber-200 ring-2 ring-amber-400/40 shadow-md' 
                          : 'hover:bg-white/5'
                      }`}
                      title={`انقر لتلاوة الآية ${verse.number} بصوت الشيخ ${currentReciter.nameAr}`}
                    >
                      <span>{verse.textHafs}</span>
                      {/* Quranic Ayah End Ornament */}
                      <span className="inline-flex items-center justify-center w-8 h-8 mx-1.5 rounded-full border border-amber-500/40 text-amber-400 text-sm font-sans font-bold bg-amber-950/30 align-middle">
                        {verse.number}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Global Floating Reciter Player Bar */}
        <div className="mt-auto pt-6 sticky bottom-2 z-20">
          <AudioPlayerBar
            currentReciter={currentReciter}
            surahNameAr={currentSurah.nameAr}
            verseNumber={currentSurah.verses[currentPlayingVerseIndex]?.number || 1}
            totalVerses={currentSurah.versesCount}
            isPlaying={isPlaying}
            onTogglePlay={togglePlayPause}
            onNextVerse={handleNextVerse}
            onPrevVerse={handlePrevVerse}
            onOpenReciterModal={() => setIsReciterModalOpen(true)}
            audioRef={audioRef}
            playbackSpeed={audioSpeed}
            onChangeSpeed={(spd) => {
              setAudioSpeed(spd);
              if (audioRef.current) audioRef.current.playbackRate = spd;
            }}
            isRepeatAyah={isRepeatAyah}
            onToggleRepeat={() => setIsRepeatAyah(!isRepeatAyah)}
          />
        </div>
      </div>

      {/* Reciter Selector Modal */}
      <ReciterSelectorModal
        isOpen={isReciterModalOpen}
        onClose={() => setIsReciterModalOpen(false)}
        currentReciterId={currentReciterId}
        onSelectReciter={handleSelectReciter}
        currentSurahNumber={currentSurah.number}
        currentVerseNumber={currentSurah.verses[currentPlayingVerseIndex]?.number || 1}
      />

      {/* Slide-out Navigation Drawer (Hamburger Menu) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex" dir="rtl">
          {/* Backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[85vw] bg-[#0d1419] border-l border-white/10 h-full p-5 overflow-y-auto flex flex-col z-10 text-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ۞
                </div>
                <div>
                  <h3 className="font-bold text-sm text-amber-100 font-cairo">نور القراءات</h3>
                  <p className="text-[10px] text-zinc-400 font-cairo">منظومة علوم القرآن</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Reciter Trigger in Drawer */}
            <div 
              onClick={() => {
                setIsDrawerOpen(false);
                setIsReciterModalOpen(true);
              }}
              className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/30 cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                  {currentReciter.avatarInitials}
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-200 font-cairo">
                    {currentReciter.nameAr}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-cairo">
                    {currentReciter.riwayah}
                  </div>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-amber-400" />
            </div>

            {/* Drawer sections */}
            <div className="space-y-4 font-cairo text-xs flex-1">
              <div>
                <h4 className="font-bold text-amber-300 mb-2 uppercase text-[11px] tracking-wider">
                  القراءات العشر المتواترة
                </h4>
                <div className="space-y-1.5">
                  {QIRAAT_INFO.map((q) => (
                    <div 
                      key={q.id}
                      className="p-2.5 rounded-xl bg-[#131d24] border border-white/5 hover:border-amber-500/30 transition-all text-right"
                    >
                      <div className="font-bold text-zinc-200">{q.transmitter}</div>
                      <div className="text-[11px] text-amber-300/80">عن الإمام: {q.reader}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{q.region}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-amber-300 mb-2 uppercase text-[11px] tracking-wider">
                  فهرس السور
                </h4>
                <div className="space-y-1">
                  {SURAHS_DATA.map((s, idx) => (
                    <button
                      key={s.number}
                      onClick={() => {
                        setSelectedSurahIndex(idx);
                        setIsDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-right transition-colors ${
                        selectedSurahIndex === idx ? 'bg-amber-500/20 text-amber-300 font-bold' : 'hover:bg-white/5 text-zinc-300'
                      }`}
                    >
                      <span>{s.number}. سورة {s.nameAr}</span>
                      <span className="text-[10px] text-zinc-500">{s.versesCount} آيات</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-zinc-500 text-center font-cairo">
              نور القراءات &bull; النظم القرآني المحكم
            </div>
          </div>
        </div>
      )}

      {/* Language Modal (98 Languages selector) */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
          <div 
            onClick={() => setIsLanguageModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-[#0e161c] border border-amber-500/30 rounded-2xl p-5 shadow-2xl z-10 text-zinc-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-zinc-100 font-cairo">
                  معاني القرآن بـ 98 لغة حول العالم
                </h3>
              </div>
              <button 
                onClick={() => setIsLanguageModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 font-cairo mb-4 leading-relaxed">
              اختر لغة الترجمة الفورية والواجهة. يدعم التطبيق اللغات من اليمين إلى اليسار (RTL) واللغات العالمية كافة.
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1 font-cairo text-xs">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setIsLanguageModalOpen(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-right ${
                    selectedLanguage === lang.code 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' 
                      : 'bg-[#142028] border-white/5 hover:border-white/20 text-zinc-300'
                  }`}
                >
                  <div>
                    <div className="font-medium">{lang.nameNative}</div>
                    <div className="text-[10px] text-zinc-500">{lang.nameEn}</div>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-4 h-4 text-amber-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <button
                onClick={() => setIsLanguageModalOpen(false)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl font-cairo transition-colors"
              >
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
