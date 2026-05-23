export interface GrammarEntry {
  id: string;
  pattern: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  meaning: string;
  explanation: string;
  structure: string;
  examples: {
    sentence: string;
    reading: string;
    translation: string;
  }[];
}

export const grammarData: GrammarEntry[] = [
  // ================= N5 =================
  {
    id: 'g-n5-1',
    pattern: '～は～です',
    level: 'N5',
    meaning: 'X is Y',
    explanation: 'The basic sentence structure in Japanese, where "は" is the topic marker and "です" is the polite copula (to be).',
    structure: '[Noun A] は [Noun B] です',
    examples: [
      { sentence: '私は学生です。', reading: 'わたしはがくせいです。', translation: 'I am a student.' },
      { sentence: 'これは本です。', reading: 'これはほんです。', translation: 'This is a book.' }
    ]
  },
  {
    id: 'g-n5-2',
    pattern: '～てください',
    level: 'N5',
    meaning: 'Please do...',
    explanation: 'Used to politely ask or instruct someone to do something. Formed by conjugating a verb to its -te form and adding ください.',
    structure: '[Verb in te-form] てください',
    examples: [
      { sentence: 'ここに名前を書いてください。', reading: 'ここになまえをかいてください。', translation: 'Please write your name here.' },
      { sentence: '日本語で話してください。', reading: 'にほんごではなしてください。', translation: 'Please speak in Japanese.' }
    ]
  },
  {
    id: 'g-n5-3',
    pattern: '～があります / ～がいます',
    level: 'N5',
    meaning: 'There is / I have...',
    explanation: 'Used to state the existence of something. あります is used for non-living things (objects, plants), while います is used for living things (people, animals).',
    structure: '[Noun] が あります/います',
    examples: [
      { sentence: '机の上に本があります。', reading: 'つくえのうえにほんがあります。', translation: 'There is a book on the desk.' },
      { sentence: '庭に猫がいます。', reading: 'にわにねこがいます。', translation: 'There is a cat in the garden.' }
    ]
  },
  {
    id: 'g-n5-4',
    pattern: '～から～まで',
    level: 'N5',
    meaning: 'From... to...',
    explanation: 'Used to indicate the starting point (から) and ending point (まで) of time or space.',
    structure: '[Time/Place A] から [Time/Place B] まで',
    examples: [
      { sentence: '会議は９時から５時までです。', reading: 'かいぎはくじからごじまでです。', translation: 'The meeting is from 9 to 5.' },
      { sentence: '駅から学校まで歩きます。', reading: 'えきからがっこうまであるきます。', translation: 'I will walk from the station to the school.' }
    ]
  },
  {
    id: 'g-n5-5',
    pattern: '～と',
    level: 'N5',
    meaning: 'And / With',
    explanation: 'Connects nouns together to mean "and" or indicates the person/entity you perform an action with ("with").',
    structure: '[Noun A] と [Noun B]',
    examples: [
      { sentence: '机の上にペンとノートがあります。', reading: 'つくえのうえにペンとノートがあります。', translation: 'There are pens and notebooks on the desk.' },
      { sentence: '友達と映画を見ました。', reading: 'ともだちとえいがをみました。', translation: 'I watched a movie with my friend.' }
    ]
  },
  {
    id: 'g-n5-6',
    pattern: '～ね / ～よ',
    level: 'N5',
    meaning: 'Right? (ね) / You know! (よ)',
    explanation: 'Sentence-ending particles. ね seeks confirmation or agreement from the listener. よ is used to provide new information or show strong conviction.',
    structure: '[Sentence] ね / よ',
    examples: [
      { sentence: '今日はいい天気ですね。', reading: 'きょうはいいてんきですね。', translation: 'It is nice weather today, isn\'t it?' },
      { sentence: 'この寿司は美味しいですよ！', reading: 'このすしはおいしいですよ！', translation: 'This sushi is delicious, you know!' }
    ]
  },
  {
    id: 'g-n5-7',
    pattern: '～ています',
    level: 'N5',
    meaning: 'Action in progress / State',
    explanation: 'Indicates that an action is currently in progress, or represents a state resulting from a past action.',
    structure: '[Verb in te-form] ています',
    examples: [
      { sentence: '私は今、日本語を勉強しています。', reading: 'わたしはいま、にほんごをべんきょうしています。', translation: 'I am studying Japanese right now.' },
      { sentence: '鈴木さんは東京に住んでいます。', reading: 'すずきさんはとうきょうにすんでいます。', translation: 'Mr. Suzuki lives in Tokyo.' }
    ]
  },
  {
    id: 'g-n5-8',
    pattern: '～ましょう / ～ましょうか',
    level: 'N5',
    meaning: 'Let\'s do / Shall we do...?',
    explanation: 'Used to propose an action (let\'s...) or to offer help/suggest an activity politely.',
    structure: '[Verb stem] ましょう / ましょうか',
    examples: [
      { sentence: '一緒にご飯を食べましょう！', reading: 'いっしょにごはんをたべましょう！', translation: 'Let\'s eat a meal together!' },
      { sentence: '窓を開けましょうか？', reading: 'まどをあけましょうか？', translation: 'Shall I open the window?' }
    ]
  },
  {
    id: 'g-n5-9',
    pattern: '～たいです',
    level: 'N5',
    meaning: 'Want to do...',
    explanation: 'Expresses the speaker\'s desire to do an action. Formed by replacing ます with たいです.',
    structure: '[Verb stem] たいです',
    examples: [
      { sentence: '日本に行きたいです。', reading: 'にほんへいきたいです。', translation: 'I want to go to Japan.' },
      { sentence: '新しい本が買いたいです。', reading: 'あたらしいほんがかいたいです。', translation: 'I want to buy a new book.' }
    ]
  },
  {
    id: 'g-n5-10',
    pattern: '～ないでください',
    level: 'N5',
    meaning: 'Please do not...',
    explanation: 'Used to request politely that someone does not perform an action. Formed by adding でください to the negative form (nai-form).',
    structure: '[Verb in nai-form] でください',
    examples: [
      { sentence: 'ここに車を止めないでください。', reading: 'ここにくるまをとめないでください。', translation: 'Please do not park your car here.' },
      { sentence: '心配しないでください。', reading: 'しんぱいしないでください。', translation: 'Please do not worry.' }
    ]
  },
  {
    id: 'g-n5-11',
    pattern: '～がほしいです',
    level: 'N5',
    meaning: 'Want (something)',
    explanation: 'Expresses a desire to possess an object (noun). Cannot be used for actions.',
    structure: '[Noun] が 欲しいです',
    examples: [
      { sentence: '新しいパソコンが欲しいです。', reading: 'あたらしいパソコンがほしいです。', translation: 'I want a new computer.' },
      { sentence: '時間が欲しいです。', reading: 'じかんがほしいです。', translation: 'I want time.' }
    ]
  },
  {
    id: 'g-n5-12',
    pattern: '～てもいいです',
    level: 'N5',
    meaning: 'May do / Allowed to',
    explanation: 'Used to grant permission or to ask if an action is allowed.',
    structure: '[Verb in te-form] もいいです',
    examples: [
      { sentence: '写真を撮ってもいいですか？', reading: 'しゃしんをとってもいいですか？', translation: 'May I take a photo?' },
      { sentence: 'ここで座ってもいいですよ。', reading: 'ここですわってもいいですよ。', translation: 'You may sit here.' }
    ]
  },
  {
    id: 'g-n5-13',
    pattern: '～てはいけません',
    level: 'N5',
    meaning: 'Must not do / Prohibited',
    explanation: 'Used to state that an action is prohibited or not allowed.',
    structure: '[Verb in te-form] はいけません',
    examples: [
      { sentence: '教室に入ってはいけません。', reading: 'きょうしつにはいってはいけません。', translation: 'You must not enter the classroom.' },
      { sentence: 'ここでタバコを吸ってはいけません。', reading: 'ここでタバコをすってはいけません。', translation: 'You must not smoke here.' }
    ]
  },
  {
    id: 'g-n5-14',
    pattern: '～より～ほうが～',
    level: 'N5',
    meaning: 'A is more... than B',
    explanation: 'Used to compare two things, stating that one has more of a quality than the other.',
    structure: '[Noun A] より [Noun B] のほうが [Adj] です',
    examples: [
      { sentence: 'ひらがなより漢字のほうが難しいです。', reading: 'ひらがなよりかんじのほうがむずかしいです。', translation: 'Kanji is more difficult than Hiragana.' },
      { sentence: '犬より猫のほうが好きです。', reading: 'いぬよりねこのほうがすきです。', translation: 'I like cats more than dogs.' }
    ]
  },
  {
    id: 'g-n5-15',
    pattern: '～つもりです',
    level: 'N5',
    meaning: 'Plan to / Intend to',
    explanation: 'Used to express a plan or intention to perform (or not perform) an action in the future.',
    structure: '[Verb dict-form / Verb nai-form] つもりです',
    examples: [
      { sentence: '週末に映画を見るつもりです。', reading: 'しゅうまつにえいがをみるつもりです。', translation: 'I plan to watch a movie this weekend.' },
      { sentence: '明日は学校へ行かないつもりです。', reading: 'あしたはがっこうへいかないつもりです。', translation: 'I intend not to go to school tomorrow.' }
    ]
  },

  // ================= N4 =================
  {
    id: 'g-n4-1',
    pattern: '～たことがある',
    level: 'N4',
    meaning: 'Have done before (experience)',
    explanation: 'Used to talk about past experiences. Formed using the past tense (ta-form) of a verb followed by ことがある.',
    structure: '[Verb in ta-form] ことがある',
    examples: [
      { sentence: '私は富士山に登ったことがあります。', reading: 'わたしはふじさんにのぼったことがあります。', translation: 'I have climbed Mount Fuji before.' },
      { sentence: '日本食を食べたことがありますか？', reading: 'にほんしょくをたべたことがありますか？', translation: 'Have you ever eaten Japanese food?' }
    ]
  },
  {
    id: 'g-n4-2',
    pattern: '～てみる',
    level: 'N4',
    meaning: 'To try doing something',
    explanation: 'Expresses the action of trying something out to see what it is like or what the result will be.',
    structure: '[Verb in te-form] みる',
    examples: [
      { sentence: '日本語で日記を書いてみます。', reading: 'にほんごでにっきをかいてみます。', translation: 'I will try writing a diary in Japanese.' },
      { sentence: 'この料理は美味しいので、食べてみてください。', reading: 'このりょうりはおいしいので、たべてみてください。', translation: 'This dish is delicious, so please try eating it.' }
    ]
  },
  {
    id: 'g-n4-3',
    pattern: '～すぎる',
    level: 'N4',
    meaning: 'Too much / Excessively',
    explanation: 'Indicates that an action or state goes beyond normal limits, expressing that it is excessive or problematic.',
    structure: '[Verb stem] / [i-Adj (drop い)] / [na-Adj (drop な)] + すぎる',
    examples: [
      { sentence: '昨日、お酒を飲みすぎました。', reading: 'きのう、おさけをのみすぎました。', translation: 'I drank too much alcohol yesterday.' },
      { sentence: 'このカバンは高すぎます。', reading: 'このカバンはたかすぎます。', translation: 'This bag is too expensive.' }
    ]
  },
  {
    id: 'g-n4-4',
    pattern: '～やすい / ～にくい',
    level: 'N4',
    meaning: 'Easy to do / Hard to do',
    explanation: 'Attached to a verb stem to describe how easy or difficult it is to perform that action.',
    structure: '[Verb stem] + やすい / にくい',
    examples: [
      { sentence: 'このペンは書きやすいですね。', reading: 'このペンはかきやすいですね', translation: 'This pen is easy to write with.' },
      { sentence: '漢字は覚えにくいです。', reading: 'かんじはおぼえにくいです。', translation: 'Kanji are difficult to memorize.' }
    ]
  },
  {
    id: 'g-n4-5',
    pattern: '～つもりだ',
    level: 'N4',
    meaning: 'Plan to / Intend to',
    explanation: 'Used to express a conscious intention or plan to do (or not do) something in the future.',
    structure: '[Verb-dictionary form / Verb-nai form] + つもりだ',
    examples: [
      { sentence: '来年、日本へ留学するつもりです。', reading: 'らいねん、にほんへりゅうがくするつもりです。', translation: 'I plan to study abroad in Japan next year.' },
      { sentence: '今日はどこへも行かないつもりです。', reading: 'きょうはどこへもいかないつもりです。', translation: 'I intend not to go anywhere today.' }
    ]
  },
  {
    id: 'g-n4-6',
    pattern: '～と思う',
    level: 'N4',
    meaning: 'I think that...',
    explanation: 'Used to express opinions, guesses, or intentions in a soft, polite manner.',
    structure: '[Plain Form Clause] と 思う',
    examples: [
      { sentence: '明日は雨が降ると思います。', reading: 'あしたはあめがふるとおもいます。', translation: 'I think it will rain tomorrow.' },
      { sentence: '日本語はとても面白いと思います。', reading: 'にほんごはとてもおもしろいとおもいます。', translation: 'I think Japanese is very interesting.' }
    ]
  },
  {
    id: 'g-n4-7',
    pattern: '～てあげる / ～てもらう / ～てくれる',
    level: 'N4',
    meaning: 'Giving and receiving actions',
    explanation: 'Used to describe actions performed as favors. てあげる: do for someone. てもらう: have someone do for you. てくれる: someone does for you.',
    structure: '[Verb in te-form] + あげる / もらう / くれる',
    examples: [
      { sentence: '友達に本を貸してあげました。', reading: 'ともだちにほんをかしてあげました。', translation: 'I lent a book to my friend.' },
      { sentence: '田中さんが日本語を教えてくれました。', reading: 'たなかさんがにほんごをおしえてくれました。', translation: 'Mr. Tanaka taught me Japanese (as a favor).' }
    ]
  },
  {
    id: 'g-n4-8',
    pattern: '～ながら',
    level: 'N4',
    meaning: 'While doing...',
    explanation: 'Used to express that two actions are performed simultaneously by the same subject.',
    structure: '[Verb stem] + ながら [Main Verb]',
    examples: [
      { sentence: '音楽を聞きながら勉強します。', reading: 'おんがくをききながらべんきょうします。', translation: 'I study while listening to music.' },
      { sentence: '歩きながら携帯電話を使わないでください。', reading: 'あるきながらけいたいでんわをつかわないでください。', translation: 'Please do not use your mobile phone while walking.' }
    ]
  },
  {
    id: 'g-n4-9',
    pattern: '～ために',
    level: 'N4',
    meaning: 'For / In order to',
    explanation: 'Expresses purpose, intention, or reason. "In order to do something" or "for the sake of someone/something".',
    structure: '[Verb dict-form / Noun + の] + ために',
    examples: [
      { sentence: '家を買うために貯金しています。', reading: 'いえをかうためにちょきんしています。', translation: 'I am saving money in order to buy a house.' },
      { sentence: '健康のために毎日走っています。', reading: 'けんこうのためにまいにちはしっています。', translation: 'I run every day for my health.' }
    ]
  },
  {
    id: 'g-n4-10',
    pattern: '～はずだ',
    level: 'N4',
    meaning: 'Expected to / Should be',
    explanation: 'Expresses a strong belief or expectation based on logical reasons or objective facts.',
    structure: '[Verb dict-form / Adj / Noun + の] + はずだ',
    examples: [
      { sentence: '彼は今日来るはずです。', reading: 'かれはきょうくるはずです。', translation: 'He should be coming today (I expect him to).' },
      { sentence: 'この本は面白いはずです。', reading: 'このほんはおもしろいはずです。', translation: 'This book should be interesting (based on reviews/facts).' }
    ]
  },
  {
    id: 'g-n4-11',
    pattern: '～かもしれない',
    level: 'N4',
    meaning: 'Might / May / Perhaps',
    explanation: 'Expresses conjecture or possibility (around 50% chance) that something is true, without strong certainty.',
    structure: '[Plain Form Clause] + かもしれない',
    examples: [
      { sentence: '明日は雨が降るかもしれません。', reading: 'あしたはあめがふるかもしれません。', translation: 'It might rain tomorrow.' },
      { sentence: '彼はもう帰ったかもしれません。', reading: 'かれはもうかえったかもしれません。', translation: 'He might have gone home already.' }
    ]
  },
  {
    id: 'g-n4-12',
    pattern: '～たら',
    level: 'N4',
    meaning: 'If / When (conditional)',
    explanation: 'A general conditional particle used to express a condition ("if X happens") or a chronological sequence ("when X happens, Y will follow").',
    structure: '[Verb past-form + ら] / [Adj past-form + ら]',
    examples: [
      { sentence: '安かったら、パソコンを買います。', reading: 'やすかったら、パソコンをかいます。', translation: 'If it is cheap, I will buy a computer.' },
      { sentence: '駅に着いたら、電話してください。', reading: 'えきについたら、でんわしてください。', translation: 'When you arrive at the station, please call me.' }
    ]
  },
  {
    id: 'g-n4-13',
    pattern: '～ば',
    level: 'N4',
    meaning: 'If (conditional form)',
    explanation: 'Used to express a logical conditional relationship ("If X, then Y will definitely happen").',
    structure: '[Verb in ba-form] / [i-Adj drop い + ければ]',
    examples: [
      { sentence: '勉強すれば、試験に合格します。', reading: 'べんきょうすれば、しけんにごうかくします。', translation: 'If you study, you will pass the exam.' },
      { sentence: '良ければ、一緒に来てください。', reading: 'よければ、いっしょにきてください。', translation: 'If it is good (if you like), please come with me.' }
    ]
  },
  {
    id: 'g-n4-14',
    pattern: '～し、～し',
    level: 'N4',
    meaning: 'And what\'s more / Not only... but also',
    explanation: 'Used to list multiple reasons, qualities, or actions in a parallel structure.',
    structure: '[Plain clause A] し、[Plain clause B] し',
    examples: [
      { sentence: 'この部屋は広いし、綺麗です。', reading: 'このへやはひろいし、きれいですね。', translation: 'This room is spacious, and what\'s more, it\'s clean.' },
      { sentence: '雨も降っているし、風も強いし、出かけたくない。', reading: 'あめもふっているし、かぜもつよいし、でかけたくない。', translation: 'It is raining, the wind is strong, and I don\'t want to go out.' }
    ]
  },
  {
    id: 'g-n4-15',
    pattern: '～ようになる',
    level: 'N4',
    meaning: 'Come to be / Start to do',
    explanation: 'Indicates a change in state or ability over time, transitioning from not doing/being able to doing/being able.',
    structure: '[Verb in dict-form / Verb in potential-form] ようになる',
    examples: [
      { sentence: '日本語が話せるようになりました。', reading: 'にほんごがはなせるようになりました。', translation: 'I have become able to speak Japanese.' },
      { sentence: '毎日走るようになりました。', reading: 'まいにちはしるようになりました。', translation: 'I have started running every day.' }
    ]
  },

  // ================= N3 =================
  {
    id: 'g-n3-1',
    pattern: '～わけがない',
    level: 'N3',
    meaning: 'There is no way that... / Impossible',
    explanation: 'Strongly denies a possibility, expressing absolute confidence that something is impossible or untrue.',
    structure: '[Verb / Adjective / Noun] + わけがない (Noun needs な/である, na-adj needs な/である)',
    examples: [
      { sentence: '彼が嘘をつくわけがない。', reading: 'かれがうそをつくわけがない。', translation: 'There is no way he would tell a lie.' },
      { sentence: 'こんな難しい問題、私にできるわけがない。', reading: 'こんなむずかしいもんだい、わたしにできるわけがない。', translation: 'There is no way I can solve such a difficult problem.' }
    ]
  },
  {
    id: 'g-n3-2',
    pattern: '～っけ',
    level: 'N3',
    meaning: '...again? (seeking confirmation)',
    explanation: 'A casual ending particle used when you are trying to remember or confirm something you forgot. Used in conversational speech.',
    structure: '[Verb-past/Adj-past/Noun + だ] + っけ',
    examples: [
      { sentence: '彼の名前は何だっけ？', reading: 'かれのなまえはなんだっけ？', translation: 'What was his name again?' },
      { sentence: '今日の会議、３時からだっけ？', reading: 'きょうのかいぎ、さんじからだっけ？', translation: 'Is today\'s meeting from 3 o\'clock, again?' }
    ]
  },
  {
    id: 'g-n3-3',
    pattern: '～ばかり',
    level: 'N3',
    meaning: 'Nothing but / Constantly doing',
    explanation: 'Expresses that someone does nothing else except one particular action or that there are only specific objects present, carrying a slightly critical tone.',
    structure: '[Noun] ばかり / [Verb-te form] ばかりいる',
    examples: [
      { sentence: '弟はゲームばかりしている。', reading: 'おとうとはゲームばかりしている。', translation: 'My younger brother does nothing but play games.' },
      { sentence: '油っこいものばかり食べていると太るよ。', reading: 'あぶらっこいものばかりたべているとふとるよ。', translation: 'If you eat nothing but oily food, you will gain weight.' }
    ]
  },
  {
    id: 'g-n3-4',
    pattern: '～ようとする',
    level: 'N3',
    meaning: 'Be about to / Attempt to',
    explanation: 'Used to describe a situation where someone is right on the verge of performing an action or is actively making an attempt to do so.',
    structure: '[Verb volitional form] とする',
    examples: [
      { sentence: '出かけようとした時、電話が鳴った。', reading: 'でかけようとしたとき、でんわがなった。', translation: 'Just as I was about to go out, the phone rang.' },
      { sentence: '猫が窓から飛び出そうとしている。', reading: 'ねこがまどからとびだそうとしている。', translation: 'The cat is attempting to jump out of the window.' }
    ]
  },
  {
    id: 'g-n3-5',
    pattern: '～と言われている',
    level: 'N3',
    meaning: 'It is said that...',
    explanation: 'Expresses a general consensus, common belief, or reputation shared by society, rather than a specific individual\'s statement.',
    structure: '[Plain Form Clause] と言われている',
    examples: [
      { sentence: '納豆は体にいいと言われている。', reading: 'なっとうはからだにいいといわれている。', translation: 'It is said that natto is good for your health.' },
      { sentence: '今年は暑い夏になると言われている。', reading: 'ことしはあついなつになるといわれている。', translation: 'They say this year will have a hot summer.' }
    ]
  },
  {
    id: 'g-n3-6',
    pattern: '～として',
    level: 'N3',
    meaning: 'As... / In the role of...',
    explanation: 'Indicates the capacity, role, status, or category under which someone or something is acting.',
    structure: '[Noun] として',
    examples: [
      { sentence: '彼は留学生として日本へ来ました。', reading: 'かれはりゅうがくせいとしてにほんへきました。', translation: 'He came to Japan as an international student.' },
      { sentence: '趣味として日本語を勉強しています。', reading: 'しゅみとしてにほんごをべんきょうしています。', translation: 'I am studying Japanese as a hobby.' }
    ]
  },
  {
    id: 'g-n3-7',
    pattern: '～おかげで / ～せいで',
    level: 'N3',
    meaning: 'Thanks to (おかげで) / Because of (せいで)',
    explanation: 'おかげで indicates a positive cause/result (thanks to). せいで indicates a negative cause/result (due to / blame).',
    structure: '[Verb/Adj/Noun] + おかげで / せいで',
    examples: [
      { sentence: '先生のおかげで試験に合格しました。', reading: 'せんせいのおかげでしけんにごうかくしました。', translation: 'Thanks to the teacher, I passed the exam.' },
      { sentence: '雨のせいで運動会が中止になりました。', reading: 'あめのせいでうんどうかいがちゅうしになりました。', translation: 'Because of the rain, the sports day was cancelled.' }
    ]
  },
  {
    id: 'g-n3-8',
    pattern: '～わりに（は）',
    level: 'N3',
    meaning: 'Considering / Relatively / In spite of',
    explanation: 'Used when the actual outcome is different from what one would logically expect based on a certain standard.',
    structure: '[Verb/Adj/Noun] + わりに (Noun needs の)',
    examples: [
      { sentence: '彼はたくさん食べるわりに太らない。', reading: 'かれはたくさんたべるわりにふとらない。', translation: 'Considering how much he eats, he doesn\'t gain weight.' },
      { sentence: 'この店は値段のわりに美味しいです。', reading: 'このみせはねだんのわりにおいしいです。', translation: 'This restaurant serves delicious food in spite of its cheap prices.' }
    ]
  },
  {
    id: 'g-n3-9',
    pattern: '～たとたん',
    level: 'N3',
    meaning: 'Just as / The moment that...',
    explanation: 'Indicates that a sudden, unexpected action or event occurred immediately after another action was completed.',
    structure: '[Verb in ta-form] + とたん',
    examples: [
      { sentence: '家に帰ったとたん、雨が激しく降り出した。', reading: 'いえにかえったとたん、あめがはげしくふりだした。', translation: 'The moment I got home, it started raining heavily.' },
      { sentence: 'お酒を飲んだとたん、顔が赤くなった。', reading: 'おさけをのんだとたん、かおがあかくなった。', translation: 'Just as I drank alcohol, my face turned red.' }
    ]
  },
  {
    id: 'g-n3-10',
    pattern: '～うちに',
    level: 'N3',
    meaning: 'While / Before (a change occurs)',
    explanation: 'Indicates doing an action during a limited time frame, before the state changes and it becomes impossible or difficult.',
    structure: '[Verb dict-form / Verb te-form / Noun + の] + うちに',
    examples: [
      { sentence: '明るいうちに帰りましょう。', reading: 'あかるいうちにかえりましょう。', translation: 'Let\'s go home while it is still light out.' },
      { sentence: '忘れないうちにメモをしておきます。', reading: 'わすれないうちにメモをしておきます。', translation: 'I will write a memo before I forget.' }
    ]
  },
  {
    id: 'g-n3-11',
    pattern: '～たびに',
    level: 'N3',
    meaning: 'Every time / Whenever',
    explanation: 'Expresses that whenever a certain action takes place, another event or feeling always accompanies it.',
    structure: '[Verb dict-form / Noun + の] + たびに',
    examples: [
      { sentence: 'この写真を見るたびに、子供の頃を思い出します。', reading: 'このしゃしんをみるたびに、こどものころをおもいだします。', translation: 'Every time I look at this photo, I remember my childhood.' },
      { sentence: '旅行のたびに、お土産を買います。', reading: 'りょこうのたびに、おみやげをかいます。', translation: 'Whenever I travel, I buy souvenirs.' }
    ]
  },
  {
    id: 'g-n3-12',
    pattern: '～おそれがある',
    level: 'N3',
    meaning: 'Fear of / Risk of / Danger that',
    explanation: 'Used to express a concern or warning that a negative or undesirable event might happen in the future.',
    structure: '[Verb dict-form / Noun + の] + おそれがある',
    examples: [
      { sentence: '台風が上陸するおそれがあります。', reading: 'たいふうがじょうりくするおそれがあります。', translation: 'There is a danger that the typhoon will make landfall.' },
      { sentence: 'このままでは、赤字になるおそれがある。', reading: 'このままでは、あかじになるおそれがある。', translation: 'At this rate, there is a risk that we will go into the red.' }
    ]
  },
  {
    id: 'g-n3-13',
    pattern: '～がちだ',
    level: 'N3',
    meaning: 'Tend to do / Apt to / Frequently',
    explanation: 'Indicates a tendency to drift into a certain negative state, or to perform an undesirable action frequently.',
    structure: '[Verb stem / Noun] + がちだ',
    examples: [
      { sentence: '最近、彼女は学校を休みがちです。', reading: 'さいきん、かのじょはがっこうをやすみがちです。', translation: 'Lately, she has a tendency to miss school.' },
      { sentence: '一人暮らしは野菜が不足しがちになります。', reading: 'ひとりぐらしはやさいがふそくしがちになります。', translation: 'People living alone tend to be insufficient in vegetables.' }
    ]
  },
  {
    id: 'g-n3-14',
    pattern: '～にかかわらず',
    level: 'N3',
    meaning: 'Regardless of / No matter...',
    explanation: 'Expresses that something holds true irrespective of the factor, condition, or noun presented.',
    structure: '[Noun / Verb dictionary-form & negative-form] + にかかわらず',
    examples: [
      { sentence: '天候にかかわらず、イベントは行われます。', reading: 'てんこうにかかわらず、イベントはおこなわれます。', translation: 'Regardless of the weather, the event will take place.' },
      { sentence: '参加するしないにかかわらず、連絡をください。', reading: 'さんかするしないにかかわらず、れんらくをください。', translation: 'Whether you participate or not, please contact me.' }
    ]
  },
  {
    id: 'g-n3-15',
    pattern: '～に比べて',
    level: 'N3',
    meaning: 'Compared to...',
    explanation: 'Used to draw a direct comparison between two entities, stating differences in their properties.',
    structure: '[Noun] + に比べて',
    examples: [
      { sentence: '去年に入比べて、今年は少し暖かいです。', reading: 'きょねんにくらべて、ことしはすこしあたたかいです。', translation: 'Compared to last year, this year is slightly warmer.' },
      { sentence: '東京は他の都市に比べて物価が高い。', reading: 'とうきょうはほかのとしにくらべてぶっかがたかい。', translation: 'Compared to other cities, Tokyo has high prices.' }
    ]
  },

  // ================= N2 =================
  {
    id: 'g-n2-1',
    pattern: '～わけにはいかない',
    level: 'N2',
    meaning: 'Cannot afford to do / Must not do',
    explanation: 'Expresses that one cannot do something due to social, moral, or situational circumstances, even if they want to.',
    structure: '[Verb-dictionary form] わけにはいかない',
    examples: [
      { sentence: '明日は大事な試験があるので、休むわけにはいかない。', reading: 'あしたはだいじなしけんがあるので、やすむわけにはいかない。', translation: 'Since there is an important exam tomorrow, I cannot afford to miss it.' },
      { sentence: '車の運転があるので、お酒を飲むわけにはいかない。', reading: 'くるまのうんてんがあるので、おさけをのむわけにはいかない。', translation: 'Since I am driving, I cannot drink alcohol.' }
    ]
  },
  {
    id: 'g-n2-2',
    pattern: '～に際して / ～に際し',
    level: 'N2',
    meaning: 'On the occasion of... / At the time of...',
    explanation: 'Used to indicate a formal or important event or time when doing an action. Often used in official writing or speaking.',
    structure: '[Verb-dictionary form / Noun] に際して',
    examples: [
      { sentence: '留学に際して、多くの手続きが必要です。', reading: 'りゅうがくにさいして、おおくのてつづきがひつようです。', translation: 'On the occasion of studying abroad, many procedures are required.' },
      { sentence: 'お申し込みに際し、注意事項をお読みください。', reading: 'おもうしこみにさいし、ちゅういじこうをおよみください。', translation: 'Upon applying, please read the cautionary notes.' }
    ]
  },
  {
    id: 'g-n2-3',
    pattern: '～つつある',
    level: 'N2',
    meaning: 'In the process of... / -ing',
    explanation: 'Indicates that a gradual, ongoing change is currently taking place. Used in formal writing.',
    structure: '[Verb stem] つつある',
    examples: [
      { sentence: '日本の人口は減少しつつある。', reading: 'にほんのじんこうはげんしょうしつつある。', translation: 'The population of Japan is gradually decreasing.' },
      { sentence: '景気は回復しつつある。', reading: 'けいきはかいふくしつつある。', translation: 'The economy is in the process of recovering.' }
    ]
  },
  {
    id: 'g-n2-4',
    pattern: '～にわたって / ～にわたり',
    level: 'N2',
    meaning: 'Throughout / Across / Over a period of',
    explanation: 'Expresses that a state or action extends across a whole span of time, range, space, or number of occurrences.',
    structure: '[Noun (Time/Space/Range)] にわたって',
    examples: [
      { sentence: '台風の影響で、広い範囲にわたって大雨が降りました。', reading: 'たいふうのえいきょうで、ひろいはんいにわたっておおあめがふりました。', translation: 'Due to the typhoon, heavy rain fell across a wide area.' },
      { sentence: '研究は１０年間にわたって行われました。', reading: 'けんきゅうはじゅうねんかんにわたっておこなわれました。', translation: 'The research was conducted over a span of 10 years.' }
    ]
  },
  {
    id: 'g-n2-5',
    pattern: '～をこめて',
    level: 'N2',
    meaning: 'With (love, care, heart, etc.) / Filled with',
    explanation: 'Indicates that you perform an action with all your feeling, love, or sincerity directed into it.',
    structure: '[Noun (Feelings/Thoughts)] をこめて',
    examples: [
      { sentence: '愛をこめて、このプレゼントを贈ります。', reading: 'あいをこめて、このプレゼントをおくります。', translation: 'I send this present to you filled with love.' },
      { sentence: '感謝の気持ちをこめて手紙を書きました。', reading: 'かんしゃのきもちをこめててがみをかきました。', translation: 'I wrote a letter filled with feelings of gratitude.' }
    ]
  },
  {
    id: 'g-n2-6',
    pattern: '～さえ～ば',
    level: 'N2',
    meaning: 'If only... / As long as...',
    explanation: 'Expresses that as long as one single condition is met, everything else will follow or be okay.',
    structure: '[Noun] さえ [Verb-ba form] / [Verb-stem] さえすれば',
    examples: [
      { sentence: 'お金さえあれば、幸せになれるとは限らない。', reading: 'おかねさえあれば、しあわせになれるとはかぎらない。', translation: 'Having money alone doesn\'t guarantee happiness.' },
      { sentence: '君さえいれば、何もいらない。', reading: 'きみさえいれば、なにもいらない。', translation: 'As long as I have you, I don\'t need anything.' }
    ]
  },
  {
    id: 'g-n2-7',
    pattern: '～つつ',
    level: 'N2',
    meaning: 'While / Although (formal)',
    explanation: 'Connects two actions performed by the same person. Similar to ながら, but often used for opposing behaviors or in formal/literary context.',
    structure: '[Verb stem] + つつ',
    examples: [
      { sentence: '体に悪いと知りつつ、タバコを吸ってしまう。', reading: 'からだにわるいとしりつつ、タバコをすってしまう。', translation: 'Although I know it is bad for my body, I end up smoking.' },
      { sentence: '将来のことを考えつつ、仕事を探しています。', reading: 'しょうらいのことをかんがえつつ、しごとをさがしています。', translation: 'While thinking about the future, I am looking for a job.' }
    ]
  },
  {
    id: 'g-n2-8',
    pattern: '～がたい',
    level: 'N2',
    meaning: 'Hard to / Difficult to do (emotionally)',
    explanation: 'Attached to verb stems. Expresses that doing something is extremely difficult or impossible from a psychological or moral standpoint.',
    structure: '[Verb stem] + がたい',
    examples: [
      { sentence: '彼の行動は理解しがたい。', reading: 'かれのこうどうはりかいしがたい。', translation: 'His behavior is hard to understand.' },
      { sentence: 'それは私にとって忘れがたい思い出です。', reading: 'それはわたしにとってわすれがたいおもいでです。', translation: 'That is an unforgettable memory for me.' }
    ]
  },
  {
    id: 'g-n2-9',
    pattern: '～にともなって / ～にともない',
    level: 'N2',
    meaning: 'Along with / As... / Concurrently with',
    explanation: 'Indicates that as one action or state changes, another change takes place concurrently in proportion or response.',
    structure: '[Noun / Verb dictionary-form] + にともなって',
    examples: [
      { sentence: '台風の接近にともなって、風が強くなってきた。', reading: 'たいふうのせっきんにともなって、かぜがつよくなってきた。', translation: 'As the typhoon approaches, the wind has become stronger.' },
      { sentence: '携帯電話の普及にともない、連絡が便利になった。', reading: 'けいたいでんわのふきゅうにともない、れんらくがべんりになった。', translation: 'Along with the spread of mobile phones, communication has become convenient.' }
    ]
  },
  {
    id: 'g-n2-10',
    pattern: '～かのように',
    level: 'N2',
    meaning: 'As if... / Just like...',
    explanation: 'Used to construct a figurative comparison, describing a behavior or state that mimics something else which is not actually true.',
    structure: '[Plain Form clause] + かのように (Noun/na-adj need である)',
    examples: [
      { sentence: '彼はすべてを知っているかのように話す。', reading: 'かれはすべてをしっているかのようにはなす。', translation: 'He talks as if he knows everything.' },
      { sentence: 'まるで夢であるかのように、彼女は微笑んだ。', reading: 'まるでゆめであるかのように、かのじょはほほえんだ。', translation: 'She smiled just as if it were a dream.' }
    ]
  },
  {
    id: 'g-n2-11',
    pattern: '～からいうと / ～からいえば',
    level: 'N2',
    meaning: 'From the standpoint of / Judging from',
    explanation: 'Used to state an opinion or judgement made specifically from a particular viewpoint or set of evidence.',
    structure: '[Noun] + からいうと',
    examples: [
      { sentence: '実力からいうと、彼が優勝するだろう。', reading: 'じつりょくからいうと、かれがゆうしょうするだろう。', translation: 'Judging from his actual ability, he will probably win.' },
      { sentence: '私の立場からいうと、その提案には賛成できません。', reading: 'わたしのたちばからいうと、そのていあんにはさんせいできません。', translation: 'From my standpoint, I cannot agree with that proposal.' }
    ]
  },
  {
    id: 'g-n2-12',
    pattern: '～のみならず',
    level: 'N2',
    meaning: 'Not only... but also (formal)',
    explanation: 'A formal, written expression indicating that a statement applies not only to the item mentioned, but to others as well.',
    structure: '[Plain Form clause / Noun] + のみならず',
    examples: [
      { sentence: '日本語のみならず、文化も勉強しています。', reading: 'にほんごのみならず、ぶんかもべんきょうしています。', translation: 'I am studying not only the Japanese language, but also the culture.' },
      { sentence: 'この商品は国内のみならず海外でも人気がある。', reading: 'このしょうひんはこくないのみならずかいがいでもにんきがある。', translation: 'This product is popular not only domestically but also overseas.' }
    ]
  },
  {
    id: 'g-n2-13',
    pattern: '～をめぐって / ～をめぐり',
    level: 'N2',
    meaning: 'Concerning / Centered around / Disputing',
    explanation: 'Used when multiple parties argue, discuss, or compete concerning a topic, asset, or opinion.',
    structure: '[Noun] + をめぐって',
    examples: [
      { sentence: '親の遺産をめぐって、兄弟が争っている。', reading: 'おやのいさんをめぐって、きょうだいがあらそっている。', translation: 'The siblings are disputing over their parents\' inheritance.' },
      { sentence: 'その計画をめぐり、様々な意見が出された。', reading: 'そのけいかくをめぐり、さまざまないけんがだされた。', translation: 'Concerning that plan, various opinions were put forward.' }
    ]
  },
  {
    id: 'g-n2-14',
    pattern: '～にしたがって / ～にしたがい',
    level: 'N2',
    meaning: 'In accordance with / As... (gradual change)',
    explanation: 'Indicates that as a primary action or change occurs, a secondary changes follows in proportion to it.',
    structure: '[Noun / Verb dictionary-form] + にしたがって',
    examples: [
      { sentence: 'ルールにしたがって、ゲームを進めてください。', reading: 'ルールにしたがって、ゲームをすすめてください。', translation: 'Please progress the game in accordance with the rules.' },
      { sentence: '山を登るにしたがって、気温が下がります。', reading: 'やまをのぼるにしたがって、きおんがさがります。', translation: 'As you climb the mountain, the temperature falls.' }
    ]
  },
  {
    id: 'g-n2-15',
    pattern: '～を契機に / ～を契機として',
    level: 'N2',
    meaning: 'As a turning point / Opportunity',
    explanation: 'Indicates that a certain event served as a trigger or turning point for a significant change or new development.',
    structure: '[Noun] + を契機に',
    examples: [
      { sentence: '病気を契機に、健康に気を配るようになった。', reading: 'びょうきをけいきに、けんこうにきをくばるようになった。', translation: 'Using my illness as a turning point, I started paying attention to my health.' },
      { sentence: '結婚を契機として、新しい仕事を始めました。', reading: 'けっこんをけいきとして、あたらしいしごとをはじめました。', translation: 'With marriage serving as the opportunity, I started a new job.' }
    ]
  },

  // ================= N1 =================
  {
    id: 'g-n1-1',
    pattern: '～極まりない / ～極まる',
    level: 'N1',
    meaning: 'Extremely... / Knows no bounds',
    explanation: 'Expresses that something is in the absolute extreme state. Often used with negative connotations (e.g. rude, dangerous).',
    structure: '[na-Adjective (no な)] / [i-Adjective + こと] + 極まりない',
    examples: [
      { sentence: '彼の態度は無礼極まりない。', reading: 'かれのたいどはぶれいきわまりない。', translation: 'His attitude is extremely rude (knows no bounds of rudeness).' },
      { sentence: 'そのような行為は危険極まる。', reading: 'そのようなこういはきけんきわまる。', translation: 'Such behavior is extremely dangerous.' }
    ]
  },
  {
    id: 'g-n1-2',
    pattern: '～かたわら',
    level: 'N1',
    meaning: 'While doing... / Aside from...',
    explanation: 'Expresses that while doing one main job/activity, one also does another activity/work. Mostly used for long-term activities (like careers or hobbies).',
    structure: '[Noun + の / Verb-dictionary form] かたわら',
    examples: [
      { sentence: '彼は会社で働くかたわら、小説を書いている。', reading: 'かれはかいしゃではたらくかたわら、しょうせつをかいている。', translation: 'Aside from working at his company, he writes novels.' },
      { sentence: '彼女は大学で教えるかたわら、ボランティア活動を行っている。', reading: 'かのじょはだいがくでおしえるかたわら、ボランティアかつどうをおこなっている。', translation: 'While teaching at the university, she also does volunteer work.' }
    ]
  },
  {
    id: 'g-n1-3',
    pattern: '～と言わんばかりに',
    level: 'N1',
    meaning: 'As if to say / As though wanting to say',
    explanation: 'Describes a subject behaving in a strong manner that clearly shows their thoughts without them actually speaking out loud.',
    structure: '[Verb-nai form (replace ない with ん)] + と言わんばかりに',
    examples: [
      { sentence: '彼は出て行けと言わんばかりに、ドアを指差した。', reading: 'かれはdeていけといわんばかりに、ドアをゆびさした。', translation: 'He pointed to the door as if to say "Get out!"' },
      { sentence: '彼女は興味がないと言わんばかりに、あくびをした。', reading: 'かのじょはきょうみがないといわんばかりに、あくびをした。', translation: 'She yawned as if to say she was not interested.' }
    ]
  },
  {
    id: 'g-n1-4',
    pattern: '～に堪えない',
    level: 'N1',
    meaning: 'Cannot bear to / Extremely / Worthy of',
    explanation: 'Expresses that a situation is too terrible/sad to bear, or that you are filled with an overwhelming emotion (like gratitude, regret) that you cannot contain.',
    structure: '[Verb-dictionary form] に堪えない / [Noun] に堪えない',
    examples: [
      { sentence: '彼のスピーチは聞くに堪えないものだった。', reading: 'かれのスピーチはきくにたえないものだった。', translation: 'His speech was unbearable to listen to.' },
      { sentence: '皆様の親切に感謝に堪えません。', reading: 'みなさまのしんせつにかんしゃにたえません。', translation: 'I cannot express enough gratitude for everyone\'s kindness.' }
    ]
  },
  {
    id: 'g-n1-5',
    pattern: '～を皮切りに / ～を皮切りにして',
    level: 'N1',
    meaning: 'Starting with / Beginning with',
    explanation: 'Expresses that one representative event triggers a sequence of subsequent similar actions or developments.',
    structure: '[Noun] を皮切りに',
    examples: [
      { sentence: '東京公演を皮切りに、全国ツアーがスタートします。', reading: 'とうきょうこうえんをかわきりに、ぜんこくツアーがスタートします。', translation: 'Starting with the Tokyo performance, the nationwide tour begins.' },
      { sentence: '彼の発言を皮切りにして、全員が意見を出し始めた。', reading: 'かれのはつげんをかわきりにして、ぜんいんがいけんをだしはじめた。', translation: 'Beginning with his comment, everyone started speaking their opinions.' }
    ]
  },
  {
    id: 'g-n1-6',
    pattern: '～ずにはおかない',
    level: 'N1',
    meaning: 'Will definitely / Will not stop until',
    explanation: 'Expresses a strong resolve to do something or states that a situation will naturally lead to a certain outcome, carrying a highly determined tone.',
    structure: '[Verb-nai form (drop ない)] + ずにはおかない (する turns into せずにはおかない)',
    examples: [
      { sentence: 'この映画は見る人の心を感動させずにはおかないだろう。', reading: 'このえいがはみるひとのこころをかんどうさせずにはおかないだろう。', translation: 'This movie will definitely move the hearts of whoever watches it.' },
      { sentence: '犯人を逮捕せずにはおかない。', reading: 'はんにんをたいほせずにはおかない。', translation: 'We will definitely arrest the criminal.' }
    ]
  },
  {
    id: 'g-n1-7',
    pattern: '～が早いか',
    level: 'N1',
    meaning: 'No sooner than / As soon as',
    explanation: 'Expresses that immediately after action A occurred, action B took place. Implies that the interval was extremely short.',
    structure: '[Verb dictionary-form / ta-form] + が早いか',
    examples: [
      { sentence: '呼び出し音が鳴るが早いか、彼は電話に出た。', reading: 'よびだしおんがなるが早いか、かれはでんにでた。', translation: 'No sooner had the call tone rung than he answered the phone.' },
      { sentence: 'ベルが鳴るが早いか、学生たちは教室を飛び出した。', reading: 'ベルがなるが早いか、がくせいたちはきょうしつをとびだした。', translation: 'As soon as the bell rang, the students rushed out of the classroom.' }
    ]
  },
  {
    id: 'g-n1-8',
    pattern: '～なり',
    level: 'N1',
    meaning: 'As soon as / Immediately after',
    explanation: 'Expresses that immediately after action A occurred, action B (often sudden or unexpected) took place. Usually about third-person subjects.',
    structure: '[Verb dictionary-form] + なり',
    examples: [
      { sentence: '彼はコーヒーを一口飲むなり、吐き出してしまった。', reading: 'かれはコーヒーをひとくちのむなり、はきだしてしまった。', translation: 'As soon as he took a sip of the coffee, he spat it out.' },
      { sentence: '子供は母親の顔を見るなり泣き出した。', reading: 'こどもはははおやのかおをみるなりなきだした。', translation: 'As soon as the child saw their mother\'s face, they burst into tears.' }
    ]
  },
  {
    id: 'g-n1-9',
    pattern: '～そばから',
    level: 'N1',
    meaning: 'As soon as / Right after (repeated cycle)',
    explanation: 'Expresses that as soon as something is done, it is immediately undone or followed by a counteractive event in an annoying cycle.',
    structure: '[Verb dict-form / Verb ta-form] + そばから',
    examples: [
      { sentence: '覚えるそばから、漢字を忘れてしまう。', reading: 'おぼえるそばから、かんじをわすれてしまう。', translation: 'As soon as I memorize them, I forget the Kanji.' },
      { sentence: '片付けるそばから、子供が部屋を散らかす。', reading: 'かたづけるそばから、こどもがへやをちらかす。', translation: 'Right after I clean it up, the kid messes up the room again.' }
    ]
  },
  {
    id: 'g-n1-10',
    pattern: '～にあって',
    level: 'N1',
    meaning: 'In / At / Under the circumstance of',
    explanation: 'A formal expression signifying that a state, event, or action occurs under specific severe, unique, or special circumstances.',
    structure: '[Noun] + にあって',
    examples: [
      { sentence: '不況にあって、会社は売り上げを伸ばしている。', reading: 'ふきょうにあって、かいしゃはうりあげをのばしている。', translation: 'In a recession, the company is still growing its sales.' },
      { sentence: '戦時中にあって、彼は希望を捨てなかった。', reading: 'せんじちゅうにあって、かれはきぼうをすてなかった。', translation: 'Even in wartime, he did not abandon hope.' }
    ]
  },
  {
    id: 'g-n1-11',
    pattern: '～をもって',
    level: 'N1',
    meaning: 'With / By means of / As of (time limit)',
    explanation: 'A formal expression. 1. Shows means or method (with/by). 2. Shows a temporal deadline or starting point (as of / with).',
    structure: '[Noun] + をもって',
    examples: [
      { sentence: '本日をもって、この店を閉店いたします。', reading: 'ほんじつをもって、このみせをへいてんいたします。', translation: 'As of today, we are closing this shop.' },
      { sentence: '誠意をもって説明すれば、理解してもらえるはずだ。', reading: 'せいいをもってせつめいすれば、りかいしてもらえるはずだ。', translation: 'If you explain with sincerity, they should be able to understand.' }
    ]
  },
  {
    id: 'g-n1-12',
    pattern: '～といえども',
    level: 'N1',
    meaning: 'Even / Although / Even though it is',
    explanation: 'Expresses that even if X is true, the situation is different from what is normally expected. A formal, literary conditional.',
    structure: '[Plain Form clause / Noun] + といえども',
    examples: [
      { sentence: '子供といえども、自分の言動に責任を持つべきだ。', reading: 'こどもといえども、じぶんのげんどうにせきにんをもつべきだ。', translation: 'Even if they are children, they should take responsibility for their words.' },
      { sentence: 'プロの作家といえども、常に良い作品が書けるわけではない。', reading: 'プロのさっかといえども、つねによいさくひんがかけるわけではない。', translation: 'Even though they are professional writers, they cannot always write good pieces.' }
    ]
  },
  {
    id: 'g-n1-13',
    pattern: '～禁じ得ない',
    level: 'N1',
    meaning: 'Cannot help but feel / Cannot suppress',
    explanation: 'Expresses an overwhelming emotion (sympathy, anger, laughter, tears) that the speaker is unable to control or suppress.',
    structure: '[Noun] + を禁じ得ない',
    examples: [
      { sentence: '彼の不幸な境遇に、同情を禁じ得ない。', reading: 'かれのふこうなきょうぐうに、どうじょうをきんじえない。', translation: 'I cannot help but feel sympathy for his unfortunate circumstances.' },
      { sentence: 'その無責任な態度に、怒りを禁じ得ない。', reading: 'そのむせきにんなたいどに、いかりをきんじえない。', translation: 'I cannot suppress my anger at that irresponsible attitude.' }
    ]
  },
  {
    id: 'g-n1-14',
    pattern: '～を余儀なくされる',
    level: 'N1',
    meaning: 'Be forced to / Have no choice but to',
    explanation: 'Expresses that the subject is forced into an action or outcome by external, unavoidable circumstances.',
    structure: '[Noun] + を余儀なくされる (Verb turns into [Noun form of verb])',
    examples: [
      { sentence: '大雨のため、試合は中止を余儀なくされた。', reading: 'おおあめのため、しあいはちゅうしをよぎなくされた。', translation: 'Due to heavy rain, the match was forced to be cancelled.' },
      { sentence: '怪我によって、選手生命の引退を余儀なくされた。', reading: 'けがによって、せんしゅせいめいのいんたいをよぎなくされた。', translation: 'Due to injury, he was forced to retire from his athletic career.' }
    ]
  },
  {
    id: 'g-n1-15',
    pattern: '～ずにはいられない',
    level: 'N1',
    meaning: 'Cannot help but do / Cannot stop doing',
    explanation: 'Expresses that the speaker cannot control their urge or feeling and must do the action.',
    structure: '[Verb-nai form (drop ない)] + ずにはいられない (する turns into せずにはいられない)',
    examples: [
      { sentence: 'その話を聞いて、笑わずにはいられなかった。', reading: 'そのはなしをきいて、わらわずにはいられなかった。', translation: 'Hearing that story, I couldn\'t help but laugh.' },
      { sentence: '彼女の悲しい表情を見て、助けずにはいられなかった。', reading: 'かのじょのかなしいひょうじょうをみて、たすけずにはいられなかった。', translation: 'Seeing her sad expression, I couldn\'t help but help her.' }
    ]
  }
];
