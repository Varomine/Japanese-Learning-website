import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Languages, 
  FileText, 
  Layers, 
  Award, 
  Search, 
  Volume2, 
  Zap, 
  Flame, 
  Menu, 
  X,
  Sparkles,
  Cloud,
  Loader2,
  Info,
  Plus
} from 'lucide-react';

import { onAuthStateChanged } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Data imports
import { grammarData } from './data/grammar';

// Component imports
import { KanjiCanvas } from './components/KanjiCanvas';
import { DictionarySearch } from './components/DictionarySearch';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { AuthView } from './components/AuthView';

type Tab = 'dashboard' | 'kanji' | 'vocab' | 'grammar' | 'flashcards' | 'quiz' | 'jisho' | 'account' | 'about';
type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

interface CustomCard {
  front: string;
  reading: string;
  back: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [currentLevel, setCurrentLevel] = useState<Level>('N5');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // User Stats state (no local storage fallback for guests, stats default to 0/empty)
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [quizzesDone, setQuizzesDone] = useState<number>(0);
  const [customCards, setCustomCards] = useState<CustomCard[]>([]);

  // Cloud sync states
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Search filter states
  const [kanjiSearch, setKanjiSearch] = useState('');
  const [grammarSearch, setGrammarSearch] = useState('');
  const [vocabSearch, setVocabSearch] = useState('');

  // Dynamic lists from public JSON
  const [vocabList, setVocabList] = useState<any[]>([]);
  const [kanjiList, setKanjiList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Pagination lists limit
  const [visibleVocabCount, setVisibleVocabCount] = useState(50);
  const [visibleKanjiCount, setVisibleKanjiCount] = useState(50);
  
  // Detail selection states
  const [selectedKanji, setSelectedKanji] = useState<any | null>(null);

  // Local Storage handles details for Jisho search state, last active, etc.

  // Load level-specific data files dynamically from /public/data
  useEffect(() => {
    const loadLevelData = async () => {
      setLoadingData(true);
      try {
        const vocabRes = await fetch(`/data/vocab_${currentLevel}.json`);
        const vocabJson = await vocabRes.json();
        setVocabList(vocabJson);

        const kanjiRes = await fetch(`/data/kanji_${currentLevel}.json`);
        const kanjiJson = await kanjiRes.json();
        setKanjiList(kanjiJson);

        // Reset details and pagination
        setSelectedKanji(null);
        setVisibleVocabCount(50);
        setVisibleKanjiCount(50);
      } catch (err) {
        console.error('Failed to load level data files:', err);
      } finally {
        setLoadingData(false);
      }
    };
    loadLevelData();
  }, [currentLevel]);

  // Firebase Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setDbError(null);
        // Pull progress data from Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const cloudData = docSnap.data();
            setXp(cloudData.xp ?? 0);
            setStreak(cloudData.streak ?? 0);
            setQuizzesDone(cloudData.quizzesDone ?? 0);
            setCustomCards(cloudData.customCards ?? []);
          } else {
            // Initialize document on Firestore with current progress (0)
            await setDoc(userDocRef, {
              xp: 0,
              streak: 0,
              quizzesDone: 0,
              customCards: []
            });
            setXp(0);
            setStreak(0);
            setQuizzesDone(0);
            setCustomCards([]);
          }
          setIsCloudLoaded(true);
        } catch (err: any) {
          console.error('Firestore initial loading failed:', err);
          setDbError(err.message || 'Permission denied or Firestore configuration error');
        } finally {
          setAuthLoading(false);
        }
      } else {
        setCurrentUser(null);
        setIsCloudLoaded(false);
        setDbError(null);
        // Reset states for guest mode
        setXp(0);
        setStreak(0);
        setQuizzesDone(0);
        setCustomCards([]);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firebase Firestore Auto-Sync writer
  useEffect(() => {
    if (currentUser && isCloudLoaded) {
      const syncProgressToCloud = async () => {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await setDoc(userDocRef, {
            xp,
            streak,
            quizzesDone,
            customCards
          }, { merge: true });
        } catch (err: any) {
          console.error('Firestore autosync sync writing failed:', err);
          setDbError(err.message || 'Firestore autosync failed');
        }
      };
      syncProgressToCloud();
    }
  }, [xp, streak, quizzesDone, customCards, currentUser, isCloudLoaded]);

  // Handle active dates to compute streaks
  useEffect(() => {
    if (!currentUser) {
      setStreak(0);
      return;
    }
    const todayStr = new Date().toDateString();
    const lastActive = localStorage.getItem('nk_last_active_date');

    if (lastActive) {
      if (lastActive !== todayStr) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActive === yesterday.toDateString()) {
          setStreak(prev => prev + 1);
        } else {
          setStreak(1);
        }
        localStorage.setItem('nk_last_active_date', todayStr);
      }
    } else {
      localStorage.setItem('nk_last_active_date', todayStr);
    }
  }, [currentUser]);

  // Text-To-Speech function
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(voice => voice.lang.startsWith('ja'));
    if (jaVoice) utterance.voice = jaVoice;
    window.speechSynthesis.speak(utterance);
  };

  // User Actions rewards
  const addXp = (amount: number) => {
    if (!currentUser) return; // Only add XP for logged in users
    setXp(prev => prev + amount);
  };

  const handleAddCustomCard = (card: CustomCard) => {
    if (!currentUser) {
      alert("Registration required: Please create a Cloud Backup account or sign in under 'Cloud Backup' to save custom flashcards!");
      return;
    }
    setCustomCards(prev => [...prev, card]);
    addXp(15);
  };

  const handleRemoveCustomCard = (index: number) => {
    setCustomCards(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleFlashcardReview = (actionType: 'mastered' | 'review') => {
    if (!currentUser) return;
    if (actionType === 'mastered') {
      addXp(10);
    } else {
      addXp(2);
    }
  };

  const handleQuizComplete = (score: number, _total: number) => {
    if (!currentUser) return;
    setQuizzesDone(prev => prev + 1);
    addXp(score * 20);
  };

  const handleLevelChange = (lvl: Level) => {
    setCurrentLevel(lvl);
  };

  const handleAuthSuccess = (user: FirebaseUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsCloudLoaded(false);
    setDbError(null);
    setXp(0);
    setStreak(0);
    setQuizzesDone(0);
    setCustomCards([]);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'kanji', label: 'Kanji Study', icon: BookOpen },
    { id: 'vocab', label: 'Vocabulary', icon: Languages },
    { id: 'grammar', label: 'Grammar Guide', icon: FileText },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'quiz', label: 'Challenge Quiz', icon: Award },
    { id: 'jisho', label: 'Jisho Dictionary', icon: Search },
    { id: 'account', label: 'Cloud Backup', icon: Cloud },
    { id: 'about', label: 'About Nihonkana', icon: Info },
  ] as const;

  return (
    <div className="app-container">
      {/* Decorative Cyan Orb */}
      <div className="ambient-cyan-orb"></div>

      {/* Sidebar - Desktop */}
      <aside className="glass-panel desktop-sidebar" style={{
        width: '280px',
        padding: '30px 20px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: 'calc(100vh - 40px)',
        position: 'sticky',
        top: '20px',
        zIndex: 100,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: '4px',
            background: 'linear-gradient(to right, #00e5ff, #8e2de2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Nihonkana<span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600 }}>.moe</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            JAPANESE LEARNING SUITE
          </p>
        </div>

        {/* Level Switcher inside sidebar */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
            Current Level
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                style={{
                  padding: '6px 0',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  border: currentLevel === lvl ? '1px solid var(--primary)' : '1px solid transparent',
                  background: currentLevel === lvl ? 'rgba(142, 45, 226, 0.15)' : 'transparent',
                  color: currentLevel === lvl ? 'var(--text-main)' : 'var(--text-muted)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  background: isActive ? 'rgba(142, 45, 226, 0.1)' : 'transparent',
                  border: '1px solid transparent',
                  borderColor: isActive ? 'rgba(142, 45, 226, 0.2)' : 'transparent',
                  color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 400
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--primary)' : 'inherit' }} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Mini Profile widget */}
        {currentUser ? (
          <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: 800
            }}>
              {currentUser.email?.substring(0, 1).toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser.email}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={10} style={{ color: 'var(--warning)' }} />
                {xp} XP
                <span style={{ color: 'var(--success)', fontSize: '0.7rem' }}>• Synced</span>
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="glass-panel" 
            onClick={() => setActiveTab('account')}
            style={{ 
              padding: '12px 16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              background: 'rgba(255, 0, 127, 0.03)', 
              border: '1px dashed rgba(255, 0, 127, 0.3)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            <div style={{
              background: 'var(--accent)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 800
            }}>
              🔐
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)' }}>Guest Mode</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click to Sign In</div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Header navigation */}
      <header className="glass-panel mobile-header" style={{
        display: 'none',
        padding: '15px 20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 101,
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none'
      }}>
        <h1 style={{
          fontSize: '1.3rem',
          fontWeight: 800,
          background: 'linear-gradient(to right, #00e5ff, #8e2de2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Nihonkana.moe
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12} style={{ color: 'var(--warning)' }} />
            {currentUser ? `${xp} XP` : '🔒 Guest'}
          </div>
          <button 
            className="btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ padding: '6px', minWidth: 'auto' }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'fixed',
          top: '63px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 63px)',
          zIndex: 99,
          borderRadius: 0,
          border: 'none',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: 'var(--bg-dark)'
        }}>
          {/* Level Switcher (Mobile) */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Current Level
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => {
                    handleLevelChange(lvl);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    padding: '8px 0',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    border: currentLevel === lvl ? '1px solid var(--primary)' : '1px solid transparent',
                    background: currentLevel === lvl ? 'rgba(142, 45, 226, 0.15)' : 'transparent',
                    color: currentLevel === lvl ? 'var(--text-main)' : 'var(--text-muted)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn"
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    background: isActive ? 'rgba(142, 45, 226, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(142, 45, 226, 0.2)' : 'none',
                    color: isActive ? 'var(--text-main)' : 'var(--text-muted)'
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main View Area */}
      <main className="main-content">
        {authLoading ? (
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
            <Loader2 className="animate-spin neon-text-primary" size={36} style={{ margin: '0 auto 15px auto' }} />
            <p>Initializing cloud settings...</p>
          </div>
        ) : (
          <>
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {dbError && (
                  <div className="glass-panel" style={{ 
                    padding: '20px', 
                    borderLeft: '4px solid var(--accent)', 
                    background: 'rgba(255, 0, 127, 0.05)',
                    boxShadow: '0 0 15px rgba(255, 0, 127, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '6px' }}>⚠️ Firestore Sync Configuration Notice</h4>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.45 }}>
                      Firebase Firestore is returning errors: <strong>{dbError}</strong>. 
                      To enable database progress synchronization, please verify that:
                    </p>
                    <ol style={{ marginTop: '8px', paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li>You have enabled the <strong>Firestore Database</strong> in your Firebase Console (Build -&gt; Firestore Database).</li>
                      <li>Your Security Rules allow read/write access. You can publish these rules in the console:</li>
                    </ol>
                    <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', marginTop: '10px', fontSize: '0.8rem', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-main)', fontFamily: 'monospace' }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`}
                    </pre>
                  </div>
                )}

                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                  <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }} className="neon-text-cyan">
                      こんにちは, Study partner!
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                      Ready to conquer your {currentLevel} Japanese training today?
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }} className="level-badge-container">
                    <span className={`level-badge level-${currentLevel.toLowerCase()}`} style={{ fontSize: '1rem', padding: '8px 16px', borderRadius: '12px' }}>
                      Active Level: {currentLevel}
                    </span>
                  </div>
                </div>

                {/* Statistics Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    <div style={{ background: 'rgba(255, 234, 0, 0.1)', padding: '12px', borderRadius: '12px' }}>
                      <Zap size={24} style={{ color: 'var(--warning)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Experience Points</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        {currentUser ? `${xp} XP` : 'Locked 🔒'}
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    <div style={{ background: 'rgba(255, 0, 127, 0.1)', padding: '12px', borderRadius: '12px' }}>
                      <Flame size={24} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Streak</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        {currentUser ? `${streak} ${streak === 1 ? 'day' : 'days'}` : 'Locked 🔒'}
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '12px', borderRadius: '12px' }}>
                      <Layers size={24} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Custom Flashcards</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        {currentUser ? `${customCards.length} Cards` : 'Locked 🔒'}
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                    <div style={{ background: 'rgba(0, 230, 118, 0.1)', padding: '12px', borderRadius: '12px' }}>
                      <Award size={24} style={{ color: 'var(--success)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Quizzes Mastered</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        {currentUser ? `${quizzesDone} Done` : 'Locked 🔒'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {/* Daily Kanji Practice */}
                  <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BookOpen size={20} className="neon-text-primary" />
                        Interactive Kanji Canvas
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        Practice stroke orders with real-time feedback using an HTML5 interactive writing drawing canvas pad. Select a Kanji to trace!
                      </p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setActiveTab('kanji')}>
                      Start Tracing
                    </button>
                  </div>

                  {/* Jisho Search promo */}
                  <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Search size={20} className="neon-text-cyan" />
                        Jisho Dictionary Import
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        Search definitions via live Jisho API and click imports to sync words directly to your review deck.
                      </p>
                    </div>
                    <button className="btn btn-cyan" onClick={() => setActiveTab('jisho')}>
                      Open Dictionary
                    </button>
                  </div>
                </div>

                {/* Cloud backup promo */}
                {!currentUser && (
                  <div className="glass-panel" style={{ 
                    padding: '25px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    gap: '20px', 
                    flexWrap: 'wrap', 
                    borderLeft: '4px solid var(--accent)',
                    background: 'rgba(255, 0, 127, 0.04)',
                    boxShadow: '0 0 15px rgba(255, 0, 127, 0.1)'
                  }}>
                    <div>
                      <h4 style={{ fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Cloud size={18} style={{ color: 'var(--accent)' }} className="pulse-glow" />
                        Sign In Required for Progress Tracking
                      </h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        You are browsing in Guest Mode. Register or log in to sync experience points (XP), learning streaks, custom decks, and quiz scores.
                      </p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setActiveTab('account')} style={{ background: 'var(--accent)' }}>
                      Log In / Sign Up
                    </button>
                  </div>
                )}

                {/* Study Tips */}
                <div className="glass-panel" style={{ padding: '25px', borderLeft: '4px solid var(--secondary)' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <Sparkles size={24} style={{ color: 'var(--secondary)' }} />
                    <div>
                      <h4 style={{ fontWeight: 600, marginBottom: '4px' }}>Learning tip for today</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.45 }}>
                        Spaced Repetition works best when done consistently. Even checking just 5 cards on your daily review deck boosts retention rate by up to 80% over passive reading. Keep that flame streak going!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KANJI STUDY TAB */}
            {activeTab === 'kanji' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <h2 className="neon-text-primary">Kanji Writing Practice ({currentLevel})</h2>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  {/* Left Column: List of Kanji for Level */}
                  <div style={{ 
                    flex: '1 1 340px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '15px', 
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '20px',
                    maxHeight: '680px',
                    overflowY: 'auto',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
                  }}>
                    {/* Sticky Kanji Search Bar */}
                    <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-dark)', paddingBottom: '10px' }}>
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Search Kanji character or meaning..." 
                        value={kanjiSearch}
                        onChange={(e) => setKanjiSearch(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {loadingData ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                          <Loader2 className="animate-spin var(--primary)" size={24} style={{ margin: '0 auto' }} />
                        </div>
                      ) : (() => {
                        const filteredKanji = kanjiList.filter(k => 
                          k.character.includes(kanjiSearch) || 
                          k.meanings.some((m: string) => m.toLowerCase().includes(kanjiSearch.toLowerCase())) ||
                          k.onyomi.some((o: string) => o.includes(kanjiSearch)) ||
                          k.kunyomi.some((ku: string) => ku.includes(kanjiSearch))
                        );

                        if (filteredKanji.length === 0) {
                          return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No kanji matches found.</div>;
                        }

                        return filteredKanji.slice(0, visibleKanjiCount).map(k => {
                          const isSelected = selectedKanji?.id === k.id;
                          return (
                            <div 
                              key={k.id} 
                              onClick={() => setSelectedKanji(k)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '12px 16px',
                                cursor: 'pointer',
                                transition: 'var(--transition-smooth)',
                                background: isSelected ? 'rgba(142, 45, 226, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                                border: isSelected ? '1.5px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                boxShadow: isSelected ? '0 0 15px rgba(142, 45, 226, 0.2)' : 'none',
                              }}
                            >
                              <div className="jp-font" style={{ 
                                fontSize: '1.8rem', 
                                fontWeight: 800, 
                                color: isSelected ? 'var(--secondary)' : 'var(--text-main)',
                                width: '45px',
                                textAlign: 'center'
                              }}>
                                {k.character}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ 
                                  fontWeight: 600, 
                                  fontSize: '0.9rem', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis', 
                                  whiteSpace: 'nowrap',
                                  color: isSelected ? 'var(--secondary)' : 'var(--text-main)'
                                }}>
                                  {k.meanings.join(', ')}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                  {k.onyomi.length > 0 && <span>音: {k.onyomi[0]}</span>}
                                  {k.kunyomi.length > 0 && <span>訓: {k.kunyomi[0]}</span>}
                                </div>
                              </div>
                              <div style={{ 
                                fontSize: '0.7rem', 
                                color: 'var(--text-muted)', 
                                background: 'rgba(255,255,255,0.05)', 
                                padding: '2px 6px', 
                                borderRadius: '4px',
                                border: '1px solid rgba(255,255,255,0.02)'
                              }}>
                                {k.strokes}画
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {!loadingData && (() => {
                      const filteredLength = kanjiList.filter(k => 
                        k.character.includes(kanjiSearch) || 
                        k.meanings.some((m: string) => m.toLowerCase().includes(kanjiSearch.toLowerCase())) ||
                        k.onyomi.some((o: string) => o.includes(kanjiSearch)) ||
                        k.kunyomi.some((ku: string) => ku.includes(kanjiSearch))
                      ).length;

                      return filteredLength > visibleKanjiCount ? (
                        <button 
                          className="btn btn-primary" 
                          onClick={() => setVisibleKanjiCount(prev => prev + 50)}
                          style={{ justifyContent: 'center', marginTop: '10px' }}
                        >
                          Load More Kanji ({filteredLength - visibleKanjiCount} remaining)
                        </button>
                      ) : null;
                    })()}
                  </div>

                  {/* Right Column: Interactive Tracing Sandbox */}
                  <div style={{ flex: '1.2 1 400px' }}>
                    {selectedKanji ? (
                      <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px' }}>
                          <div>
                            <h3 className="jp-font" style={{ fontSize: '2rem', fontWeight: 800, display: 'inline-block', marginRight: '10px' }}>
                              {selectedKanji.character}
                            </h3>
                            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                              {selectedKanji.strokes} strokes
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {customCards.some(card => card.front === selectedKanji.character) ? (
                              <button
                                className="btn"
                                onClick={() => handleRemoveCustomCard(customCards.findIndex(card => card.front === selectedKanji.character))}
                                style={{
                                  background: 'rgba(255, 0, 127, 0.05)',
                                  borderColor: 'rgba(255, 0, 127, 0.2)',
                                  color: 'var(--accent)',
                                  fontSize: '0.75rem',
                                  padding: '4px 8px'
                                }}
                              >
                                Remove Card
                              </button>
                            ) : (
                              <button
                                className="btn btn-cyan"
                                onClick={() => {
                                  handleAddCustomCard({
                                    front: selectedKanji.character,
                                    reading: selectedKanji.onyomi.concat(selectedKanji.kunyomi).filter(Boolean).join(', '),
                                    back: selectedKanji.meanings.join(', ')
                                  });
                                }}
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '4px 8px'
                                }}
                              >
                                <Plus size={12} /> Add Card
                              </button>
                            )}
                            <span className={`level-badge level-${selectedKanji.level.toLowerCase()}`}>{selectedKanji.level}</span>
                          </div>
                        </div>

                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                          <div style={{ marginBottom: '8px' }}>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Meanings:</strong>
                            <div style={{ fontSize: '1rem', marginTop: '2px' }}>{selectedKanji.meanings.join(', ')}</div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Onyomi:</strong>
                              <div className="jp-font" style={{ color: 'var(--secondary)' }}>{selectedKanji.onyomi.join(', ') || 'None'}</div>
                            </div>
                            <div>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Kunyomi:</strong>
                              <div className="jp-font" style={{ color: 'var(--accent)' }}>{selectedKanji.kunyomi.join(', ') || 'None'}</div>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                          {/* Stroke drawing Canvas */}
                          <KanjiCanvas kanjiChar={selectedKanji.character} />
                        </div>
                      </div>
                    ) : (
                      <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <BookOpen size={40} style={{ marginBottom: '15px', opacity: 0.5 }} />
                        <p style={{ fontSize: '1.1rem' }}>Select a Kanji from the list to view brush guides and practice tracing.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VOCAB STUDY TAB */}
            {activeTab === 'vocab' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                  <h2 className="neon-text-primary">Vocabulary Guide ({currentLevel})</h2>
                  <div style={{ width: '300px' }}>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Search vocabulary..." 
                      value={vocabSearch}
                      onChange={(e) => setVocabSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {loadingData ? (
                    <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
                      <Loader2 className="animate-spin neon-text-primary" size={32} style={{ margin: '0 auto 10px auto' }} />
                      <p>Loading level vocabulary...</p>
                    </div>
                  ) : (() => {
                    const filteredVocab = vocabList.filter(v => {
                      const wordMatch = v.word?.includes(vocabSearch);
                      const readingMatch = v.reading?.includes(vocabSearch);
                      const meaningMatch = v.meanings?.some((m: string) => m.toLowerCase().includes(vocabSearch.toLowerCase()));
                      return wordMatch || readingMatch || meaningMatch;
                    });

                    if (filteredVocab.length === 0) {
                      return (
                        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No vocabulary words found matching your search.
                        </div>
                      );
                    }

                    return filteredVocab.slice(0, visibleVocabCount).map(v => {
                      const displayReading = v.reading || v.word;
                      const displayKanji = (v.word && v.word !== v.reading) ? v.word : null;

                      return (
                        <div key={v.id} className="glass-panel" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                              <span className="jp-font" style={{ fontSize: '1.6rem', fontWeight: 700 }}>{displayReading}</span>
                              {displayKanji && (
                                <span className="jp-font" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>[{displayKanji}]</span>
                              )}
                              <span className="level-badge" style={{ fontSize: '0.75rem', background: 'rgba(142, 45, 226, 0.08)' }}>
                                {v.partOfSpeech}
                              </span>
                            </div>

                            <div style={{ fontSize: '1rem', marginBottom: '12px' }}>
                              {v.meanings.join(', ')}
                            </div>

                            <div style={{ paddingLeft: '10px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                              <div className="jp-font" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{v.example.sentence}</div>
                              <div className="jp-font" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.7 }}>{v.example.reading}</div>
                              <div style={{ fontSize: '0.85rem', marginTop: '2px' }}>{v.example.translation}</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button 
                              className="btn" 
                              onClick={() => speakText(v.word || v.reading)}
                              title="Listen Pronunciation"
                              style={{ padding: '10px 14px' }}
                            >
                              <Volume2 size={16} />
                              Listen
                            </button>
                            {customCards.some(card => card.front === v.word) ? (
                              <button
                                className="btn"
                                onClick={() => handleRemoveCustomCard(customCards.findIndex(card => card.front === v.word))}
                                style={{
                                  background: 'rgba(255, 0, 127, 0.05)',
                                  borderColor: 'rgba(255, 0, 127, 0.2)',
                                  color: 'var(--accent)',
                                  padding: '10px 14px'
                                }}
                              >
                                Remove Card
                              </button>
                            ) : (
                              <button
                                className="btn btn-cyan"
                                onClick={() => {
                                  handleAddCustomCard({
                                    front: v.word,
                                    reading: v.reading || '',
                                    back: v.meanings.join(', ')
                                  });
                                }}
                                style={{ padding: '10px 14px' }}
                              >
                                <Plus size={16} />
                                Add Card
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}

                  {!loadingData && (() => {
                    const filteredLength = vocabList.filter(v => {
                      const wordMatch = v.word?.includes(vocabSearch);
                      const readingMatch = v.reading?.includes(vocabSearch);
                      const meaningMatch = v.meanings?.some((m: string) => m.toLowerCase().includes(vocabSearch.toLowerCase()));
                      return wordMatch || readingMatch || meaningMatch;
                    }).length;

                    return filteredLength > visibleVocabCount ? (
                      <button 
                        className="btn btn-primary" 
                        onClick={() => setVisibleVocabCount(prev => prev + 50)}
                        style={{ alignSelf: 'center', marginTop: '20px', minWidth: '220px', justifyContent: 'center' }}
                      >
                        Load More Words ({filteredLength - visibleVocabCount} remaining)
                      </button>
                    ) : null;
                  })()}
                </div>
              </div>
            )}

            {/* GRAMMAR STUDY TAB */}
            {activeTab === 'grammar' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                  <h2 className="neon-text-primary">Grammar Structures ({currentLevel})</h2>
                  <div style={{ width: '300px' }}>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Search grammar pattern or meaning..." 
                      value={grammarSearch}
                      onChange={(e) => setGrammarSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  {(() => {
                    const filteredGrammar = grammarData
                      .filter(g => g.level === currentLevel)
                      .filter(g => 
                        g.pattern.includes(grammarSearch) || 
                        g.meaning.toLowerCase().includes(grammarSearch.toLowerCase()) ||
                        g.explanation.toLowerCase().includes(grammarSearch.toLowerCase())
                      );

                    if (filteredGrammar.length === 0) {
                      return (
                        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No grammar structures found matching your search.
                        </div>
                      );
                    }

                    return filteredGrammar.map(g => (
                      <div key={g.id} className="glass-panel" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '16px' }}>
                          <div>
                            <h3 className="jp-font" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--secondary)' }}>
                              {g.pattern}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2px' }}>{g.structure}</p>
                          </div>
                          <span className="level-badge" style={{ background: 'rgba(0, 229, 255, 0.1)', color: 'var(--secondary)' }}>{g.meaning}</span>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                            Explanation:
                          </strong>
                          <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-main)' }}>
                            {g.explanation}
                          </p>
                        </div>

                        <div>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                            Examples:
                          </strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {g.examples.map((ex, idx) => (
                              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                                <div className="jp-font" style={{ fontWeight: 600, fontSize: '1rem' }}>{ex.sentence}</div>
                                <div className="jp-font" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 4px 0' }}>{ex.reading}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{ex.translation}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

            {/* FLASHCARDS TAB */}
            {activeTab === 'flashcards' && (
              <FlashcardsView 
                customCards={customCards} 
                onCardAction={handleFlashcardReview} 
                vocabList={vocabList}
                kanjiList={kanjiList}
                currentLevel={currentLevel}
                onLevelChange={handleLevelChange}
                onRemoveCustomCard={handleRemoveCustomCard}
              />
            )}

            {/* QUIZ TAB */}
            {activeTab === 'quiz' && (
              <QuizView 
                onQuizComplete={handleQuizComplete} 
                vocabList={vocabList}
                kanjiList={kanjiList}
                currentLevel={currentLevel}
                onLevelChange={handleLevelChange}
                isLoggedIn={currentUser !== null}
              />
            )}

            {/* JISHO DICTIONARY TAB */}
            {activeTab === 'jisho' && (
              <DictionarySearch 
                onAddCustomCard={handleAddCustomCard} 
                onRemoveCustomCard={handleRemoveCustomCard}
                savedCards={customCards} 
              />
            )}

            {/* ACCOUNT/CLOUDBACKUP TAB */}
            {activeTab === 'account' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {dbError && (
                  <div className="glass-panel" style={{ 
                    padding: '20px', 
                    borderLeft: '4px solid var(--accent)', 
                    background: 'rgba(255, 0, 127, 0.05)',
                    boxShadow: '0 0 15px rgba(255, 0, 127, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '6px' }}>⚠️ Firestore Sync Configuration Notice</h4>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.45 }}>
                      Firebase Firestore is returning errors: <strong>{dbError}</strong>. 
                      To enable database progress synchronization, please verify that:
                    </p>
                    <ol style={{ marginTop: '8px', paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li>You have enabled the <strong>Firestore Database</strong> in your Firebase Console (Build -&gt; Firestore Database).</li>
                      <li>Your Security Rules allow read/write access. You can publish these rules in the console:</li>
                    </ol>
                    <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', marginTop: '10px', fontSize: '0.8rem', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-main)', fontFamily: 'monospace' }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`}
                    </pre>
                  </div>
                )}

                <AuthView 
                  currentUser={currentUser}
                  onAuthSuccess={handleAuthSuccess}
                  onLogout={handleLogout}
                  xp={xp}
                />
              </div>
            )}

            {/* ABOUT NIHONKANA TAB */}
            {activeTab === 'about' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <h2 className="neon-text-primary">About Nihonkana</h2>

                <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
                  {/* Overview */}
                  <div>
                    <h3 className="neon-text-cyan" style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '12px' }}>
                      Nihonkana Japanese Learning Suite
                    </h3>
                    <p style={{ color: 'var(--text-main)', lineHeight: 1.65, fontSize: '1.05rem' }}>
                      Nihonkana.moe is a premium, open-source educational platform designed for students preparing for the Japanese Language Proficiency Test (JLPT) from levels N5 to N1. Built with a futuristic dark-cyberpunk neon aesthetic and smooth glassmorphism, Nihonkana combines comprehensive data reference with interactive learning tools.
                    </p>
                  </div>

                  <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />

                  {/* Core Features */}
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '15px' }}>
                      🔑 Core Features & Modules
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <h5 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', fontSize: '0.95rem' }}>🖌️ Interactive Kanji Canvas</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.45 }}>
                          Trace Kanji brush strokes on an HTML5 interactive writing pad. Select any Kanji from N5-N1 to study its meanings, Onyomi/Kunyomi readings, and stroke counts.
                        </p>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <h5 style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '6px', fontSize: '0.95rem' }}>🔊 Vocabulary Guide & TTS</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.45 }}>
                          Browse thousands of vocabulary entries with example sentences. Trigger native Japanese speech synthesis (TTS) to hear correct pronunciations with a single click.
                        </p>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <h5 style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '6px', fontSize: '0.95rem' }}>📝 Detailed Grammar Guide</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.45 }}>
                          Master 75 comprehensive grammar structures (15 per level) detailing meaning nuances, sentence construction patterns, and multiple examples.
                        </p>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <h5 style={{ fontWeight: 600, color: 'var(--success)', marginBottom: '6px', fontSize: '0.95rem' }}>🗃️ Spaced-Repetition Decks</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.45 }}>
                          Learn dynamically using standard 3D flip card mechanics. Rate card difficulty to optimize spaced-repetition intervals.
                        </p>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <h5 style={{ fontWeight: 600, color: 'var(--warning)', marginBottom: '6px', fontSize: '0.95rem' }}>🏆 Challenge Quiz Module</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.45 }}>
                          Test your level skills! Customize your topic and quiz length (up to 20 Qs) and track your results with score metrics and confetti rewards.
                        </p>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <h5 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '6px', fontSize: '0.95rem' }}>⚡ Concurrent Jisho Search</h5>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.45 }}>
                          Query Jisho.org concurrently across multiple CORS proxies in parallel for sub-500ms lookups. Instantly import definitions to your study decks.
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />

                  {/* Credits & Open Source */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '10px' }}>
                        📦 Open Datasets
                      </h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        Nihonkana is powered by excellent community-maintained open-source datasets:
                      </p>
                      <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <li>Vocabulary data sourced from <a href="https://github.com/wkei/jlpt-vocab-api" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>wkei/jlpt-vocab-api</a></li>
                        <li>Kanji readings & stroke counts from <a href="https://github.com/davidluzgouveia/kanji-data" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>davidluzgouveia/kanji-data</a></li>
                        <li>Live dictionary integrations courtesy of the official <a href="https://jisho.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Jisho.org API</a></li>
                      </ul>
                    </div>

                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '10px' }}>
                        🛠️ Technology Stack
                      </h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        Designed as a high-performance, responsive Single Page Application (SPA):
                      </p>
                      <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <li>Framework: <strong>React 19 + TypeScript + Vite</strong></li>
                        <li>Database: <strong>Cloud Firestore</strong> (synced via Firebase SDK)</li>
                        <li>Auth: <strong>Firebase Authentication</strong></li>
                        <li>Styling: <strong>CSS variables, Glassmorphism grid layouts</strong></li>
                        <li>Icons: <strong>Lucide React</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Styles for handling sidebars on mobile vs desktop */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
