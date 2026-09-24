import React from 'react';
import { 
  Search, 
  Code2, 
  Sparkles, 
  PanelLeftClose, 
  ChevronDown 
} from 'lucide-react';

interface ArenaSidebarProps {
  currentChatId?: string;
  onSelectChat?: (id: string) => void;
  onNewChat?: () => void;
}

export const ArenaSidebar: React.FC<ArenaSidebarProps> = ({
  currentChatId = 'quran-platform',
  onSelectChat,
  onNewChat
}) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-[#121214] border-r border-[#222226] flex flex-col h-full text-zinc-300 select-none text-xs">
      {/* Top Header: Arena Logo & Dropdown */}
      <div className="h-13 px-3.5 flex items-center justify-between border-b border-transparent">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity">
          {/* Classical Greek/Roman Columns Temple Icon */}
          <div className="text-zinc-100 flex items-center">
            <svg 
              className="w-5 h-5 fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M2 5h20v2H2V5zm2 3h2v11H4V8zm5 0h2v11H9V8zm5 0h2v11h-2V8zm5 0h2v11h-2V8zM1 20h22v2H1v-2zM12 2l10 3H2l10-3z" />
            </svg>
          </div>
          <span className="font-semibold text-zinc-100 text-sm tracking-tight flex items-center gap-1">
            Arena
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 opacity-80" />
          </span>
        </div>

        {/* Panel collapse button */}
        <button 
          title="Collapse sidebar"
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#1f1f23] rounded-md transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Main Nav Actions */}
      <div className="px-2 pt-2 pb-2 space-y-0.5">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-200 hover:bg-[#1d1d21] transition-colors text-left font-normal"
        >
          {/* Speech bubble icon like screenshot */}
          <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-[13px]">New Chat</span>
        </button>

        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-[#1d1d21] transition-colors text-left">
          {/* Leaderboard icon with horizontal ranked lines */}
          <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="3" />
            <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="3" />
            <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="3" />
          </svg>
          <span className="text-[13px]">Leaderboard</span>
        </button>

        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-[#1d1d21] transition-colors text-left">
          <Search className="w-4 h-4 text-zinc-400" />
          <span className="text-[13px]">Search</span>
        </button>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
        {/* Today Section */}
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Today
          </div>
          <div className="space-y-0.5">
            {/* Active Item: Generate and design a ... */}
            <button 
              onClick={() => onSelectChat && onSelectChat('quran-platform')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                currentChatId === 'quran-platform' 
                  ? 'bg-[#222227] text-zinc-100 font-medium' 
                  : 'text-zinc-300 hover:bg-[#1a1a1e]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-zinc-200 flex-shrink-0"></span>
              <span className="truncate">Generate and design a ...</span>
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1e] text-left transition-colors">
              <Code2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="truncate">SaaS landing page and...</span>
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1e] text-left transition-colors">
              <Code2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="truncate">Corporate risk consulti...</span>
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1e] text-left transition-colors">
              <Code2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="truncate">B2B office supplies lan...</span>
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1e] text-left transition-colors">
              <Code2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="truncate">Urban warehouse landi...</span>
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1e] text-right transition-colors" dir="rtl">
              <Sparkles className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="truncate">...فيديوهات ** قمة المشاريع الجانبية</span>
            </button>
          </div>
        </div>

        {/* Yesterday Section */}
        <div>
          <div className="px-3 py-1.5 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Yesterday
          </div>
          <div className="space-y-0.5">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a1e] text-left transition-colors">
              <Code2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="truncate">Video production brea...</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Footer Profile & Legal Links */}
      <div className="p-3 border-t border-[#202024] bg-[#101012]">
        <div className="flex items-center gap-2.5 py-1 px-1 rounded-md hover:bg-[#19191d] cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-[#6d28d9] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-inner">
            M
          </div>
          <div className="truncate text-zinc-200 text-xs font-medium">
            mahmoud1geno@gmail.com
          </div>
        </div>

        <div className="flex items-center justify-between px-1 pt-2.5 text-[10px] text-zinc-500">
          <a href="#terms" className="hover:text-zinc-300 transition-colors">Terms of Use</a>
          <a href="#privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <a href="#cookies" className="hover:text-zinc-300 transition-colors">Cookies</a>
        </div>
      </div>
    </aside>
  );
};
