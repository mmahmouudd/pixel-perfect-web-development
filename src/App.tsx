import { useState } from 'react';
import { ArenaSidebar } from './components/ArenaSidebar';
import { ArenaChatPane } from './components/ArenaChatPane';
import { ArenaPreviewHeader } from './components/ArenaPreviewHeader';
import { QuranPlatform } from './components/QuranPlatform';
import { CodeViewer } from './components/CodeViewer';
import { TopModeBar } from './components/TopModeBar';
import { Minimize2, MessageSquare, Monitor } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'arena-split' | 'fullscreen-quran'>('arena-split');
  const [activePreviewTab, setActivePreviewTab] = useState<'preview' | 'code'>('preview');
  const [focusedVerseNumber, setFocusedVerseNumber] = useState<number | null>(4);
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('preview');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleToggleFullscreen = () => {
    setViewMode(prev => prev === 'arena-split' ? 'fullscreen-quran' : 'arena-split');
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleRunDiffQuery = (verseNum: number) => {
    setFocusedVerseNumber(verseNum);
    setMobileTab('preview');
  };

  // If in pure full-screen mode for Nūr al-Qirā'āt:
  if (viewMode === 'fullscreen-quran') {
    return (
      <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-[#070b0e]">
        {/* Floating return button to split IDE view */}
        <button
          onClick={() => setViewMode('arena-split')}
          className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111a21]/90 hover:bg-[#182631] text-amber-300 border border-amber-500/30 text-xs font-cairo shadow-2xl backdrop-blur-md transition-all hover:scale-105"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span>العودة إلى بيئة Arena</span>
        </button>

        <div className="flex-1 w-full h-full overflow-hidden">
          <QuranPlatform 
            key={refreshKey}
            initialFocusVerse={focusedVerseNumber}
            onCloseFocus={() => setFocusedVerseNumber(null)}
          />
        </div>
      </div>
    );
  }

  // Exact 1:1 Screenshot View: Arena Agent Workspace
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-[#0e1013] text-zinc-100 font-sans">
      {/* Top Studio Control Bar */}
      <TopModeBar
        viewMode={viewMode}
        onSetViewMode={setViewMode}
      />

      {/* Mobile view switcher tabs (only on screens smaller than md) */}
      <div className="md:hidden flex items-center bg-[#151518] border-b border-[#25252a] px-3 py-1 text-xs">
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-colors ${
            mobileTab === 'chat' ? 'bg-[#25252b] text-white font-medium' : 'text-zinc-400'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Arena Chat</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-colors ${
            mobileTab === 'preview' ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-zinc-400'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>quran-platform.html</span>
        </button>
      </div>

      {/* Main 3-Column Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Arena Sidebar (hidden on mobile, visible on lg/xl) */}
        <div className="hidden lg:block h-full">
          <ArenaSidebar
            currentChatId="quran-platform"
            onSelectChat={() => {}}
            onNewChat={() => {}}
          />
        </div>

        {/* Middle Column: Chat & Agent Execution Stream */}
        <div className={`h-full ${mobileTab === 'chat' ? 'flex-1' : 'hidden'} md:block md:w-[380px] lg:w-[420px] xl:w-[460px] flex-shrink-0`}>
          <ArenaChatPane
            onRunDiffQuery={handleRunDiffQuery}
          />
        </div>

        {/* Right Column: Quran Platform Preview & Code Window */}
        <div className={`h-full ${mobileTab === 'preview' ? 'flex-1' : 'hidden'} md:flex md:flex-1 flex-col overflow-hidden bg-[#070b0e]`}>
          {/* Header of Preview Pane */}
          <ArenaPreviewHeader
            activeTab={activePreviewTab}
            onChangeTab={setActivePreviewTab}
            isFullscreen={false}
            onToggleFullscreen={handleToggleFullscreen}
            onRefresh={handleRefresh}
            fileName="quran-platform.html"
          />

          {/* Canvas */}
          <div className="flex-1 overflow-hidden relative">
            {activePreviewTab === 'preview' ? (
              <QuranPlatform
                key={refreshKey}
                initialFocusVerse={focusedVerseNumber}
                onCloseFocus={() => setFocusedVerseNumber(null)}
              />
            ) : (
              <CodeViewer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
