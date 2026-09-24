import React from 'react';
import { 
  Eye, 
  Code, 
  RotateCw, 
  ExternalLink, 
  X, 
  FileCode2,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ArenaPreviewHeaderProps {
  activeTab: 'preview' | 'code';
  onChangeTab: (tab: 'preview' | 'code') => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onRefresh: () => void;
  fileName?: string;
}

export const ArenaPreviewHeader: React.FC<ArenaPreviewHeaderProps> = ({
  activeTab,
  onChangeTab,
  isFullscreen,
  onToggleFullscreen,
  onRefresh,
  fileName = 'quran-platform.html'
}) => {
  return (
    <div className="h-10 bg-[#161619] border-b border-[#26262b] px-3 flex items-center justify-between text-zinc-400 select-none text-xs flex-shrink-0">
      {/* Left controls: Eye, Code, and File Tab */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChangeTab('preview')}
          className={`p-1.5 rounded-md transition-colors ${
            activeTab === 'preview' 
              ? 'text-zinc-100 bg-[#25252b]' 
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1f1f23]'
          }`}
          title="Preview mode"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onChangeTab('code')}
          className={`p-1.5 rounded-md transition-colors ${
            activeTab === 'code' 
              ? 'text-zinc-100 bg-[#25252b]' 
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1f1f23]'
          }`}
          title="Code mode"
        >
          <Code className="w-3.5 h-3.5" />
        </button>

        <div className="h-3.5 w-[1px] bg-[#2a2a30] mx-1" />

        {/* File pill */}
        <div className="flex items-center gap-1.5 bg-[#202025] text-zinc-200 px-2.5 py-1 rounded-md text-[11px] font-mono-code border border-[#2d2d34]">
          <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
          <span>{fileName}</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onRefresh}
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#222227] rounded-md transition-colors"
          title="Reload preview"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#222227] rounded-md transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#222227] rounded-md transition-colors"
          title="Open in new window"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        <button
          className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-[#222227] rounded-md transition-colors ml-0.5"
          title="Close tab"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
