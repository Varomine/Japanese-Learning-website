import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Play, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { grammarData } from '../data/grammar';

interface QuizQuestion {
  questionText: string;
  jpContext?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizViewProps {
  onQuizComplete: (score: number, total: number) => void;
  vocabList: any[];
  kanjiList: any[];
  currentLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  onLevelChange: (lvl: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') => void;
  isLoggedIn: boolean;
}

export const QuizView: React.FC<QuizViewProps> = ({ 
  onQuizComplete,
  vocabList,
  kanjiList,
  currentLevel,
  onLevelChange,
  isLoggedIn
}) => {
  const [quizType, setQuizType] = useState<'vocab' | 'kanji' | 'grammar'>('vocab');
  
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(10);

  const startQuiz = () => {
    // Generate questions
    const generated: QuizQuestion[] = [];
    
    // Decouple available items count to avoid TDZ ReferenceError
    let availableCount = 0;
    if (quizType === 'vocab') {
      availableCount = vocabList.length;
    } else if (quizType === 'kanji') {
      availableCount = kanjiList.length;
    } else {
      availableCount = grammarData.filter((g) => g.level === currentLevel).length;
    }

    const finalPoolSize = Math.min(questionCount, availableCount);

    const buildGrammarQuestions = (selected: typeof grammarData, allPool: typeof grammarData) => {
      selected.forEach((item) => {
        const others = allPool.filter((g) => g.id !== item.id);
        const distractors = others
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((g) => g.pattern);

        const correctAnswer = item.pattern;
        const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

        generated.push({
          questionText: `Which grammar pattern matches the meaning: "${item.meaning}"?`,
          jpContext: item.structure,
          options,
          correctAnswer,
          explanation: `${item.pattern} refers to "${item.meaning}". Structure: ${item.structure}.`
        });
      });
    };

    const containsKanji = (text: string) => /[\u4e00-\u9faf]/.test(text || '');

    if (quizType === 'vocab') {
      if (vocabList.length < 4) {
        setQuestions([]);
        return;
      }
      
      // Shuffle level items and pick top
      const selectedItems = [...vocabList].sort(() => Math.random() - 0.5).slice(0, finalPoolSize);
      
      selectedItems.forEach((item) => {
        const others = vocabList.filter((v) => v.id !== item.id);
        const itemReading = item.reading || item.word;
        const hasKanji = containsKanji(item.word);

        // Mix in Kanji -> Reading question (only if word contains Kanji and reading is different from word)
        const isReadingQuestion = hasKanji && (item.word !== itemReading) && (Math.random() > 0.5);

        if (isReadingQuestion) {
          const readingDistractors = others
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((v) => v.reading || v.word);
          
          generated.push({
            questionText: `What is the reading of "${item.word}"?`,
            jpContext: item.word,
            options: [itemReading, ...readingDistractors].sort(() => Math.random() - 0.5),
            correctAnswer: itemReading,
            explanation: `The reading of "${item.word}" (${item.meanings[0]}) is "${itemReading}".`
          });
        } else {
          // Meaning question
          const distractors = others
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((v) => v.meanings[0]);

          const correctAnswer = item.meanings[0];
          const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

          // If the word has Kanji, display it in brackets next to Hiragana in the question prompt
          const displayPrompt = (item.word && item.word !== itemReading) 
            ? `${itemReading} [${item.word}]` 
            : (item.word || itemReading);

          generated.push({
            questionText: `What is the meaning of "${displayPrompt}"?`,
            jpContext: item.word || itemReading,
            options,
            correctAnswer,
            explanation: `"${displayPrompt}" means "${item.meanings.join(', ')}".`
          });
        }
      });
    } else if (quizType === 'kanji') {
      if (kanjiList.length < 4) {
        setQuestions([]);
        return;
      }

      const selectedItems = [...kanjiList].sort(() => Math.random() - 0.5).slice(0, finalPoolSize);

      selectedItems.forEach((item) => {
        const others = kanjiList.filter((k) => k.id !== item.id);
        const isMeaningQuestion = Math.random() > 0.5;

        if (isMeaningQuestion) {
          const distractors = others
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((k) => k.meanings[0]);

          const correctAnswer = item.meanings[0];
          const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

          generated.push({
            questionText: `What is the meaning of the kanji "${item.character}"?`,
            jpContext: item.character,
            options,
            correctAnswer,
            explanation: `"${item.character}" means "${item.meanings.join(', ')}".`
          });
        } else {
          // Reading question (Kun or On)
          const correctReading = item.onyomi[0] || item.kunyomi[0] || '読み方';
          const distractors = others
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((k) => k.onyomi[0] || k.kunyomi[0] || '読み方');

          const options = [correctReading, ...distractors].sort(() => Math.random() - 0.5);

          generated.push({
            questionText: `What is a valid reading (onyomi or kunyomi) for "${item.character}"?`,
            jpContext: item.character,
            options,
            correctAnswer: correctReading,
            explanation: `Readings for ${item.character} include: Onyomi: ${item.onyomi.join(', ') || 'N/A'} / Kunyomi: ${item.kunyomi.join(', ') || 'N/A'}.`
          });
        }
      });
    } else {
      // Grammar Quiz
      const levelGrammar = grammarData.filter((g) => g.level === currentLevel);
      if (levelGrammar.length < 2) {
        // Fallback: If not enough grammar items for current level, use N5
        const n5Grammar = grammarData.filter((g) => g.level === 'N5');
        const selectedItems = [...n5Grammar].sort(() => Math.random() - 0.5).slice(0, finalPoolSize);
        buildGrammarQuestions(selectedItems, n5Grammar);
      } else {
        const selectedItems = [...levelGrammar].sort(() => Math.random() - 0.5).slice(0, finalPoolSize);
        buildGrammarQuestions(selectedItems, levelGrammar);
      }
    }

    setQuestions(generated);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);

    const isCorrect = selectedOption === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setFinished(true);
    onQuizComplete(score, questions.length);

    // Fire Confetti!
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8e2de2', '#00e5ff', '#ff007f', '#00e676']
      });
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setFinished(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {!started ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <Award size={48} className="neon-text-primary" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '15px' }} className="neon-text-primary">
            JLPT Challenge Quiz
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
            Test your knowledge! Take an interactive quiz on Vocabulary, Kanji, or Grammar for your selected level.
          </p>

          {!isLoggedIn && (
            <div className="glass-panel" style={{ padding: '12px 15px', marginBottom: '25px', borderLeft: '4px solid var(--accent)', background: 'rgba(255, 0, 127, 0.05)', fontSize: '0.9rem', textAlign: 'left' }}>
              ⚠️ <strong>Guest Mode:</strong> You can practice quizzes, but scores and XP will not be saved. Sign in to sync your progress!
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px', textAlign: 'left' }}>
            {/* Level selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Select Level:
              </label>
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
            </div>

            {/* Type selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Select Quiz Topic:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {(['vocab', 'kanji', 'grammar'] as const).map((type) => (
                  <button
                    key={type}
                    className={`btn ${quizType === type ? 'btn-cyan' : ''}`}
                    onClick={() => setQuizType(type)}
                    style={{ flex: 1, justifyContent: 'center', textTransform: 'capitalize' }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Question count selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Quiz Length (Questions):
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {([5, 10, 15, 20] as const).map((count) => {
                  const available = quizType === 'vocab' 
                    ? vocabList.length 
                    : quizType === 'kanji' 
                      ? kanjiList.length 
                      : grammarData.filter((g) => g.level === currentLevel).length;

                  if (quizType === 'grammar' && count > available) return null;

                  return (
                    <button
                      key={count}
                      type="button"
                      className={`btn ${questionCount === count ? 'btn-cyan' : ''}`}
                      onClick={() => setQuestionCount(count)}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      {count} Qs
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={startQuiz} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            <Play size={18} />
            Start Challenge
          </button>
        </div>
      ) : finished ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <h2 className="neon-text-primary" style={{ marginBottom: '15px' }}>
            Quiz Results
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
            You completed the {currentLevel} {quizType.toUpperCase()} quiz!
          </p>

          <div
            style={{
              fontSize: '4rem',
              fontWeight: 800,
              color: score / questions.length >= 0.8 ? 'var(--success)' : 'var(--text-main)',
              marginBottom: '10px',
            }}
          >
            {score} / {questions.length}
          </div>

          <p style={{ fontSize: '1.1rem', marginBottom: '35px' }}>
            {score === questions.length
              ? '🎉 Perfect Score! Masterful Japanese!'
              : score >= 4
              ? '✨ Fantastic job! Keep going!'
              : score >= 3
              ? '👍 Good effort! Review your cards and try again.'
              : '💪 Practice makes perfect. Study some more!'}
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn" onClick={handleRestart} style={{ flex: 1, justifyContent: 'center' }}>
              <RotateCcw size={16} /> Choose Topic
            </button>
            <button className="btn btn-primary" onClick={startQuiz} style={{ flex: 1, justifyContent: 'center' }}>
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Progress bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
            <span>
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span>Current Score: {score}</span>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', height: '6px', borderRadius: '3px', marginBottom: '25px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${((currentIdx + (isSubmitted ? 1 : 0)) / questions.length) * 100}%`,
                background: 'var(--primary)',
                height: '100%',
                boxShadow: '0 0 10px var(--primary)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          {/* Question panel */}
          <div className="glass-panel" style={{ padding: '30px', marginBottom: '20px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              {quizType.toUpperCase()} Quiz
            </p>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', lineHeight: 1.4 }}>
              {questions[currentIdx].questionText}
            </h3>

            {questions[currentIdx].jpContext && (
              <div
                className="jp-font"
                style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  padding: '20px 0',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  marginBottom: '25px',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                {questions[currentIdx].jpContext}
              </div>
            )}

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions[currentIdx].options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === questions[currentIdx].correctAnswer;
                
                let btnStyle = {};
                let icon = null;

                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = { background: 'rgba(0, 230, 118, 0.1)', borderColor: 'var(--success)', color: 'var(--success)' };
                    icon = <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />;
                  } else if (isSelected) {
                    btnStyle = { background: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--accent)', color: 'var(--accent)' };
                    icon = <XCircle size={18} style={{ color: 'var(--accent)' }} />;
                  } else {
                    btnStyle = { opacity: 0.5 };
                  }
                } else if (isSelected) {
                  btnStyle = { borderColor: 'var(--primary)', background: 'rgba(142, 45, 226, 0.1)' };
                }

                return (
                  <button
                    key={opt}
                    className="btn"
                    disabled={isSubmitted}
                    onClick={() => setSelectedOption(opt)}
                    style={{
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      padding: '14px 20px',
                      fontSize: '1rem',
                      ...btnStyle
                    }}
                  >
                    <span>{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Banner */}
          {isSubmitted && questions[currentIdx].explanation && (
            <div
              className="glass-panel"
              style={{
                padding: '15px 20px',
                marginBottom: '20px',
                borderLeft: '4px solid var(--primary)',
                background: 'rgba(142, 45, 226, 0.03)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
              }}
            >
              <strong>Explanation:</strong> {questions[currentIdx].explanation}
            </div>
          )}

          {/* Submit / Next Button */}
          <div>
            {!isSubmitted ? (
              <button
                className="btn btn-primary"
                disabled={!selectedOption}
                onClick={handleSubmit}
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <Check size={18} />
                Submit Answer
              </button>
            ) : (
              <button
                className="btn btn-cyan"
                onClick={handleNext}
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
