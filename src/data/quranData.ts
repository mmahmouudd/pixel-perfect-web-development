export interface WordDiff {
  hafs: string;
  warsh: string;
  qalun?: string;
  duri?: string;
  wordIndex: number;
  explanation: {
    ar: string;
    en: string;
  };
}

export interface Verse {
  number: number;
  surahNumber: number;
  textHafs: string;
  textWarsh: string;
  translationEn: string;
  translationFr: string;
  translationUr: string;
  translationId: string;
  translationTr: string;
  tafsirMuyassar: string;
  diffs?: WordDiff[];
  audioHafs: string;
  audioWarsh?: string;
}

export interface Surah {
  number: number;
  nameAr: string;
  nameEn: string;
  nameTranslit: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  verses: Verse[];
}

export const SURAHS_DATA: Surah[] = [
  {
    number: 1,
    nameAr: "الفاتحة",
    nameEn: "The Opening",
    nameTranslit: "Al-Fātiḥah",
    versesCount: 7,
    revelationType: "Meccan",
    verses: [
      {
        number: 1,
        surahNumber: 1,
        textHafs: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        textWarsh: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
        translationEn: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        translationFr: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.",
        translationUr: "اللہ کے نام سے جو رحمان و رحیم ہے",
        translationId: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
        translationTr: "Rahman ve Rahim olan Allah'ın adıyla.",
        tafsirMuyassar: "أبتدئ قراءتي مستعينا باسم الله، وهو علم على الذات الإلهية المعبودة بحق.",
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/001001.mp3"
      },
      {
        number: 2,
        surahNumber: 1,
        textHafs: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
        textWarsh: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translationEn: "[All] praise is [due] to Allah, Lord of the worlds -",
        translationFr: "Louange à Allah, Seigneur de l'univers.",
        translationUr: "تعریف اللہ ہی کے لیے ہے جو تمام جہانوں کا رب ہے",
        translationId: "Segala puji bagi Allah, Tuhan seluruh alam,",
        translationTr: "Hamd, âlemlerin Rabbi olan Allah'a mahsustur.",
        tafsirMuyassar: "الثناء الكامل والشكر الخالص لله تعالى وحده، خالق الخلائق ومدبرها ومربيها بنعمه.",
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/001002.mp3"
      },
      {
        number: 3,
        surahNumber: 1,
        textHafs: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        textWarsh: "الرَّحْمَـٰنِ الرَّحِيمِ",
        translationEn: "The Entirely Merciful, the Especially Merciful,",
        translationFr: "Le Tout Miséricordieux, le Très Miséricordieux,",
        translationUr: "جو رحمان اور رحیم ہے",
        translationId: "Yang Maha Pengasih, Maha Penyayang,",
        translationTr: "O, Rahman ve Rahimdir.",
        tafsirMuyassar: "الرحمن الذي وسعت رحمته جميع خلقه، الرحيم بالمؤمنين خاصة.",
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/001003.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/001003.mp3"
      },
      {
        number: 4,
        surahNumber: 1,
        textHafs: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
        textWarsh: "مَلِكِ يَوْمِ الدِّينِ",
        translationEn: "Sovereign of the Day of Recompense.",
        translationFr: "Maître du Jour de la rétribution.",
        translationUr: "روز جزا کا مالک ہے",
        translationId: "Pemilik hari pembalasan.",
        translationTr: "Ceza ve mükâfat gününün sahibidir.",
        tafsirMuyassar: "المتصرف وحده في يوم الحساب والجزاء، وهو يوم القيامة. قرأ عاصم والكسائي ويعقوب وخلف: (مَالِكِ) بالألف، وقرأ الباقون: (مَلِكِ) بغير ألف، والجمع بينهما يدل على كمال ملكه وسلطانه.",
        diffs: [
          {
            hafs: "مَٰلِكِ",
            warsh: "مَلِكِ",
            qalun: "مَلِكِ",
            duri: "مَلِكِ",
            wordIndex: 0,
            explanation: {
              ar: "في رواية حفص (عن عاصم) تُقرأ بألف: (مَالِكِ) من المِلْك، وفي رواية ورش وقالون والدوري تُقرأ بغير ألف: (مَلِكِ) من المُلْك والسيادة. وكلاهما قراءتان متواتران متكاملتان تعبّران عن تمام التصرف والسلطان لله عز وجل.",
              en: "In Hafs 'an 'Asim, read as 'Mālik' (مَالِكِ - Master/Owner) with an alif. In Warsh 'an Nafi', Qalun, and Al-Duri, read as 'Malik' (مَلِكِ - King/Sovereign) without an alif. Both are mutawatir readings complementing total sovereignty and absolute ownership."
            }
          }
        ],
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/001004.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/001004.mp3"
      },
      {
        number: 5,
        surahNumber: 1,
        textHafs: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        textWarsh: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translationEn: "It is You we worship and You we ask for help.",
        translationFr: "C'est Toi [Seul] que nous adorons, et c'est Toi [Seul] dont nous implorons secours.",
        translationUr: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں",
        translationId: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",
        translationTr: "(Rabbimiz!) Yalnız sana kulluk eder ve yalnız senden yardım dileriz.",
        tafsirMuyassar: "نخصك وحدك بالعبادة، ونستعين بك وحدك في جميع أمورنا.",
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/001005.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/001005.mp3"
      },
      {
        number: 6,
        surahNumber: 1,
        textHafs: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
        textWarsh: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translationEn: "Guide us to the straight path -",
        translationFr: "Guide-nous dans le droit chemin,",
        translationUr: "ہمیں سیدھا راستہ دکھا",
        translationId: "Tunjukilah kami jalan yang lurus,",
        translationTr: "Bizi doğru yola ilet.",
        tafsirMuyassar: "دلنا وأرشدنا ووفقنا وثبتنا على الطريق الواضح الموصل إليك وإلى جنتك، وهو دين الإسلام.",
        diffs: [
          {
            hafs: "ٱلصِّرَٰطَ",
            warsh: "الصِّرَاطَ",
            qalun: "الصِّرَاطَ",
            duri: "الصِّرَاطَ",
            wordIndex: 1,
            explanation: {
              ar: "روى قنبل بالسين (السِّراط)، وروى حمزة بإشمام الصاد زايًا (الزِّراط)، وقرأ الجمهور بالصاد الخالصة.",
              en: "Read with pure Sad (الصراط) by Hafs and Warsh; Qunbul reads with Seen (السراط), and Hamzah reads with Ishmam (Sad blended with Zay)."
            }
          }
        ],
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/001006.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/001006.mp3"
      },
      {
        number: 7,
        surahNumber: 1,
        textHafs: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
        textWarsh: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translationEn: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        translationFr: "le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.",
        translationUr: "ان لوگوں کا راستہ جن پر تو نے انعام کیا، نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا",
        translationId: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
        translationTr: "Kendilerine lütuf ve ikramda bulunduğun kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil.",
        tafsirMuyassar: "طريق النبيين والصدّيقين والشهداء والصالحين، غير طريق المغضوب عليهم (اليهود ومن شابههم)، ولا الضالين (النصارى ومن تبعهم).",
        diffs: [
          {
            hafs: "عَلَيْهِمْ",
            warsh: "عَلَيْهِمْ",
            qalun: "عَلَيْهِمْ / عَلَيْهِمُو",
            duri: "عَلَيْهِمْ",
            wordIndex: 3,
            explanation: {
              ar: "قرأ حمزة بضم الهاء (عَلَيْهُم)، وقرأ قالون بوجهين: صلة ميم الجمع وسكونها (عليهمُو)، وقرأ ابن كثير بالصلة حتماً.",
              en: "Hamzah reads with Dammah on the Ha (عَلَيْهُم). Qalun has two options (Silah of Meem: 'alayhimū or sukoon). Ibn Kathir reads with Silah."
            }
          }
        ],
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/001007.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/001007.mp3"
      }
    ]
  },
  {
    number: 112,
    nameAr: "الإخلاص",
    nameEn: "The Sincerity",
    nameTranslit: "Al-Ikhlāṣ",
    versesCount: 4,
    revelationType: "Meccan",
    verses: [
      {
        number: 1,
        surahNumber: 112,
        textHafs: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
        textWarsh: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        translationEn: "Say, \"He is Allah, [who is] One,",
        translationFr: "Dis: «Il est Allah, Unique.",
        translationUr: "کہو: وہ اللہ ایک ہے",
        translationId: "Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.",
        translationTr: "De ki: O, Allah birdir.",
        tafsirMuyassar: "قل -أيها الرسول-: هو الله المتفرد بالألوهية والربوبية والأسماء والصفات، لا شريك له.",
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/112001.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/112001.mp3"
      },
      {
        number: 2,
        surahNumber: 112,
        textHafs: "ٱللَّهُ ٱلصَّمَدُ",
        textWarsh: "اللَّهُ الصَّمَدُ",
        translationEn: "Allah, the Eternal Refuge.",
        translationFr: "Allah, Le Seul à être imploré pour ce que nous désirons.",
        translationUr: "اللہ بے نیاز ہے",
        translationId: "Allah tempat meminta segala sesuatu.",
        translationTr: "Allah sameddir (her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir).",
        tafsirMuyassar: "الله الذي تصمد إليه الخلائق كلها في حوائجها ورغائبها.",
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/112002.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/112002.mp3"
      },
      {
        number: 3,
        surahNumber: 112,
        textHafs: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        textWarsh: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        translationEn: "He neither begets nor is born,",
        translationFr: "Il n'a jamais engendré, n'a pas été engendré non plus.",
        translationUr: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے",
        translationId: "(Allah) tidak beranak dan tidak pula diperanakkan,",
        translationTr: "O, doğurmamış ve doğmamıştır.",
        tafsirMuyassar: "ليس له ولد ولا والد ولا صاحبة، لكمال غناه وأزليته.",
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/112003.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/112003.mp3"
      },
      {
        number: 4,
        surahNumber: 112,
        textHafs: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
        textWarsh: "وَلَمْ يَكُن لَّهُ كُفُؤًا أَحَدٌ",
        translationEn: "Nor is there to Him any equivalent.\"",
        translationFr: "Et nul n'est égal à Lui».",
        translationUr: "اور کوئی اس کا ہمسر نہیں ہے",
        translationId: "Dan tidak ada sesuatu yang setara dengan Dia.\"",
        translationTr: "Hiçbir şey O'na denk değildir.",
        tafsirMuyassar: "ولم يكن له مماثل ولا نظير في أسمائه وصفاته وأفعاله سبحانه.",
        diffs: [
          {
            hafs: "كُفُوًا",
            warsh: "كُفُؤًا",
            qalun: "كُفُؤًا",
            duri: "كُفُوًا",
            wordIndex: 3,
            explanation: {
              ar: "قرأ حفص بضم الفاء مع إبدال الهمزة واواً (كُفُوًا)، وقرأ حمزة بإسكان الفاء مع الهمز (كُفْئًا)، وقرأ ورش وقالون بضم الفاء مع الهمز (كُفُؤًا).",
              en: "Hafs reads with dammah on fa without hamzah (كُفُوًا). Warsh and Qalun read with dammah on fa with hamzah (كُفُؤًا). Hamzah reads with sukoon on fa and hamzah (كُفْئًا)."
            }
          }
        ],
        audioHafs: "https://everyayah.com/data/Alafasy_128kbps/112004.mp3",
        audioWarsh: "https://everyayah.com/data/warsh/warsh_yassin_al_jazaery_64kbps/112004.mp3"
      }
    ]
  }
];

export interface Reciter {
  id: string;
  nameAr: string;
  titleAr: string;
  nameEn: string;
  riwayah: string;
  riwayahId: 'hafs' | 'warsh' | 'qalun' | 'duri';
  style: 'مرتل' | 'مجوّد';
  subfolder: string;
  bitrate: string;
  location: string;
  avatarInitials: string;
  colorScheme: 'gold' | 'emerald' | 'amber' | 'cyan' | 'purple';
}

export const RECITERS_LIST: Reciter[] = [
  { 
    id: 'alafasy', 
    nameAr: 'مشاري بن راشد العفاسي', 
    titleAr: 'الشيخ مشاري راشد العفاسي',
    nameEn: 'Mishary Rashid Alafasy', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مرتل',
    subfolder: 'Alafasy_128kbps',
    bitrate: '128 kbps',
    location: 'الكويت',
    avatarInitials: 'مع',
    colorScheme: 'amber'
  },
  { 
    id: 'husary_hafs', 
    nameAr: 'محمود خليل الحصري', 
    titleAr: 'شيخ عموم المقارئ المصرية الحصري',
    nameEn: 'Mahmoud Khalil Al-Husary', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مرتل',
    subfolder: 'Husary_128kbps',
    bitrate: '128 kbps',
    location: 'مصر',
    avatarInitials: 'مح',
    colorScheme: 'gold'
  },
  { 
    id: 'husary_warsh', 
    nameAr: 'محمود خليل الحصري (ورش)', 
    titleAr: 'الشيخ الحصري — برواية ورش عن نافع',
    nameEn: 'Mahmoud Khalil Al-Husary (Warsh)', 
    riwayah: 'ورش عن نافع', 
    riwayahId: 'warsh',
    style: 'مرتل',
    subfolder: 'Warsh_Husary_128kbps',
    bitrate: '128 kbps',
    location: 'مصر / المغرب العربي',
    avatarInitials: 'حو',
    colorScheme: 'emerald'
  },
  { 
    id: 'abdulbasit_murattal', 
    nameAr: 'عبد الباسط عبد الصمد (مرتل)', 
    titleAr: 'صوت مكة الشيخ عبد الباسط عبد الصمد',
    nameEn: 'Abdul Basit Abdul Samad (Murattal)', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مرتل',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    bitrate: '192 kbps',
    location: 'مصر',
    avatarInitials: 'عب',
    colorScheme: 'gold'
  },
  { 
    id: 'abdulbasit_mujawwad', 
    nameAr: 'عبد الباسط عبد الصمد (مجوّد)', 
    titleAr: 'الشيخ عبد الباسط عبد الصمد — تجويد بديع',
    nameEn: 'Abdul Basit Abdul Samad (Mujawwad)', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مجوّد',
    subfolder: 'Abdul_Basit_Mujawwad_128kbps',
    bitrate: '128 kbps',
    location: 'مصر',
    avatarInitials: 'عم',
    colorScheme: 'amber'
  },
  { 
    id: 'minshawi_murattal', 
    nameAr: 'محمد صديق المنشاوي (مرتل)', 
    titleAr: 'الصوت الباكي الشيخ محمد صديق المنشاوي',
    nameEn: 'Mohamed Siddiq El-Minshawi (Murattal)', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مرتل',
    subfolder: 'Minshawy_Murattal_128kbps',
    bitrate: '128 kbps',
    location: 'مصر',
    avatarInitials: 'من',
    colorScheme: 'cyan'
  },
  { 
    id: 'minshawi_mujawwad', 
    nameAr: 'محمد صديق المنشاوي (مجوّد)', 
    titleAr: 'الشيخ محمد صديق المنشاوي — تلاوة مجودة خاشعة',
    nameEn: 'Mohamed Siddiq El-Minshawi (Mujawwad)', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مجوّد',
    subfolder: 'Minshawy_Mujawwad_192kbps',
    bitrate: '192 kbps',
    location: 'مصر',
    avatarInitials: 'مج',
    colorScheme: 'cyan'
  },
  { 
    id: 'ghamadi', 
    nameAr: 'سعد بن سعيد الغامدي', 
    titleAr: 'فضيلة الشيخ سعد الغامدي',
    nameEn: 'Saad Al-Ghamdi', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مرتل',
    subfolder: 'Ghamadi_40kbps',
    bitrate: '40 kbps',
    location: 'السعودية',
    avatarInitials: 'سغ',
    colorScheme: 'purple'
  },
  { 
    id: 'maher', 
    nameAr: 'ماهر بن حمد المعيقلي', 
    titleAr: 'إمام المسجد الحرام الشيخ ماهر المعيقلي',
    nameEn: 'Maher Al-Muaiqly', 
    riwayah: 'حفص عن عاصم', 
    riwayahId: 'hafs',
    style: 'مرتل',
    subfolder: 'MaherAlMuaiqly128kbps',
    bitrate: '128 kbps',
    location: 'مكة المكرمة',
    avatarInitials: 'مم',
    colorScheme: 'amber'
  },
  { 
    id: 'yassin_warsh', 
    nameAr: 'ياسين الجزائري (ورش)', 
    titleAr: 'المقرئ الشيخ ياسين الجزائري برواية ورش',
    nameEn: 'Yassin Al-Jazaery (Warsh)', 
    riwayah: 'ورش عن نافع', 
    riwayahId: 'warsh',
    style: 'مرتل',
    subfolder: 'warsh/warsh_yassin_al_jazaery_64kbps',
    bitrate: '64 kbps',
    location: 'الجزائر',
    avatarInitials: 'يج',
    colorScheme: 'emerald'
  }
];

/**
 * Returns authentic EveryAyah audio URL for any reciter, surah and verse
 */
export const getAyahAudioUrl = (reciterId: string, surahNumber: number, verseNumber: number): string => {
  const reciter = RECITERS_LIST.find(r => r.id === reciterId) || RECITERS_LIST[0];
  const s = String(surahNumber).padStart(3, '0');
  const v = String(verseNumber).padStart(3, '0');
  return `https://everyayah.com/data/${reciter.subfolder}/${s}${v}.mp3`;
};

/**
 * Fallback audio URL in case of network or mirror delay
 */
export const getAyahFallbackAudioUrl = (surahNumber: number, verseNumber: number): string => {
  const s = String(surahNumber).padStart(3, '0');
  const v = String(verseNumber).padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${v}.mp3`;
};

export interface LanguageOption {
  code: string;
  nameNative: string;
  nameEn: string;
  isRtl: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'ar', nameNative: 'العربية', nameEn: 'Arabic', isRtl: true },
  { code: 'en', nameNative: 'English', nameEn: 'English', isRtl: false },
  { code: 'fr', nameNative: 'Français', nameEn: 'French', isRtl: false },
  { code: 'ur', nameNative: 'اردو', nameEn: 'Urdu', isRtl: true },
  { code: 'tr', nameNative: 'Türkçe', nameEn: 'Turkish', isRtl: false },
  { code: 'id', nameNative: 'Bahasa Indonesia', nameEn: 'Indonesian', isRtl: false },
  { code: 'es', nameNative: 'Español', nameEn: 'Spanish', isRtl: false },
  { code: 'de', nameNative: 'Deutsch', nameEn: 'German', isRtl: false },
  { code: 'fa', nameNative: 'فارسی', nameEn: 'Persian', isRtl: true },
  { code: 'ms', nameNative: 'Bahasa Melayu', nameEn: 'Malay', isRtl: false }
];

export interface QiraahInfo {
  id: string;
  reader: string;
  transmitter: string;
  region: string;
  popularity: string;
}

export const QIRAAT_INFO: QiraahInfo[] = [
  { id: 'hafs', reader: 'عاصم الكوفي (ت ١٢٧ هـ)', transmitter: 'حفص بن سليمان (ت ١٨٠ هـ)', region: 'المشرق الإسلامي ومعظم العالم', popularity: 'الأوسع انتشاراً (حوالي ٩٠٪)' },
  { id: 'warsh', reader: 'نافع المدني (ت ١٦٩ هـ)', transmitter: 'عثمان بن سعيد (ورش) (ت ١٩٧ هـ)', region: 'شمال وغرب إفريقيا (المغرب، الجزائر، موريتانيا)', popularity: 'ثاني أكثر الروايات انتشاراً' },
  { id: 'qalun', reader: 'نافع المدني (ت ١٦٩ هـ)', transmitter: 'عيسى بن مينا (قالون) (ت ٢٢٠ هـ)', region: 'ليبيا وتونس وبعض تشاد', popularity: 'شائعة في المغرب العربي' },
  { id: 'duri', reader: 'أبو عمرو البصري (ت ١٥٤ هـ)', transmitter: 'حفص بن عمر الدوري (ت ٢٤٦ هـ)', region: 'السودان وشرق إفريقيا', popularity: 'سائدة في أجزاء من إفريقيا' }
];
