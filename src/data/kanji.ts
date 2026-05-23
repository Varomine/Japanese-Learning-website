export interface KanjiEntry {
  id: string;
  character: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
  strokes: number;
  examples: { word: string; reading: string; meaning: string }[];
}

export const kanjiData: KanjiEntry[] = [
  // N5
  {
    id: 'k-n5-1',
    character: '日',
    level: 'N5',
    meanings: ['day', 'sun', 'Japan', 'counter for days'],
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', '-び', '-か'],
    strokes: 4,
    examples: [
      { word: '日本', reading: 'にほん', meaning: 'Japan' },
      { word: '一日', reading: 'ついたち', meaning: '1st day of the month' },
      { word: '毎日', reading: 'まいにち', meaning: 'every day' }
    ]
  },
  {
    id: 'k-n5-2',
    character: '本',
    level: 'N5',
    meanings: ['book', 'present', 'true', 'counter for long cylindrical things'],
    onyomi: ['ホン'],
    kunyomi: ['もと'],
    strokes: 5,
    examples: [
      { word: '本', reading: 'ほん', meaning: 'book' },
      { word: '日本語', reading: 'にほんご', meaning: 'Japanese language' },
      { word: '山本', reading: 'やまもと', meaning: 'Yamamoto (surname)' }
    ]
  },
  {
    id: 'k-n5-3',
    character: '人',
    level: 'N5',
    meanings: ['person'],
    onyomi: ['ジン', 'ニン'],
    kunyomi: ['ひと', '-り', '-と'],
    strokes: 2,
    examples: [
      { word: '日本人', reading: 'にほんじん', meaning: 'Japanese person' },
      { word: '三人', reading: 'さんにん', meaning: 'three people' },
      { word: '大人', reading: 'おとな', meaning: 'adult' }
    ]
  },
  {
    id: 'k-n5-4',
    character: '水',
    level: 'N5',
    meanings: ['water'],
    onyomi: ['スイ'],
    kunyomi: ['みず'],
    strokes: 4,
    examples: [
      { word: '水', reading: 'みず', meaning: 'water' },
      { word: '水曜日', reading: 'すいようび', meaning: 'Wednesday' },
      { word: '香水', reading: 'こうすい', meaning: 'perfume' }
    ]
  },
  {
    id: 'k-n5-5',
    character: '山',
    level: 'N5',
    meanings: ['mountain'],
    onyomi: ['サン', 'ザン'],
    kunyomi: ['やま'],
    strokes: 3,
    examples: [
      { word: '山', reading: 'やま', meaning: 'mountain' },
      { word: '富士山', reading: 'ふじさん', meaning: 'Mount Fuji' },
      { word: '火山', reading: 'かざん', meaning: 'volcano' }
    ]
  },

  // N4
  {
    id: 'k-n4-1',
    character: '犬',
    level: 'N4',
    meanings: ['dog'],
    onyomi: ['ケン'],
    kunyomi: ['いぬ'],
    strokes: 4,
    examples: [
      { word: '犬', reading: 'いぬ', meaning: 'dog' },
      { word: '子犬', reading: 'こいぬ', meaning: 'puppy' },
      { word: '番犬', reading: 'ばんけん', meaning: 'watchdog' }
    ]
  },
  {
    id: 'k-n4-2',
    character: '会',
    level: 'N4',
    meanings: ['meeting', 'meet', 'association', 'join'],
    onyomi: ['カイ', 'エ'],
    kunyomi: ['あ-う'],
    strokes: 6,
    examples: [
      { word: '会う', reading: 'あう', meaning: 'to meet' },
      { word: '会社', reading: 'かいしゃ', meaning: 'company' },
      { word: '会話', reading: 'かいわ', meaning: 'conversation' }
    ]
  },
  {
    id: 'k-n4-3',
    character: '社',
    level: 'N4',
    meanings: ['company', 'office', 'association', 'shrine'],
    onyomi: ['シャ'],
    kunyomi: ['やしろ'],
    strokes: 7,
    examples: [
      { word: '社会', reading: 'しゃかい', meaning: 'society' },
      { word: '神社', reading: 'じんじゃ', meaning: 'shrine' },
      { word: '社長', reading: 'しゃちょう', meaning: 'company president' }
    ]
  },
  {
    id: 'k-n4-4',
    character: '空',
    level: 'N4',
    meanings: ['sky', 'empty', 'vacuum', 'void'],
    onyomi: ['クウ'],
    kunyomi: ['そら', 'あ-く', 'から'],
    strokes: 8,
    examples: [
      { word: '空', reading: 'そら', meaning: 'sky' },
      { word: '空気', reading: 'くうき', meaning: 'air' },
      { word: '空手', reading: 'からて', meaning: 'karate' }
    ]
  },
  {
    id: 'k-n4-5',
    character: '手',
    level: 'N4',
    meanings: ['hand'],
    onyomi: ['シュ', 'ズ'],
    kunyomi: ['て', 'た-'],
    strokes: 4,
    examples: [
      { word: '手', reading: 'て', meaning: 'hand' },
      { word: '歌手', reading: 'かしゅ', meaning: 'singer' },
      { word: '上手', reading: 'じょうず', meaning: 'skilled' }
    ]
  },

  // N3
  {
    id: 'k-n3-1',
    character: '心',
    level: 'N3',
    meanings: ['heart', 'mind', 'spirit'],
    onyomi: ['シン'],
    kunyomi: ['こころ'],
    strokes: 4,
    examples: [
      { word: '心', reading: 'こころ', meaning: 'heart/mind' },
      { word: '心配', reading: 'しんぱい', meaning: 'worry/anxiety' },
      { word: '心理学', reading: 'しんりがく', meaning: 'psychology' }
    ]
  },
  {
    id: 'k-n3-2',
    character: '指',
    level: 'N3',
    meanings: ['finger', 'point to', 'indicate'],
    onyomi: ['シ'],
    kunyomi: ['ゆび', 'さ-す'],
    strokes: 9,
    examples: [
      { word: '指', reading: 'ゆび', meaning: 'finger' },
      { word: '指す', reading: 'さす', meaning: 'to point/indicate' },
      { word: '指定', reading: 'してい', meaning: 'designation/appointment' }
    ]
  },
  {
    id: 'k-n3-3',
    character: '政',
    level: 'N3',
    meanings: ['politics', 'government'],
    onyomi: ['セイ', 'ショウ'],
    kunyomi: ['まつりごと'],
    strokes: 9,
    examples: [
      { word: '政治', reading: 'せいじ', meaning: 'politics' },
      { word: '政府', reading: 'せいふ', meaning: 'government' },
      { word: '政党', reading: 'せいとう', meaning: 'political party' }
    ]
  },
  {
    id: 'k-n3-4',
    character: '治',
    level: 'N3',
    meanings: ['govern', 'cure', 'heal'],
    onyomi: ['ジ', 'チ'],
    kunyomi: ['おさ-める', 'なお-る'],
    strokes: 8,
    examples: [
      { word: '治療', reading: 'ちりょう', meaning: 'medical treatment' },
      { word: '治る', reading: 'なおる', meaning: 'to be cured' },
      { word: '自治', reading: 'じち', meaning: 'self-government' }
    ]
  },
  {
    id: 'k-n3-5',
    character: '願',
    level: 'N3',
    meanings: ['petition', 'request', 'wish', 'desire'],
    onyomi: ['ガン'],
    kunyomi: ['ねが-う'],
    strokes: 19,
    examples: [
      { word: '願う', reading: 'ねがう', meaning: 'to wish/pray' },
      { word: 'お願い', reading: 'おねがい', meaning: 'request/please' },
      { word: '願書', reading: 'がんしょ', meaning: 'written application' }
    ]
  },

  // N2
  {
    id: 'k-n2-1',
    character: '警',
    level: 'N2',
    meanings: ['admonish', 'command', 'warn'],
    onyomi: ['ケイ'],
    kunyomi: [],
    strokes: 19,
    examples: [
      { word: '警察', reading: 'けいさつ', meaning: 'police' },
      { word: '警告', reading: 'けいこく', meaning: 'warning' },
      { word: '警備', reading: 'けいび', meaning: 'security/defense' }
    ]
  },
  {
    id: 'k-n2-2',
    character: '察',
    level: 'N2',
    meanings: ['guess', 'presume', 'surmise', 'judge'],
    onyomi: ['サツ'],
    kunyomi: [],
    strokes: 14,
    examples: [
      { word: '観察', reading: 'かんさつ', meaning: 'observation' },
      { word: '診察', reading: 'しんさつ', meaning: 'medical examination' },
      { word: '考察', reading: 'こうさつ', meaning: 'study/consideration' }
    ]
  },
  {
    id: 'k-n2-3',
    character: '震',
    level: 'N2',
    meanings: ['quake', 'shake', 'tremble'],
    onyomi: ['シン'],
    kunyomi: ['ふる-う', 'ふる-える'],
    strokes: 15,
    examples: [
      { word: '地震', reading: 'じしん', meaning: 'earthquake' },
      { word: '震える', reading: 'ふるえる', meaning: 'to shiver/shake' },
      { word: '震度', reading: 'しんど', meaning: 'seismic intensity' }
    ]
  },
  {
    id: 'k-n2-4',
    character: '募',
    level: 'N2',
    meanings: ['recruit', 'campaign', 'gather contributions'],
    onyomi: ['ボ'],
    kunyomi: ['つの-る'],
    strokes: 12,
    examples: [
      { word: '募集', reading: 'ぼしゅう', meaning: 'recruitment' },
      { word: '募金', reading: 'ぼきん', meaning: 'fundraising' },
      { word: '応募', reading: 'おうぼ', meaning: 'application' }
    ]
  },
  {
    id: 'k-n2-5',
    character: '雑',
    level: 'N2',
    meanings: ['miscellaneous', 'mixed', 'rough'],
    onyomi: ['ザツ', 'ゾウ'],
    kunyomi: [],
    strokes: 14,
    examples: [
      { word: '雑誌', reading: 'ざっし', meaning: 'magazine' },
      { word: '複雑', reading: 'ふくざつ', meaning: 'complex' },
      { word: '雑談', reading: 'ざつだん', meaning: 'chitchat' }
    ]
  },

  // N1
  {
    id: 'k-n1-1',
    character: '護',
    level: 'N1',
    meanings: ['safeguard', 'protect'],
    onyomi: ['ゴ'],
    kunyomi: ['まも-る'],
    strokes: 20,
    examples: [
      { word: '看護師', reading: 'かんごし', meaning: 'nurse' },
      { word: '保護', reading: 'ほご', meaning: 'protection/preservation' },
      { word: '弁護士', reading: 'べんごし', meaning: 'lawyer' }
    ]
  },
  {
    id: 'k-n1-2',
    character: '躍',
    level: 'N1',
    meanings: ['leap', 'dance', 'skip'],
    onyomi: ['ヤク'],
    kunyomi: ['おど-る'],
    strokes: 21,
    examples: [
      { word: '活躍', reading: 'かつやく', meaning: 'active participation/activity' },
      { word: '飛躍', reading: 'ひやく', meaning: 'rapid progress/leap' },
      { word: '躍進', reading: 'やくしん', meaning: 'breakthrough' }
    ]
  },
  {
    id: 'k-n1-3',
    character: '襲',
    level: 'N1',
    meanings: ['attack', 'assault', 'succeed (to a name)'],
    onyomi: ['シュウ'],
    kunyomi: ['おそ-う'],
    strokes: 22,
    examples: [
      { word: '襲う', reading: 'おそう', meaning: 'to attack' },
      { word: '襲撃', reading: 'しゅうげき', meaning: 'assault/raid' },
      { word: '世襲', reading: 'せしゅう', meaning: 'hereditary transmission' }
    ]
  },
  {
    id: 'k-n1-4',
    character: '懇',
    level: 'N1',
    meanings: ['sociable', 'kind', 'courteous', 'earnest'],
    onyomi: ['コン'],
    kunyomi: ['ねんご-る'],
    strokes: 17,
    examples: [
      { word: '懇談', reading: 'こんだん', meaning: 'informal talk/discussion' },
      { word: '懇親会', reading: 'こんしんかい', meaning: 'social gathering' },
      { word: '懇願', reading: 'こんがん', meaning: 'earnest petition' }
    ]
  },
  {
    id: 'k-n1-5',
    character: '擁',
    level: 'N1',
    meanings: ['hug', 'protect', 'support', 'lead'],
    onyomi: ['ヨウ'],
    kunyomi: [],
    strokes: 16,
    examples: [
      { word: '擁護', reading: 'ようご', meaning: 'advocacy/defense' },
      { word: '擁立', reading: 'ようりつ', meaning: 'supporting/backing a candidate' },
      { word: '抱擁', reading: 'ほうよう', meaning: 'embrace/hug' }
    ]
  }
];
