import React, { useState } from 'react';
import { Search, Loader2, Plus, Check } from 'lucide-react';

interface JishoJapaneseItem {
  word?: string;
  reading?: string;
}

interface JishoSenseItem {
  english_definitions: string[];
  parts_of_speech: string[];
  tags: string[];
}

interface JishoResultItem {
  slug: string;
  is_common: boolean;
  japanese: JishoJapaneseItem[];
  senses: JishoSenseItem[];
  jlpt: string[];
}

interface DictionarySearchProps {
  onAddCustomCard: (card: { front: string; reading: string; back: string }) => void;
  savedCards: { front: string }[];
}

export const DictionarySearch: React.FC<DictionarySearchProps> = ({ onAddCustomCard, savedCards }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<JishoResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    const targetUrl = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(query)}`;
    
    // List of CORS proxies to query concurrently
    const proxies = [
      `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
    ];

    const fetchFromProxy = async (proxyUrl: string) => {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      if (data && data.data) {
        return data;
      }
      throw new Error('Invalid response format');
    };

    // Custom promise race that resolves with the first successful fetch,
    // and only rejects if all proxies fail.
    const firstSuccessfulFetch = (urls: string[]) => {
      let rejectCount = 0;
      let errors: string[] = [];
      return new Promise<any>((resolve, reject) => {
        urls.forEach(url => {
          fetchFromProxy(url)
            .then(resolve)
            .catch(err => {
              rejectCount++;
              errors.push(err.message || 'Unknown error');
              if (rejectCount === urls.length) {
                reject(new Error(`All CORS proxies failed: [${errors.join(', ')}]`));
              }
            });
        });
      });
    };

    try {
      console.log('Searching Jisho concurrently via multiple proxies for maximum speed...');
      const data = await firstSuccessfulFetch(proxies);
      
      setResults(data.data);
      if (data.data.length === 0) {
        setError('No definitions found for this keyword.');
      }
    } catch (err: any) {
      console.error(err);
      setError(`Search failed. Jisho API or CORS proxies are currently unreachable (details: ${err.message}). Please check your connection.`);
    } finally {
      setLoading(false);
    }
  };

  const isAlreadySaved = (front: string) => {
    return savedCards.some(card => card.front === front);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }} className="neon-text-primary">
        Jisho Dictionary Search
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Search Japanese words, kanji, or English terms. Instantly add dictionary definitions directly to your custom flashcard review queue.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search e.g. taberu, sensei, 猫, study..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            style={{ paddingLeft: '45px' }}
          />
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '120px', justifyContent: 'center' }}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Search'}
        </button>
      </form>

      {error && (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px', borderLeft: '4px solid var(--accent)', background: 'rgba(255, 0, 127, 0.03)' }}>
          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{error}</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {results.map((item, index) => {
          const mainJapanese = item.japanese[0] || {};
          const displayWord = mainJapanese.word || mainJapanese.reading || '';
          const displayReading = mainJapanese.word ? mainJapanese.reading : '';
          const firstSense = item.senses[0];
          const definitionsString = firstSense ? firstSense.english_definitions.join(', ') : 'No definitions available';
          
          const alreadySaved = isAlreadySaved(displayWord);

          return (
            <div key={item.slug + index} className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                {/* Heading details */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <span className="jp-font" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                    {displayWord}
                  </span>
                  {displayReading && (
                    <span className="jp-font" style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                      【{displayReading}】
                    </span>
                  )}
                  {item.is_common && (
                    <span className="level-badge" style={{ background: 'rgba(0, 229, 255, 0.1)', color: 'var(--secondary)', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                      Common
                    </span>
                  )}
                  {item.jlpt && item.jlpt.map((jlptTag) => (
                    <span key={jlptTag} className={`level-badge level-${jlptTag.toLowerCase()}`}>
                      {jlptTag.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Meanings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                  {item.senses.slice(0, 3).map((sense, senseIdx) => (
                    <div key={senseIdx} style={{ fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600, marginRight: '8px' }}>
                        {senseIdx + 1}. {sense.parts_of_speech.slice(0, 2).join(', ')}
                      </span>
                      <span>{sense.english_definitions.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`btn ${alreadySaved ? '' : 'btn-cyan'}`}
                disabled={alreadySaved}
                onClick={() =>
                  onAddCustomCard({
                    front: displayWord,
                    reading: displayReading || '',
                    back: definitionsString,
                  })
                }
                style={{ flexShrink: 0, padding: '8px 12px' }}
              >
                {alreadySaved ? (
                  <>
                    <Check size={16} style={{ color: 'var(--success)' }} />
                    Saved
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add Card
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Guide Section */}
      <div className="glass-panel" style={{ marginTop: '50px', padding: '30px', borderLeft: '4px solid var(--secondary)', textAlign: 'left' }}>
        <h3 className="neon-text-cyan" style={{ fontSize: '1.25rem', marginBottom: '15px', fontWeight: 700 }}>
          About & How to Use Jisho Dictionary
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', fontSize: '0.9rem', lineHeight: 1.55 }}>
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>🔍 Flexible Search Inputs</h4>
            <p style={{ color: 'var(--text-muted)' }}>
              You can search using:
            </p>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <li><strong>English definitions</strong> (e.g. "eat", "teacher", "cat")</li>
              <li><strong>Rōmaji readings</strong> (e.g. "taberu", "sensei", "neko")</li>
              <li><strong>Japanese Kana</strong> (e.g. "たべる", "ねこ", "ラジオ")</li>
              <li><strong>Kanji characters</strong> (e.g. "食べる", "猫", "先生")</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>⚡ Concurrent Proxy Sync</h4>
            <p style={{ color: 'var(--text-muted)' }}>
              Client-side requests to Jisho API are blocked by browser CORS security. To make requests fast, Nihonkana queries multiple secure CORS proxies concurrently. The fastest proxy wins, providing near-instant lookups.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>🗃️ Import to Flashcards</h4>
            <p style={{ color: 'var(--text-muted)' }}>
              Found a word you want to review? Click the <strong>Add Card</strong> button on any definition. It will be added straight to your custom deck, granting you <strong>+15 XP</strong>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
