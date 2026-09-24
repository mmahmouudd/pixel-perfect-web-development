import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Repeat, 
  ChevronUp, 
  Sparkles,
  Gauge
} from 'lucide-react';
import { type Reciter } from '../data/quranData';

interface AudioPlayerBarProps {
  currentReciter: Reciter;
  surahNameAr: string;
  verseNumber: number;
  totalVerses: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextVerse: () => void;
  onPrevVerse: () => void;
  onOpenReciterModal: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  isRepeatAyah: boolean;
  onToggleRepeat: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentReciter,
  surahNameAr,
  verseNumber,
  totalVerses,
  isPlaying,
  onTogglePlay,
  onNextVerse,
  onPrevVerse,
  onOpenReciterModal,
  audioRef,
  playbackSpeed,
  onChangeSpeed,
  isRepeatAyah,
  onToggleRepeat,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement | null>(null);

  // Time formatting helper
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Sync audio timeupdate
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioRef]);

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.volume = volume || 0.8;
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-[#0d161d]/95 backdrop-blur-xl border border-amber-500/25 rounded-2xl p-3 sm:px-5 shadow-2xl shadow-black/90 transition-all duration-300">
      {/* Top Ayah Progress Slider */}
      <div className="w-full flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono text-zinc-400 w-9 text-right" dir="ltr">
          {formatTime(currentTime)}
        </span>

        <div className="relative flex-1 flex items-center group cursor-pointer">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-[#1b2832] rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
            style={{
              background: `linear-gradient(to right, #f59e0b ${progressPercent}%, #1b2832 ${progressPercent}%)`
            }}
          />
        </div>

        <span className="text-[10px] font-mono text-zinc-500 w-9 text-left" dir="ltr">
          {formatTime(duration)}
        </span>
      </div>

      {/* Main Controls Row */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        {/* Right Section in RTL: Reciter Switcher Card */}
        <button
          type="button"
          onClick={onOpenReciterModal}
          className="group flex items-center gap-2.5 p-1.5 pr-2 rounded-xl bg-[#132029] hover:bg-[#182732] border border-white/5 hover:border-amber-500/40 transition-all text-right cursor-pointer"
          title="انقر لتغيير القارئ أو الرواية"
        >
          {/* Animated Equalizer Wave when playing */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 flex items-center justify-center font-bold text-xs font-cairo shadow-md flex-shrink-0">
            <span>{currentReciter.avatarInitials}</span>

            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center gap-0.5 px-1">
                <span className="w-0.5 h-3 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-zinc-100 font-cairo truncate max-w-[120px] sm:max-w-[150px] group-hover:text-amber-300 transition-colors">
                {currentReciter.nameAr}
              </span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-cairo ${
                currentReciter.riwayahId === 'warsh'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-950 text-amber-300 border border-amber-500/30'
              }`}>
                {currentReciter.riwayah.split(' ')[0]}
              </span>
            </div>

            <div className="text-[10px] text-amber-400/90 font-cairo flex items-center gap-1 mt-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              <span>تغيير القارئ ▾</span>
            </div>
          </div>
        </button>

        {/* Center Section: Playback Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 mx-auto" dir="ltr">
          {/* Repeat Ayah Toggle */}
          <button
            onClick={onToggleRepeat}
            className={`p-2 rounded-xl transition-colors ${
              isRepeatAyah 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title={isRepeatAyah ? "إلغاء تكرار الآية" : "تكرار الآية الحالية"}
          >
            <Repeat className="w-4 h-4" />
          </button>

          {/* Previous Ayah */}
          <button
            onClick={onPrevVerse}
            disabled={verseNumber <= 1}
            className="p-2 text-zinc-300 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-300 rounded-xl hover:bg-white/5 transition-colors"
            title="الآية السابقة"
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Main Glowing Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold flex items-center justify-center shadow-lg shadow-amber-500/25 transition-transform active:scale-95"
            title={isPlaying ? "إيقاف مؤقت" : "تشغيل التلاوة"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Ayah */}
          <button
            onClick={onNextVerse}
            disabled={verseNumber >= totalVerses}
            className="p-2 text-zinc-300 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-300 rounded-xl hover:bg-white/5 transition-colors"
            title="الآية التالية"
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Left Section: Speed & Volume Controls */}
        <div className="flex items-center gap-2 sm:gap-3" dir="ltr">
          {/* Speed Selector Button */}
          <div className="relative" ref={speedMenuRef}>
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#14212a] hover:bg-[#1a2b37] border border-white/5 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
              title="سرعة التلاوة"
            >
              <Gauge className="w-3 h-3 text-amber-400" />
              <span>{playbackSpeed}x</span>
              <ChevronUp className="w-3 h-3 text-zinc-500" />
            </button>

            {showSpeedMenu && (
              <div className="absolute bottom-full mb-2 left-0 bg-[#0e161c] border border-amber-500/30 rounded-xl p-1 shadow-2xl flex flex-col gap-0.5 z-30 min-w-[70px]">
                {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      onChangeSpeed(speed);
                      setShowSpeedMenu(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono text-center transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              title={isMuted ? "إلغاء الكتم" : "كتم الصوت"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-zinc-300" />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-[#1b2832] rounded-lg appearance-none cursor-pointer accent-amber-400"
              title={`مستوى الصوت: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            />
          </div>

          {/* Surah & Ayah Pill */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] font-cairo bg-black/30 px-2.5 py-1 rounded-xl border border-white/5 text-zinc-300">
            <span>{surahNameAr}</span>
            <span className="text-amber-400 font-bold">({verseNumber})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
