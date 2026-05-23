import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';
import { LogIn, UserPlus, LogOut, Loader2, Sparkles, Award, Flame, Layers } from 'lucide-react';

interface AuthViewProps {
  currentUser: User | null;
  onAuthSuccess: (user: User) => void;
  onLogout: () => void;
  xp: number;
}

export const AuthView: React.FC<AuthViewProps> = ({ currentUser, onAuthSuccess, onLogout, xp }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onAuthSuccess(userCredential.user);
        setSuccess('Account created successfully! Cloud sync is now active.');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess(userCredential.user);
        setSuccess('Logged in successfully!');
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = 'Authentication failed. Please check your credentials.';
      const errCode = err.code || '';
      const errMessage = err.message || '';

      if (errCode === 'auth/email-already-in-use') {
        errMsg = 'This email is already in use.';
      } else if (errCode === 'auth/wrong-password' || errCode === 'auth/user-not-found') {
        errMsg = 'Invalid email or password.';
      } else if (errCode === 'auth/weak-password') {
        errMsg = 'Password should be at least 6 characters.';
      } else if (errCode === 'auth/invalid-email') {
        errMsg = 'Invalid email address format.';
      } else if (errCode === 'auth/configuration-not-found' || errMessage.includes('configuration-not-found')) {
        errMsg = 'Firebase Setup Error: The Email/Password provider is not enabled in your Firebase console. Please go to your Firebase Console -> Build -> Authentication -> Sign-in Method, and enable the Email/Password provider.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      onLogout();
      setSuccess('Logged out successfully.');
    } catch (err) {
      console.error(err);
      setError('Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: currentUser ? '480px' : '960px', margin: '0 auto', width: '100%' }}>
      {currentUser ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <Sparkles size={48} className="neon-text-cyan" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '15px' }} className="neon-text-cyan">
            Cloud Sync Active
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Logged in as <strong style={{ color: 'var(--text-main)' }}>{currentUser.email}</strong>
          </p>
          <div className="glass-panel" style={{ padding: '15px', background: 'rgba(0, 229, 255, 0.05)', marginBottom: '30px', fontSize: '0.9rem' }}>
            Your XP ({xp} XP), daily learning streaks, and custom flashcards are synchronized to the Firebase cloud database.
          </div>
          <button 
            className="btn" 
            onClick={handleLogout} 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', gap: '10px' }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
            Log Out Session
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px', 
          alignItems: 'center',
          padding: '20px 0'
        }}>
          {/* Left Column: Cloud sync benefits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' }}>
            <div>
              <h2 className="neon-text-cyan" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                Nihonkana Cloud
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.55, fontSize: '0.95rem' }}>
                Create a cloud sync account to back up and synchronize your Japanese learning stats. Save vocabulary lists, preserve streaks, and track XP across devices!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(255, 234, 0, 0.1)', padding: '10px', borderRadius: '10px', color: 'var(--warning)', display: 'flex', alignItems: 'center' }}>
                  <Award size={18} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }}>XP & Level Progression</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                    Gain XP for reviewed flashcards and correct quiz answers. Complete challenges to rank up.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(255, 0, 127, 0.1)', padding: '10px', borderRadius: '10px', color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
                  <Flame size={18} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }}>Daily Active Streaks</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                    Track and preserve your active study streaks. Study daily to keep the fire going!
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '10px', borderRadius: '10px', color: 'var(--secondary)', display: 'flex', alignItems: 'center' }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }}>Custom Study Decks</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                    Save custom dictionary definitions directly to your flashcard decks from Jisho lookup.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Auth Form */}
          <div className="glass-panel" style={{ padding: '40px', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              <button 
                className={`btn ${!isSignUp ? 'glass-panel-active neon-text-primary' : ''}`}
                onClick={() => { setIsSignUp(false); setError(null); }}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Log In
              </button>
              <button 
                className={`btn ${isSignUp ? 'glass-panel-active neon-text-primary' : ''}`}
                onClick={() => { setIsSignUp(true); setError(null); }}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Sign Up
              </button>
            </div>

            <h3 className="neon-text-primary" style={{ marginBottom: '20px', textAlign: 'center' }}>
              {isSignUp ? 'Create Nihonkana Account' : 'Welcome Back'}
            </h3>

            {error && (
              <div className="glass-panel" style={{ padding: '12px 15px', marginBottom: '20px', borderLeft: '4px solid var(--accent)', background: 'rgba(255, 0, 127, 0.05)', fontSize: '0.9rem' }}>
                <p style={{ color: 'var(--accent)' }}>{error}</p>
              </div>
            )}

            {success && (
              <div className="glass-panel" style={{ padding: '12px 15px', marginBottom: '20px', borderLeft: '4px solid var(--success)', background: 'rgba(0, 230, 118, 0.05)', fontSize: '0.9rem' }}>
                <p style={{ color: 'var(--success)' }}>{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Password
                </label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '12px' }}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isSignUp ? (
                  <>
                    <UserPlus size={18} />
                    Register Account
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Access Dashboard
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
