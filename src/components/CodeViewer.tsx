import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<!-- quran-platform.html : Nūr al-Qirā'āt System -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>نور القراءات — Nūr al-Qirā'āt</title>
  <link rel="stylesheet" href="styles/quran-luxury.css" />
</head>
<body class="bg-obsidian text-gold islamic-pattern">
  <div class="platform-container">
    <!-- Navigation Header -->
    <header class="header-card glassmorphism">
      <div class="actions" dir="ltr">
        <button class="btn-icon" aria-label="Menu">☰</button>
        <button class="btn-icon" aria-label="Dark Mode">🌙</button>
        <button class="btn-icon badge-ar" aria-label="Language">🌐 AR</button>
      </div>

      <div class="brand">
        <div class="brand-text">
          <h1 class="font-cinzel">Nūr al-Qirā'āt</h1>
          <p class="font-arabic">القرآن الكريم بالقراءات</p>
        </div>
        <div class="brand-emblem">۞</div>
      </div>
    </header>

    <!-- Main Feature Modules -->
    <main class="cards-grid">
      <!-- Feature 1: Word-by-word Qira'at Comparison -->
      <article class="feature-card" data-feature="compare">
        <div class="card-content">
          <div class="card-text">
            <h2>مقارنة الروايات كلمةً بكلمة</h2>
            <p>تُصطف الروايات آية بآية وتُميّز الكلمات المختلفة، فلا يفوتك موضع اختلاف.</p>
          </div>
          <div class="card-icon">☷</div>
        </div>
      </article>

      <!-- Feature 2: Verse-by-verse Recitation -->
      <article class="feature-card" data-feature="recitation">
        <div class="card-content">
          <div class="card-text">
            <h2>تلاوة آية بآية</h2>
            <p>تُظلّل الآية الجاري تلاوتها وتنتقل تلقائيًا إلى ما بعدها، بالسرعة التي تختارها.</p>
          </div>
          <div class="card-icon icon-mic">🎙️</div>
        </div>
      </article>

      <!-- Feature 3: 98 Languages Translations -->
      <article class="feature-card" data-feature="translations">
        <div class="card-content">
          <div class="card-text">
            <h2>معاني القرآن بثماني وتسعين لغة</h2>
            <p>بدّل لغة الواجهة ولغة الترجمة كلّاً على حدة، بأي لغة في العالم، ومنها اللغات التي تُكتب من اليمين.</p>
          </div>
          <div class="card-icon icon-globe">🌐</div>
        </div>
      </article>
    </main>
  </div>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#121215] text-zinc-300 font-mono-code text-xs p-4 overflow-auto relative">
      <div className="flex items-center justify-between pb-3 border-b border-[#25252b] mb-3">
        <span className="text-zinc-400">quran-platform.html</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#202025] hover:bg-[#2b2b32] text-zinc-300 hover:text-white transition-colors text-[11px]"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Code'}</span>
        </button>
      </div>

      <pre className="text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
        {codeSnippet}
      </pre>
    </div>
  );
};
