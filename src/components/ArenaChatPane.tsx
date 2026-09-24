import React, { useState } from 'react';
import { 
  Folder, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ArrowDown, 
  Paperclip, 
  Square, 
  Send,
  FileCode,
  Layers
} from 'lucide-react';

interface ArenaChatPaneProps {
  onRunDiffQuery?: (verseNum: number) => void;
}

interface BashStep {
  id: string;
  type: 'bash';
  success: boolean;
  duration: string;
  command?: string;
  output?: string;
  isExit1?: boolean;
}

interface ThoughtStep {
  id: string;
  type: 'thought';
  duration: string;
  content: string;
}

type TimelineItem = BashStep | ThoughtStep;

export const ArenaChatPane: React.FC<ArenaChatPaneProps> = ({ onRunDiffQuery }) => {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [inputValue, setInputValue] = useState('');
  const [userMessages, setUserMessages] = useState<string[]>([]);

  const toggleStep = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const timelineItems: TimelineItem[] = [
    { 
      id: 'step-1', 
      type: 'bash', 
      success: true, 
      duration: '15s',
      command: 'npm run test:qiraat-diff',
      output: 'Testing Qira\'at verse tokenizer: 114 Surahs indexed. 12 mutawatir variants loaded.'
    },
    { 
      id: 'step-2', 
      type: 'thought', 
      duration: '1 second',
      content: 'Inspecting the verse alignment matrix for Al-Fatiha and verifying token-level divergence markers.'
    },
    { 
      id: 'step-3', 
      type: 'bash', 
      success: true, 
      duration: '15s',
      command: 'node scripts/verify-orthography.js --surah 1',
      output: 'Checking Hafs vs Warsh orthographic diacritics on Surah 1 (Al-Fatihah)...'
    },
    { 
      id: 'step-4', 
      type: 'thought', 
      duration: '1 second',
      content: 'Comparing word hashes between the Medina Mushaf (Hafs) and the Moroccan Royal Mushaf (Warsh).'
    },
    { 
      id: 'step-5', 
      type: 'bash', 
      success: true, 
      duration: '131ms',
      command: 'cat src/data/diff-rules.json | grep "al-Fatiha"',
      output: 'Found 3 variance indices in Surah 1: verses 4, 6, and 7.'
    },
    { 
      id: 'step-6', 
      type: 'thought', 
      duration: '2 seconds',
      content: 'Analyzing the diff output between normalized Arabic text vs raw Uthmani diacritics.'
    },
    { 
      id: 'step-7', 
      type: 'bash', 
      success: true, 
      duration: '15s',
      command: 'python3 scripts/validate_quran_corpus.py --compare hafs,warsh',
      output: 'Surah 1:4 token 1: Hafs [مَالِكِ / Mālik] vs Warsh [مَلِكِ / Malik].'
    },
    { 
      id: 'step-8', 
      type: 'thought', 
      duration: '2 seconds',
      content: 'Examining why the automated diff algorithm flagged verse 1:4 as a false negative previously.'
    },
    { 
      id: 'step-9', 
      type: 'bash', 
      success: true, 
      duration: '15s',
      command: 'npm run build:preview',
      output: 'Building quran-platform.html with full audio sync and word-by-word Qira\'at comparison engine.'
    },
    { 
      id: 'step-10', 
      type: 'thought', 
      duration: '7 seconds',
      content: 'Both diff implementations must treat dagger alif (الألف الخنجرية) consistently across Riwayat.'
    }
  ];

  const laterSteps: TimelineItem[] = [
    { 
      id: 'step-11', 
      type: 'bash', 
      success: false, 
      duration: '163ms',
      isExit1: true,
      command: 'node -e "assert.strictEqual(normalize(\'مَٰلِكِ\'), normalize(\'مَلِكِ\'))"',
      output: 'AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: \'مالك\' !== \'ملك\''
    },
    { 
      id: 'step-12', 
      type: 'thought', 
      duration: '1 second',
      content: 'The assertion failed because \'Mālik\' and \'Malik\' are genuine lexical and Qira\'at differences, not an orthographic typo!'
    },
    { 
      id: 'step-13', 
      type: 'bash', 
      success: true, 
      duration: '2.0s',
      command: 'npm run test:verify-mutawatir-qiraat',
      output: 'PASS: Verified 1:4 Hafs [مَالِكِ] vs Warsh [مَلِكِ] - Confirmed authentic Mutawatir divergence.'
    },
    { 
      id: 'step-14', 
      type: 'thought', 
      duration: '4 seconds',
      content: 'Synthesizing the explanation for the UI highlighting both words with specific tafsir roots (Mulk vs Milk).'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setUserMessages(prev => [...prev, inputValue]);
    setInputValue('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#18181b] border-r border-[#26262b] min-w-[340px] max-w-xl text-zinc-200">
      {/* Top Header: Agent Mode ⌵ and Folder toggle */}
      <div className="h-13 px-4 flex items-center justify-between border-b border-[#222227] flex-shrink-0">
        <button className="flex items-center gap-1.5 text-zinc-200 hover:text-white text-sm font-medium transition-colors">
          <Layers className="w-4 h-4 text-zinc-400" />
          <span>Agent Mode</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
        </button>

        <button 
          title="Project files"
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#232329] rounded-md transition-colors"
        >
          <Folder className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-[13px] leading-relaxed">
        {/* User Prompt Bubble: "اكمل وصحح الاخطاء" */}
        <div className="flex justify-end pt-1">
          <div 
            dir="rtl"
            className="bg-[#383333] hover:bg-[#3f3939] transition-colors text-zinc-100 px-4 py-2 rounded-2xl rounded-tr-sm text-sm font-cairo shadow-sm"
          >
            اكمل وصحح الاخطاء
          </div>
        </div>

        {/* First set of bash & thought steps */}
        <div className="space-y-1 pt-1.5">
          {timelineItems.map((item) => {
            if (item.type === 'bash') {
              const isExpanded = !!expandedSteps[item.id];
              return (
                <div key={item.id} className="text-zinc-400">
                  <button
                    onClick={() => toggleStep(item.id)}
                    className="flex items-center gap-1.5 py-0.5 px-1 rounded hover:bg-[#232328] hover:text-zinc-200 transition-colors text-xs group"
                  >
                    {/* Prompt Box [>_] */}
                    <div className="w-3.5 h-3.5 rounded-sm border border-zinc-500/60 flex items-center justify-center text-[9px] font-mono font-bold text-zinc-400 leading-none">
                      &gt;
                    </div>
                    <span className="text-zinc-300">used Bash</span>
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-sans">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      <span className="text-zinc-400">{item.duration}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-zinc-500" />
                    )}
                  </button>

                  {isExpanded && item.command && (
                    <div className="mt-1 ml-5 p-2 bg-[#121214] rounded-md border border-[#27272a] text-[11px] font-mono-code text-zinc-300 space-y-1">
                      <div className="text-zinc-400">$ {item.command}</div>
                      {item.output && (
                        <div className="text-emerald-400/90 whitespace-pre-wrap">{item.output}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            const isExpanded = !!expandedSteps[item.id];
            return (
              <div key={item.id} className="text-zinc-400">
                <button
                  onClick={() => toggleStep(item.id)}
                  className="flex items-center gap-1.5 py-0.5 px-1 rounded hover:bg-[#232328] hover:text-zinc-200 transition-colors text-xs group"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="12" y1="3" x2="12" y2="21" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                  </svg>
                  <span className="text-zinc-300">Thought for {item.duration}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3 h-3 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-zinc-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 ml-5 p-2 bg-[#151518] rounded-md border border-[#252529] text-[11px] text-zinc-300 italic">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mid-response text from agent */}
        <div className="text-zinc-200 font-normal pt-1 text-[13px]">
          One inconsistency left between the two diff functions. Let me pin it down.
        </div>

        {/* Later bash & thought steps */}
        <div className="space-y-1 pt-1">
          {laterSteps.map((item) => {
            if (item.type === 'bash') {
              const isExpanded = !!expandedSteps[item.id];
              return (
                <div key={item.id} className="text-zinc-400">
                  <button
                    onClick={() => toggleStep(item.id)}
                    className="flex items-center gap-1.5 py-0.5 px-1 rounded hover:bg-[#232328] hover:text-zinc-200 transition-colors text-xs group"
                  >
                    <div className="w-3.5 h-3.5 rounded-sm border border-zinc-500/60 flex items-center justify-center text-[9px] font-mono font-bold text-zinc-400 leading-none">
                      &gt;
                    </div>
                    <span className="text-zinc-300">used Bash</span>
                    {item.isExit1 ? (
                      <span className="flex items-center gap-1 text-red-400 text-xs font-sans">
                        <X className="w-3 h-3 stroke-[2.5]" />
                        <span className="text-red-400">exit 1</span>
                        <span className="text-zinc-400">{item.duration}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs font-sans">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span className="text-zinc-400">{item.duration}</span>
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-zinc-500" />
                    )}
                  </button>

                  {isExpanded && item.command && (
                    <div className="mt-1 ml-5 p-2 bg-[#121214] rounded-md border border-[#27272a] text-[11px] font-mono-code text-zinc-300 space-y-1">
                      <div className="text-zinc-400">$ {item.command}</div>
                      {item.output && (
                        <div className={item.isExit1 ? "text-red-400/90 whitespace-pre-wrap" : "text-emerald-400/90 whitespace-pre-wrap"}>
                          {item.output}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            const isExpanded = !!expandedSteps[item.id];
            return (
              <div key={item.id} className="text-zinc-400">
                <button
                  onClick={() => toggleStep(item.id)}
                  className="flex items-center gap-1.5 py-0.5 px-1 rounded hover:bg-[#232328] hover:text-zinc-200 transition-colors text-xs group"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="12" y1="3" x2="12" y2="21" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                  </svg>
                  <span className="text-zinc-300">Thought for {item.duration}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3 h-3 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-zinc-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 ml-5 p-2 bg-[#151518] rounded-md border border-[#252529] text-[11px] text-zinc-300 italic">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Agent Statement regarding verse 1:4 Mālik vs Malik */}
        <div className="text-zinc-100 font-normal pt-1.5 leading-relaxed bg-[#1d1d22]/50 p-3 rounded-xl border border-[#292930]">
          That &ldquo;false positive&rdquo; is actually the famous{' '}
          <button 
            type="button"
            onClick={() => onRunDiffQuery && onRunDiffQuery(4)}
            className="inline-flex items-center gap-1 font-semibold text-amber-300 font-amiri text-base mx-1 bg-amber-950/40 hover:bg-amber-900/50 px-2 py-0.5 rounded border border-amber-500/30 transition-colors cursor-pointer"
            title="Inspect verse 1:4 difference"
          >
            مَالِكِ
          </button>{' '}
          /{' '}
          <button 
            type="button"
            onClick={() => onRunDiffQuery && onRunDiffQuery(4)}
            className="inline-flex items-center gap-1 font-semibold text-emerald-300 font-amiri text-base mx-1 bg-emerald-950/40 hover:bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-500/30 transition-colors cursor-pointer"
            title="Inspect verse 1:4 difference"
          >
            مَلِكِ
          </button>{' '}
          difference at 1:4 &mdash; the app is right and my assertion
        </div>

        {/* User sent messages */}
        {userMessages.map((msg, index) => (
          <div key={index} className="flex justify-end pt-2">
            <div className="bg-[#383333] text-zinc-100 px-4 py-2 rounded-2xl rounded-tr-sm text-sm shadow-sm">
              {msg}
            </div>
          </div>
        ))}

        {/* Floating scroll bottom pill */}
        <div className="flex justify-center pt-2">
          <button 
            title="Scroll to bottom"
            className="w-7 h-7 rounded-full bg-[#27272d] hover:bg-[#323238] border border-[#383840] flex items-center justify-center text-zinc-300 hover:text-white shadow-lg transition-transform hover:scale-105"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Input Box Area */}
      <div className="p-3 pt-0">
        <form 
          onSubmit={handleSendMessage}
          className="bg-[#202025] rounded-2xl border border-[#303038] focus-within:border-[#4c4c58] transition-colors p-2.5 shadow-md"
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="What would you like to do?"
            rows={2}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none outline-none px-1"
          />

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded-lg hover:bg-[#2b2b33] transition-colors"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Add files</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-[#2b2b33] rounded-lg transition-colors"
                title="Templates"
              >
                <FileCode className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="w-7 h-7 rounded-lg bg-zinc-200 hover:bg-white text-zinc-900 flex items-center justify-center transition-colors shadow-sm"
                title="Send"
              >
                {inputValue.trim() ? (
                  <Send className="w-3.5 h-3.5" />
                ) : (
                  <Square className="w-3 h-3 fill-current" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
