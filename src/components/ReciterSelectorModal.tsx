import React, { useState, useRef } from 'react';
import { 
  X, 
  Search, 
  Check, 
  Volume2, 
  Sparkles, 
  Play, 
  Pause,
  MapPin,
  Mic2,
  Music2
} from 'lucide-react';
import { RECITERS_LIST, type Reciter, getAyahAudioUrl } from '../data/quranData';

interface ReciterSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReciterId: string;
  onSelectReciter: (reciter: Reciter) => void;
  currentSurahNumber?: number;
  currentVerseNumber?: number;
}

export const ReciterSelectorModal: React.FC<ReciterSelectorModalProps> = ({
  isOpen,
  onClose,
  currentReciterId,
  onSelectReciter,
  currentSurahNumber = 1,
  currentVerseNumber = 1,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'hafs' | 'warsh' | 'murattal' | 'mujawwad'>('all');
  const [previewingReciterId, setPreviewingReciterId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  if (!isOpen) return null;

  // Filter reciters
  const filteredReciters = RECITERS_LIST.filter((reciter) => {
    // Search match
    const matchesSearch = 
      reciter.nameAr.includes(searchQuery) ||
      reciter.titleAr.includes(searchQuery) ||
      reciter.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reciter.riwayah.includes(searchQuery) ||
      reciter.location.includes(searchQuery);

    if (!matchesSearch) return false;

    if (activeFilter === 'hafs') return reciter.riwayahId === 'hafs';
    if (activeFilter === 'warsh') return reciter.riwayahId === 'warsh';
    if (activeFilter === 'murattal') return reciter.style === 'مرتل';
    if (activeFilter === 'mujawwad') return reciter.style === 'مجوّد';

    return true;
  });

  const handlePreviewSample = (e: React.MouseEvent, reciter: Reciter) => {
    e.stopPropagation();

    if (previewingReciterId === reciter.id) {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
      setPreviewingReciterId(null);
      return;
    }

    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }

    const audioUrl = getAyahAudioUrl(reciter.id, currentSurahNumber, currentVerseNumber);
    const audio = new Audio(audioUrl);
    previewAudioRef.current = audio;
    setPreviewingReciterId(reciter.id);

    audio.play().catch(err => {
      console.warn('Sample preview failed:', err);
      setPreviewingReciterId(null);
    });

    audio.onended = () => {
      setPreviewingReciterId(null);
    };
  };

  const handleSelect = (reciter: Reciter) => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }
    setPreviewingReciterId(null);
    onSelectReciter(reciter);
    onClose();
  };

  const getColorClasses = (scheme: Reciter['colorScheme'], isSelected: boolean) => {
    if (isSelected) {
      return {
        card: 'border-amber-400 bg-gradient-to-b from-[#1b262f] to-[#141f27] shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/40',
        avatarBg: 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/20',
        badge: 'bg-amber-400 text-stone-950 font-bold',
        glow: 'border-amber-400/40'
      };
    }

    switch (scheme) {
      case 'emerald':
        return {
          card: 'border-emerald-500/20 hover:border-emerald-500/50 bg-[#101b22] hover:bg-[#13222b]',
          avatarBg: 'bg-gradient-to-br from-emerald-600 to-emerald-900 text-emerald-100 border border-emerald-500/30',
          badge: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30',
          glow: 'border-emerald-500/20'
        };
      case 'cyan':
        return {
          card: 'border-sky-500/20 hover:border-sky-500/50 bg-[#101b22] hover:bg-[#13222b]',
          avatarBg: 'bg-gradient-to-br from-sky-600 to-sky-900 text-sky-100 border border-sky-500/30',
          badge: 'bg-sky-950/80 text-sky-300 border border-sky-500/30',
          glow: 'border-sky-500/20'
        };
      case 'purple':
        return {
          card: 'border-purple-500/20 hover:border-purple-500/50 bg-[#101b22] hover:bg-[#13222b]',
          avatarBg: 'bg-gradient-to-br from-purple-600 to-purple-900 text-purple-100 border border-purple-500/30',
          badge: 'bg-purple-950/80 text-purple-300 border border-purple-500/30',
          glow: 'border-purple-500/20'
        };
      default:
        return {
          card: 'border-white/10 hover:border-amber-500/40 bg-[#101b22] hover:bg-[#14222b]',
          avatarBg: 'bg-gradient-to-br from-amber-700 to-amber-950 text-amber-100 border border-amber-500/30',
          badge: 'bg-amber-950/80 text-amber-300 border border-amber-500/30',
          glow: 'border-amber-500/20'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5" dir="rtl">
      {/* Backdrop */}
      <div 
        onClick={() => {
          if (previewAudioRef.current) previewAudioRef.current.pause();
          onClose();
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c1318] border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden text-zinc-100 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-b from-[#141f27] to-[#0d151a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Mic2 className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-base sm:text-lg text-zinc-100 font-cairo flex items-center gap-2">
                <span>اختيار القارئ والرواية</span>
                <span className="text-[10px] font-mono bg-amber-950/80 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {RECITERS_LIST.length} مقرئاً معتمداً
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-cairo">
                أصوات كبار القرّاء بروايتي حفص عن عاصم وورش عن نافع
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (previewAudioRef.current) previewAudioRef.current.pause();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-white/5 bg-[#0a1014] space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الشيخ، الرواية (حفص / ورش)، النمط (مرتل / مجوّد)، أو الدولة..."
              className="w-full bg-[#121c22] border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-amber-400/60 font-cairo transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-cairo scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-[#121c22] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              جميع القرّاء ({RECITERS_LIST.length})
            </button>
            <button
              onClick={() => setActiveFilter('hafs')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeFilter === 'hafs'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-[#121c22] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              رواية حفص عن عاصم
            </button>
            <button
              onClick={() => setActiveFilter('warsh')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 ${
                activeFilter === 'warsh'
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-[#121c22] text-emerald-400/90 hover:text-white border border-emerald-500/20'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>رواية ورش عن نافع</span>
            </button>
            <button
              onClick={() => setActiveFilter('murattal')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeFilter === 'murattal'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-[#121c22] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              المصحف المرتل
            </button>
            <button
              onClick={() => setActiveFilter('mujawwad')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 ${
                activeFilter === 'mujawwad'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-[#121c22] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              <Music2 className="w-3 h-3" />
              <span>المصحف المجوّد</span>
            </button>
          </div>
        </div>

        {/* Reciters List / Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 max-h-[55vh]">
          {filteredReciters.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 font-cairo">
              <Mic2 className="w-10 h-10 mx-auto text-zinc-600 mb-2 opacity-50" />
              <p>لم يتم العثور على مقرئ يطابق بحثك: &quot;{searchQuery}&quot;</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="mt-3 text-xs text-amber-400 hover:underline font-bold"
              >
                إعادة ضبط البحث
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredReciters.map((reciter) => {
                const isSelected = reciter.id === currentReciterId;
                const isPreviewing = previewingReciterId === reciter.id;
                const colors = getColorClasses(reciter.colorScheme, isSelected);

                return (
                  <div
                    key={reciter.id}
                    onClick={() => handleSelect(reciter)}
                    className={`group relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${colors.card}`}
                  >
                    {/* Top Row: Avatar + Name + Check */}
                    <div className="flex items-start gap-3">
                      {/* Avatar Circle */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold font-cairo text-base flex-shrink-0 relative ${colors.avatarBg}`}>
                        <span>{reciter.avatarInitials}</span>
                        {isPreviewing && (
                          <div className="absolute -inset-1 rounded-2xl border-2 border-amber-400 animate-ping opacity-50" />
                        )}
                      </div>

                      {/* Info Text */}
                      <div className="flex-1 text-right min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-sm text-zinc-100 font-cairo truncate group-hover:text-amber-200 transition-colors">
                            {reciter.nameAr}
                          </h4>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-zinc-400 font-cairo truncate mt-0.5">
                          {reciter.titleAr}
                        </p>

                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {/* Riwayah Badge */}
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium font-cairo ${
                            reciter.riwayahId === 'warsh' 
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' 
                              : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                          }`}>
                            {reciter.riwayah}
                          </span>

                          {/* Style Tag */}
                          <span className="text-[10px] bg-[#162128] text-zinc-400 px-1.5 py-0.5 rounded border border-white/5 font-cairo">
                            {reciter.style}
                          </span>

                          {/* Location */}
                          <span className="text-[10px] text-zinc-500 flex items-center gap-0.5 font-cairo">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{reciter.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Preview Audio Sample Button & Quality info */}
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-cairo">
                      <div className="text-[10px] text-zinc-500 font-mono">
                        {reciter.bitrate} MP3
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handlePreviewSample(e, reciter)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-cairo transition-all ${
                          isPreviewing
                            ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white'
                        }`}
                        title="استمع لعينة من صوت الشيخ لهذه الآية"
                      >
                        {isPreviewing ? (
                          <>
                            <Pause className="w-3 h-3 fill-current" />
                            <span>جاري الاستماع...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                            <span>عينة صوتية</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0a1014] flex items-center justify-between text-xs font-cairo">
          <div className="text-zinc-400 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>عند اختيار أي مقرئ، سيتحول الصوت تلقائياً وفورياً إلى تلاوته المعتمدة.</span>
          </div>

          <button
            onClick={() => {
              if (previewAudioRef.current) previewAudioRef.current.pause();
              onClose();
            }}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl transition-all shadow-md shadow-amber-500/20"
          >
            تأكيد واختيار
          </button>
        </div>
      </div>
    </div>
  );
};
