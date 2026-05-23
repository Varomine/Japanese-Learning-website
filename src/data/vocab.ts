export interface VocabEntry {
  id: string;
  word: string;
  reading: string;
  meanings: string[];
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  partOfSpeech: string;
  example: {
    sentence: string;
    reading: string;
    translation: string;
  };
}

export const vocabData: VocabEntry[] = [
  // N5
  {
    id: 'v-n5-1',
    word: '食べる',
    reading: 'たべる',
    meanings: ['to eat'],
    level: 'N5',
    partOfSpeech: 'Verb (Ichidan)',
    example: {
      sentence: '毎日りんごを食べます。',
      reading: 'まいにちりんごをたべます。',
      translation: 'I eat an apple every day.'
    }
  },
  {
    id: 'v-n5-2',
    word: '友達',
    reading: 'ともだち',
    meanings: ['friend'],
    level: 'N5',
    partOfSpeech: 'Noun',
    example: {
      sentence: '友達と一緒に勉強します。',
      reading: 'ともだちといっしょにべんきょうします。',
      translation: 'I study with my friend.'
    }
  },
  {
    id: 'v-n5-3',
    word: '美味しい',
    reading: 'おいしい',
    meanings: ['delicious', 'tasty'],
    level: 'N5',
    partOfSpeech: 'i-Adjective',
    example: {
      sentence: 'このラーメンはとても美味しいです。',
      reading: 'このラーメンはとてもおいしいです。',
      translation: 'This ramen is very delicious.'
    }
  },
  {
    id: 'v-n5-4',
    word: '行く',
    reading: 'いく',
    meanings: ['to go'],
    level: 'N5',
    partOfSpeech: 'Verb (Godan)',
    example: {
      sentence: '明日、東京に行きます。',
      reading: 'あした、とうきょうにいきます。',
      translation: 'I will go to Tokyo tomorrow.'
    }
  },
  {
    id: 'v-n5-5',
    word: '新しい',
    reading: 'あたらしい',
    meanings: ['new'],
    level: 'N5',
    partOfSpeech: 'i-Adjective',
    example: {
      sentence: '新しい靴を買いました。',
      reading: 'あたらしいくつをかいました。',
      translation: 'I bought new shoes.'
    }
  },

  // N4
  {
    id: 'v-n4-1',
    word: '集める',
    reading: 'あつめる',
    meanings: ['to collect', 'to gather'],
    level: 'N4',
    partOfSpeech: 'Verb (Ichidan)',
    example: {
      sentence: '切手を集めるのが趣味です。',
      reading: 'きってをあつめるのがしゅみです。',
      translation: 'My hobby is collecting stamps.'
    }
  },
  {
    id: 'v-n4-2',
    word: '試験',
    reading: 'しけん',
    meanings: ['exam', 'examination', 'test'],
    level: 'N4',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '明日の試験は難しいですか？',
      reading: 'あしたのしけんはむずかしいですか？',
      translation: 'Is tomorrow\'s exam difficult?'
    }
  },
  {
    id: 'v-n4-3',
    word: '便利な',
    reading: 'べんりな',
    meanings: ['convenient', 'handy'],
    level: 'N4',
    partOfSpeech: 'na-Adjective',
    example: {
      sentence: 'スマホはとても便利です。',
      reading: 'スマホはとてもべんりです。',
      translation: 'Smartphones are very convenient.'
    }
  },
  {
    id: 'v-n4-4',
    word: '遅れる',
    reading: 'おくれる',
    meanings: ['to be late', 'to be delayed'],
    level: 'N4',
    partOfSpeech: 'Verb (Ichidan)',
    example: {
      sentence: '電車が遅れて、遅刻しました。',
      reading: 'でんしゃがおくれて、ちこくしました。',
      translation: 'The train was delayed and I was late.'
    }
  },
  {
    id: 'v-n4-5',
    word: '準備',
    reading: 'じゅんび',
    meanings: ['preparation', 'arrangements'],
    level: 'N4',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '旅行の準備はもう終わりましたか？',
      reading: 'りょこうのじゅんびはもうおわりましたか？',
      translation: 'Are the preparations for the trip finished already?'
    }
  },

  // N3
  {
    id: 'v-n3-1',
    word: '解決',
    reading: 'かいけつ',
    meanings: ['resolution', 'solution', 'settlement'],
    level: 'N3',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: 'その問題は無事に解決しました。',
      reading: 'そのもんだいはぶじにかいけつしました。',
      translation: 'The problem was resolved successfully.'
    }
  },
  {
    id: 'v-n3-2',
    word: '複雑な',
    reading: 'ふくざつな',
    meanings: ['complex', 'complicated'],
    level: 'N3',
    partOfSpeech: 'na-Adjective',
    example: {
      sentence: '日本語の文法は複雑ですが面白いです。',
      reading: 'にほんごのぶんぽうはふくざつですがおもしろいです。',
      translation: 'Japanese grammar is complicated but interesting.'
    }
  },
  {
    id: 'v-n3-3',
    word: '信じる',
    reading: 'しんじる',
    meanings: ['to believe', 'to trust'],
    level: 'N3',
    partOfSpeech: 'Verb (Ichidan)',
    example: {
      sentence: '私は彼の話を信じます。',
      reading: 'わたしはかれのはなしをしんじます。',
      translation: 'I believe his story.'
    }
  },
  {
    id: 'v-n3-4',
    word: '興味',
    reading: 'きょうみ',
    meanings: ['interest (in something)'],
    level: 'N3',
    partOfSpeech: 'Noun',
    example: {
      sentence: '日本の歴史に興味があります。',
      reading: 'にほんのれきしにきょうみがあります。',
      translation: 'I have an interest in Japanese history.'
    }
  },
  {
    id: 'v-n3-5',
    word: '突然',
    reading: 'とつぜん',
    meanings: ['suddenly', 'unexpectedly'],
    level: 'N3',
    partOfSpeech: 'Adverb / Noun',
    example: {
      sentence: '突然、雨が降り出しました。',
      reading: 'とつぜん、あめがふりだしました。',
      translation: 'Suddenly, it started to rain.'
    }
  },

  // N2
  {
    id: 'v-n2-1',
    word: '影響',
    reading: 'えいきょう',
    meanings: ['influence', 'effect'],
    level: 'N2',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '地球温暖化は天候に影響を与えます。',
      reading: 'ちきゅうおんだんかはてんこうにえいきょうをあたえます。',
      translation: 'Global warming influences the weather.'
    }
  },
  {
    id: 'v-n2-2',
    word: '延期',
    reading: 'えんき',
    meanings: ['postponement', 'adjournment'],
    level: 'N2',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '試合は雨のため来週に延期された。',
      reading: 'しあいはあめのためらいしゅうにえんきされた。',
      translation: 'The match was postponed to next week due to rain.'
    }
  },
  {
    id: 'v-n2-3',
    word: '貴重な',
    reading: 'きちょうな',
    meanings: ['precious', 'valuable'],
    level: 'N2',
    partOfSpeech: 'na-Adjective',
    example: {
      sentence: '留学はとても貴重な体験になりました。',
      reading: 'りゅうがくはとてもきちょうなたいけんになりました。',
      translation: 'Studying abroad was a very precious experience.'
    }
  },
  {
    id: 'v-n2-4',
    word: '冷静な',
    reading: 'れいせいな',
    meanings: ['calm', 'composed', 'cool-headed'],
    level: 'N2',
    partOfSpeech: 'na-Adjective',
    example: {
      sentence: 'ピンチの時こそ冷静になるべきだ。',
      reading: 'ピンチのときこそれいせいになるべきだ。',
      translation: 'You should stay calm especially in times of crisis.'
    }
  },
  {
    id: 'v-n2-5',
    word: '繰り返す',
    reading: 'くりかえす',
    meanings: ['to repeat', 'to do over again'],
    level: 'N2',
    partOfSpeech: 'Verb (Godan)',
    example: {
      sentence: '同じ間違いを繰り返さないでください。',
      reading: 'おなじまちがいをくりかえさないでください。',
      translation: 'Please do not repeat the same mistake.'
    }
  },

  // N1
  {
    id: 'v-n1-1',
    word: '把握',
    reading: 'はあく',
    meanings: ['grasp', 'catch', 'understanding'],
    level: 'N1',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '事態を正確に把握する必要があります。',
      reading: 'じたいをせいかくにはあくするひつようがあります。',
      translation: 'We need to accurately grasp the situation.'
    }
  },
  {
    id: 'v-n1-2',
    word: '妥協',
    reading: 'だきょう',
    meanings: ['compromise', 'giving in'],
    level: 'N1',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '品質においては一切の妥協を許さない。',
      reading: 'ひんしつにおいてはいっさいのだきょうをゆるさない。',
      translation: 'We do not tolerate any compromise on quality.'
    }
  },
  {
    id: 'v-n1-3',
    word: '迅速な',
    reading: 'じんそくな',
    meanings: ['quick', 'rapid', 'prompt'],
    level: 'N1',
    partOfSpeech: 'na-Adjective',
    example: {
      sentence: 'トラブルには迅速な対応が求められる。',
      reading: 'トラブルにはじんそくなたいおうがもとめられる。',
      translation: 'A prompt response is required for troubleshooting.'
    }
  },
  {
    id: 'v-n1-4',
    word: '懸念',
    reading: 'けねん',
    meanings: ['concern', 'anxiety', 'apprehension'],
    level: 'N1',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '景気の悪化が懸念されている。',
      reading: 'けいきのあっかがけねんされている。',
      translation: 'There is concern over the worsening of the economy.'
    }
  },
  {
    id: 'v-n1-5',
    word: '模索',
    reading: 'もさく',
    meanings: ['groping for', 'seeking (a solution) in the dark'],
    level: 'N1',
    partOfSpeech: 'Noun / Suru-Verb',
    example: {
      sentence: '新しいビジネスモデルを模索している。',
      reading: 'あたらしいビジネスモデルをもさくしている。',
      translation: 'We are groping for a new business model.'
    }
  }
];
