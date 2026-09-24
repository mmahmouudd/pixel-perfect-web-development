import React from 'react';
import { Layout, Sparkles, BookOpen } from 'lucide-react';

interface TopModeBarProps {
  viewMode: 'arena-split' | 'fullscreen-quran';
  onSetViewMode: (mode: 'arena-split' | 'fullscreen-quran') => void;
}

export const TopModeBar: React.FC<TopModeBarProps> = ({
  viewMode,
  onSetViewMode
}) => {
  return (
    <header className="h-9 bg-[#0b0c0e] border-b border-[#1f2024] px-3 flex items-center justify-between text-xs text-zinc-400 select-none z-30 flex-shrink-0">
      {/* Left indicator */}
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-zinc-300 font-medium hidden sm:inline">
          Arena Agent Studio &bull;
        </span>
        <span className="text-amber-400/90 font-medium flex items-center gap-1 font-cinzel">
          Nūr al-Qirā&apos;āt
        </span>
      </div>

      {/* Center/Right Mode Switcher Pill */}
      <div className="flex items-center gap-1 bg-[#16171b] p-0.5 rounded-lg border border-[#26272e]">
        <button
          onClick={() => onSetViewMode('arena-split')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
            viewMode === 'arena-split'
              ? 'bg-[#292a33] text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1e1f24]'
          }`}
          title="Split Arena IDE interface (Exact match to screenshot)"
        >
          <Layout className="w-3 h-3 text-zinc-300" />
          <span>IDE Workspace (Screenshot View)</span>
        </button>

        <button
          onClick={() => onSetViewMode('fullscreen-quran')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
            viewMode === 'fullscreen-quran'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1e1f24]'
          }`}
          title="Full-screen Nūr al-Qirā'āt web application"
        >
          <BookOpen className="w-3 h-3 text-amber-400" />
          <span>Maximize Quran Platform</span>
        </button>
      </div>

      {/* Right Hint */}
      <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-500">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Verse 1:4 مَالِكِ / مَلِكِ mutawatir comparison</span>
      </div>
    </header>
  );
};
