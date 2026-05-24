import React, { useState } from 'react';
import { Volume2, HelpCircle, BookOpen, Layers } from 'lucide-react';

interface KanaItem {
  kana: string;
  romaji: string;
  type: 'standard' | 'empty';
}

interface KanaChartProps {
  speakText: (text: string) => void;
}

const hiraganaGrid: KanaItem[] = [
  { kana: 'あ', romaji: 'a', type: 'standard' }, { kana: 'い', romaji: 'i', type: 'standard' }, { kana: 'う', romaji: 'u', type: 'standard' }, { kana: 'え', romaji: 'e', type: 'standard' }, { kana: 'お', romaji: 'o', type: 'standard' },
  { kana: 'か', romaji: 'ka', type: 'standard' }, { kana: 'き', romaji: 'ki', type: 'standard' }, { kana: 'く', romaji: 'ku', type: 'standard' }, { kana: 'け', romaji: 'ke', type: 'standard' }, { kana: 'こ', romaji: 'ko', type: 'standard' },
  { kana: 'さ', romaji: 'sa', type: 'standard' }, { kana: 'し', romaji: 'shi', type: 'standard' }, { kana: 'す', romaji: 'su', type: 'standard' }, { kana: 'せ', romaji: 'se', type: 'standard' }, { kana: 'そ', romaji: 'so', type: 'standard' },
  { kana: 'た', romaji: 'ta', type: 'standard' }, { kana: 'ち', romaji: 'chi', type: 'standard' }, { kana: 'つ', romaji: 'tsu', type: 'standard' }, { kana: 'て', romaji: 'te', type: 'standard' }, { kana: 'と', romaji: 'to', type: 'standard' },
  { kana: 'な', romaji: 'na', type: 'standard' }, { kana: 'に', romaji: 'ni', type: 'standard' }, { kana: 'ぬ', romaji: 'nu', type: 'standard' }, { kana: 'ね', romaji: 'ne', type: 'standard' }, { kana: 'の', romaji: 'no', type: 'standard' },
  { kana: 'は', romaji: 'ha', type: 'standard' }, { kana: 'ひ', romaji: 'hi', type: 'standard' }, { kana: 'ふ', romaji: 'fu', type: 'standard' }, { kana: 'へ', romaji: 'he', type: 'standard' }, { kana: 'ほ', romaji: 'ho', type: 'standard' },
  { kana: 'ま', romaji: 'ma', type: 'standard' }, { kana: 'み', romaji: 'mi', type: 'standard' }, { kana: 'む', romaji: 'mu', type: 'standard' }, { kana: 'め', romaji: 'me', type: 'standard' }, { kana: 'も', romaji: 'mo', type: 'standard' },
  { kana: 'や', romaji: 'ya', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: 'ゆ', romaji: 'yu', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: 'よ', romaji: 'yo', type: 'standard' },
  { kana: 'ら', romaji: 'ra', type: 'standard' }, { kana: 'り', romaji: 'ri', type: 'standard' }, { kana: 'る', romaji: 'ru', type: 'standard' }, { kana: 'れ', romaji: 're', type: 'standard' }, { kana: 'ろ', romaji: 'ro', type: 'standard' },
  { kana: 'わ', romaji: 'wa', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: 'を', romaji: 'wo', type: 'standard' },
  { kana: 'ん', romaji: 'n', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' },
];

const katakanaGrid: KanaItem[] = [
  { kana: 'ア', romaji: 'a', type: 'standard' }, { kana: 'イ', romaji: 'i', type: 'standard' }, { kana: 'ウ', romaji: 'u', type: 'standard' }, { kana: 'エ', romaji: 'e', type: 'standard' }, { kana: 'オ', romaji: 'o', type: 'standard' },
  { kana: 'カ', romaji: 'ka', type: 'standard' }, { kana: 'キ', romaji: 'ki', type: 'standard' }, { kana: 'ク', romaji: 'ku', type: 'standard' }, { kana: 'ケ', romaji: 'ke', type: 'standard' }, { kana: 'コ', romaji: 'ko', type: 'standard' },
  { kana: 'サ', romaji: 'sa', type: 'standard' }, { kana: 'シ', romaji: 'shi', type: 'standard' }, { kana: 'ス', romaji: 'su', type: 'standard' }, { kana: 'セ', romaji: 'se', type: 'standard' }, { kana: 'ソ', romaji: 'so', type: 'standard' },
  { kana: 'タ', romaji: 'ta', type: 'standard' }, { kana: 'チ', romaji: 'chi', type: 'standard' }, { kana: 'ツ', romaji: 'tsu', type: 'standard' }, { kana: 'テ', romaji: 'te', type: 'standard' }, { kana: 'ト', romaji: 'to', type: 'standard' },
  { kana: 'ナ', romaji: 'na', type: 'standard' }, { kana: 'ニ', romaji: 'ni', type: 'standard' }, { kana: 'ヌ', romaji: 'nu', type: 'standard' }, { kana: 'ネ', romaji: 'ne', type: 'standard' }, { kana: 'ノ', romaji: 'no', type: 'standard' },
  { kana: 'ハ', romaji: 'ha', type: 'standard' }, { kana: 'ヒ', romaji: 'hi', type: 'standard' }, { kana: 'フ', romaji: 'fu', type: 'standard' }, { kana: 'ヘ', romaji: 'he', type: 'standard' }, { kana: 'ホ', romaji: 'ho', type: 'standard' },
  { kana: 'マ', romaji: 'ma', type: 'standard' }, { kana: 'ミ', romaji: 'mi', type: 'standard' }, { kana: 'ム', romaji: 'mu', type: 'standard' }, { kana: 'メ', romaji: 'me', type: 'standard' }, { kana: 'モ', romaji: 'mo', type: 'standard' },
  { kana: 'ヤ', romaji: 'ya', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: 'ユ', romaji: 'yu', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: 'ヨ', romaji: 'yo', type: 'standard' },
  { kana: 'ラ', romaji: 'ra', type: 'standard' }, { kana: 'リ', romaji: 'ri', type: 'standard' }, { kana: 'ル', romaji: 'ru', type: 'standard' }, { kana: 'レ', romaji: 're', type: 'standard' }, { kana: 'ロ', romaji: 'ro', type: 'standard' },
  { kana: 'ワ', romaji: 'wa', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: 'ヲ', romaji: 'wo', type: 'standard' },
  { kana: 'ン', romaji: 'n', type: 'standard' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' }, { kana: '', romaji: '', type: 'empty' },
];

export const KanaChart: React.FC<KanaChartProps> = ({ speakText }) => {
  const [kanaType, setKanaType] = useState<'hiragana' | 'katakana'>('hiragana');
  const currentGrid = kanaType === 'hiragana' ? hiraganaGrid : katakanaGrid;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 className="neon-text-primary">Japanese Kana Systems</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
            The foundation of Japanese reading and pronunciation. Click on any card to hear the audio guide.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${kanaType === 'hiragana' ? 'btn-cyan' : ''}`}
            onClick={() => setKanaType('hiragana')}
            style={{ minWidth: '120px', justifyContent: 'center' }}
          >
            Hiragana
          </button>
          <button
            className={`btn ${kanaType === 'katakana' ? 'btn-cyan' : ''}`}
            onClick={() => setKanaType('katakana')}
            style={{ minWidth: '120px', justifyContent: 'center' }}
          >
            Katakana
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Left Side: Audio Interactive Grid */}
        <div style={{ flex: '1.5 1 450px' }} className="glass-panel">
          <div style={{ padding: '25px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} className="neon-text-cyan" />
              Interactive {kanaType === 'hiragana' ? 'Hiragana' : 'Katakana'} Chart
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
              justifyContent: 'center'
            }}>
              {currentGrid.map((item, idx) => {
                if (item.type === 'empty') {
                  return <div key={`empty-${idx}`} style={{ aspectRatio: '1/1.1' }} />;
                }

                return (
                  <div
                    key={item.kana}
                    onClick={() => speakText(item.kana)}
                    style={{
                      aspectRatio: '1/1.1',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      position: 'relative'
                    }}
                    className="kana-card"
                    title={`Hear pronunciation for ${item.romaji}`}
                  >
                    <span className="jp-font" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                      {item.kana}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {item.romaji}
                    </span>
                    <Volume2 size={10} style={{ position: 'absolute', right: '8px', bottom: '8px', opacity: 0.3 }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Educational Beginner Guides */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Guide panel 1: Hiragana & Katakana */}
          <div className="glass-panel" style={{ padding: '25px', borderLeft: '4px solid var(--primary)' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} className="neon-text-primary" />
              Hiragana vs. Katakana
            </h3>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.55, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p>
                Written Japanese uses a combination of three scripts: **Hiragana**, **Katakana**, and **Kanji**.
              </p>
              <div>
                <strong style={{ color: 'var(--secondary)' }}>🏮 Hiragana (ひらがな)</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                  The primary phonetic alphabet. Used for grammar particles, okurigana (word endings like in 食べる), and native Japanese words that do not use Kanji. Characterized by curved, flowing strokes.
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--accent)' }}>💥 Katakana (カタカナ)</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                  The secondary phonetic alphabet. Primarily used for foreign loanwords (e.g., ラジカセ / radio-cassette), non-Japanese names, sound effects (onomatopoeia), and technical terms. Characterized by sharp, straight angles.
                </p>
              </div>
            </div>
          </div>

          {/* Guide panel 2: Onyomi vs Kunyomi */}
          <div className="glass-panel" style={{ padding: '25px', borderLeft: '4px solid var(--secondary)' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} className="neon-text-cyan" />
              Onyomi vs. Kunyomi Readings
            </h3>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.55, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p>
                Because Japanese imported Chinese Kanji, almost every Kanji character has two different ways of being read depending on context:
              </p>
              <div>
                <strong style={{ color: 'var(--secondary)' }}>🔊 Onyomi (音読み - Chinese Reading)</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                  The Chinese-derived pronunciation. It is typically used when Kanji are grouped together to form compound words (*jukugo*).
                </p>
                <div style={{ fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '6px', marginTop: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <em>Example:</em> <strong>学生</strong> (Student) is read as <strong>がくせい</strong> (<em>gakusei</em>). Both <strong>学</strong> (<em>gaku</em>) and <strong>生</strong> (<em>sei</em>) use their Onyomi readings.
                </div>
              </div>
              <div>
                <strong style={{ color: 'var(--accent)' }}>👤 Kunyomi (訓読み - Japanese Reading)</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                  The native Japanese pronunciation. It is typically used when a Kanji stands alone as its own word, or is followed by Hiragana endings (*okurigana*).
                </p>
                <div style={{ fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '6px', marginTop: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <em>Example:</em> <strong>食べる</strong> (to eat) is read as <strong>たべる</strong> (<em>taberu</em>). <strong>食</strong> uses its Kunyomi reading <strong>た</strong> (<em>ta</em>).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .kana-card:hover {
          background: rgba(142, 45, 226, 0.08) !important;
          border-color: var(--primary) !important;
          box-shadow: 0 0 10px rgba(142, 45, 226, 0.2);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
