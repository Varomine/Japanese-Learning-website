import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, RefreshCw, Layers, Bookmark } from 'lucide-react';

interface CardItem {
  id: string;
  front: string;
  reading: string;
  back: string;
  level?: string;
  type: 'vocab' | 'kanji' | 'custom';
}

interface CustomCard {
  front: string;
  reading: string;
  back: string;
}

interface FlashcardsViewProps {
  customCards: CustomCard[];
  onCardAction: (actionType: 'mastered' | 'review') => void;
  vocabList: any[];
  kanjiList: any[];
  currentLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  onLevelChange: (lvl: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ 
  customCards, 
  onCardAction,
  vocabList,
  kanjiList,
  currentLevel,
  onLevelChange
}) => {
  const [deckType, setDeckType] = useState<'jlpt' | 'custom'>('jlpt');
  const [selectedType, setSelectedType] = useState<'vocab' | 'kanji'>('vocab');
  const [deck, setDeck] = useState<CardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Re-generate deck when criteria changes
  useEffect(() => {
    buildDeck();
  }, [deckType, selectedType, customCards, vocabList, kanjiList]);

  const buildDeck = () => {
    setIsFlipped(false);
    setCurrentIndex(0);

    if (deckType === 'custom') {
      const formatted: CardItem[] = customCards.map((card, i) => ({
        id: `custom-${i}`,
        front: card.front,
        reading: card.reading,
        back: card.back,
        type: 'custom'
      }));
      setDeck(formatted);
    } else {
      let filtered: CardItem[] = [];
      if (selectedType === 'vocab') {
        filtered = vocabList.map((v, i) => ({
          id: v.id || `vocab-${currentLevel}-${i}`,
          front: v.word,
          reading: v.reading || '',
          back: v.meanings.join(', '),
          level: currentLevel,
          type: 'vocab'
        }));
      } else {
        filtered = kanjiList.map((k, i) => ({
          id: k.id || `kanji-${currentLevel}-${i}`,
          front: k.character,
          reading: k.onyomi.concat(k.kunyomi).filter(Boolean).join(', ') || 'Trace Guide Only',
          back: k.meanings.join(', '),
          level: currentLevel,
          type: 'kanji'
        }));
      }
      setDeck(filtered);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
    }, 150);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
    }, 150);
  };

  const shuffleDeck = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  const handleAction = (type: 'mastered' | 'review', e: React.MouseEvent) => {
    e.stopPropagation();
    onCardAction(type);
    handleNext();
  };

  const currentCard = deck[currentIndex];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }} className="neon-text-primary">
        Interactive Flashcards
      </h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        <button
          className={`btn ${deckType === 'jlpt' ? 'glass-panel-active neon-text-primary' : ''}`}
          onClick={() => setDeckType('jlpt')}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Layers size={16} />
          JLPT Decks
        </button>
        <button
          className={`btn ${deckType === 'custom' ? 'glass-panel-active neon-text-primary' : ''}`}
          onClick={() => setDeckType('custom')}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Bookmark size={16} />
          My Saved Cards ({customCards.length})
        </button>
      </div>

      {/* Filters (only for JLPT deck) */}
      {deckType === 'jlpt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }} className="glass-panel">
          <div style={{ padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span>Select JLPT Level:</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  className={`btn level-badge level-${lvl.toLowerCase()}`}
                  onClick={() => onLevelChange(lvl)}
                  style={{
                    opacity: currentLevel === lvl ? 1 : 0.45,
                    transform: currentLevel === lvl ? 'scale(1.05)' : 'scale(1)',
                    borderWidth: currentLevel === lvl ? '2px' : '1px'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                className={`btn ${selectedType === 'vocab' ? 'btn-cyan' : ''}`}
                onClick={() => setSelectedType('vocab')}
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '6px 12px' }}
              >
                Vocabulary ({vocabList.length})
              </button>
              <button
                className={`btn ${selectedType === 'kanji' ? 'btn-cyan' : ''}`}
                onClick={() => setSelectedType('kanji')}
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '6px 12px' }}
              >
                Kanji ({kanjiList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deck State Handler */}
      {deck.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          {deckType === 'custom' ? (
            <div>
              <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Your custom deck is empty!</p>
              <p style={{ fontSize: '0.9rem' }}>
                Go to the <strong>Dictionary Search</strong> page, look up words using the Jisho API, and click <strong>"Add Card"</strong> to fill this review queue.
              </p>
            </div>
          ) : (
            <p>No card data found for this category.</p>
          )}
        </div>
      ) : (
        <div>
          {/* Card Meta Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span>
              Card {currentIndex + 1} of {deck.length}
            </span>
            <button className="btn" onClick={shuffleDeck} style={{ padding: '6px 10px', fontSize: '0.8rem' }}>
              <RefreshCw size={12} /> Shuffle
            </button>
          </div>

          {/* Flip Card Container */}
          <div className={`flashcard-wrapper ${isFlipped ? 'is-flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="flashcard-inner">
              {/* Front */}
              <div className="flashcard-front">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', position: 'absolute', top: '20px' }}>
                  {currentCard.type === 'custom' ? 'Custom Jisho Card' : `${currentCard.level} ${currentCard.type.toUpperCase()}`}
                </span>
                <span className="jp-font" style={{ fontSize: '3rem', fontWeight: 700, margin: '20px 0' }}>
                  {currentCard.front}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', position: 'absolute', bottom: '20px' }} className="pulse-glow">
                  Click to Flip
                </span>
              </div>

              {/* Back */}
              <div className="flashcard-back">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', position: 'absolute', top: '20px' }}>
                  Answer
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', margin: '20px 0' }}>
                  {currentCard.reading && (
                    <span className="jp-font" style={{ fontSize: '1.6rem', color: 'var(--secondary)', fontWeight: 500, textAlign: 'center' }}>
                      {currentCard.reading}
                    </span>
                  )}
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'center', padding: '0 10px', overflowY: 'auto', maxHeight: '150px' }}>
                    {currentCard.back}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', position: 'absolute', bottom: '20px' }}>
                  <button
                    className="btn"
                    onClick={(e) => handleAction('review', e)}
                    style={{
                      background: 'rgba(255, 0, 127, 0.1)',
                      borderColor: 'rgba(255, 0, 127, 0.2)',
                      color: 'var(--accent)',
                      fontSize: '0.8rem',
                      padding: '6px 12px'
                    }}
                  >
                    Need Review
                  </button>
                  <button
                    className="btn"
                    onClick={(e) => handleAction('mastered', e)}
                    style={{
                      background: 'rgba(0, 230, 118, 0.1)',
                      borderColor: 'rgba(0, 230, 118, 0.2)',
                      color: 'var(--success)',
                      fontSize: '0.8rem',
                      padding: '6px 12px'
                    }}
                  >
                    Mastered!
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '25px' }}>
            <button className="btn" onClick={handlePrev} style={{ borderRadius: '50%', width: '45px', height: '45px', padding: 0, justifyContent: 'center' }}>
              <ArrowLeft size={20} />
            </button>
            <button className="btn" onClick={handleNext} style={{ borderRadius: '50%', width: '45px', height: '45px', padding: 0, justifyContent: 'center' }}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
