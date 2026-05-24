# [Nihonkana.moe](https://japanese-learning-website-lime.vercel.app/) 🌐🏮

Nihonkana.moe is a high-fidelity, open-source Japanese language learning suite designed for students studying for the Japanese Language Proficiency Test (JLPT) from levels N5 to N1. Styled in a futuristic dark-cyberpunk neon aesthetic with premium glassmorphic UI components, Nihonkana merges comprehensive grammar/vocabulary databases with interactive learning engines.

---

## 🚀 Key Features

* **🖌️ Interactive Kanji Canvas**: Practice writing Kanji strokes on an HTML5 canvas drawing pad. Select any Kanji from N5-N1 to review its meaning, Onyomi/Kunyomi readings, stroke counts, and trace the stroke order guide.
* **🔊 Vocabulary Roster & TTS Speech**: Review thousands of vocabulary entries categorized by JLPT level. Includes Hiragana-first formatting (Kanji shown in brackets, e.g., `がくせい [学生]`), example sentences with kana readings, and interactive Text-to-Speech (TTS) pronunciation.
* **📝 Detailed Grammar Guide**: Study 75 hand-crafted grammar patterns (15 entries per JLPT level N5-N1) complete with grammar connection formulas, usage explanations, and multiple bilingual examples.
* **⚡ Concurrent Jisho Search**: Search dictionary entries in real-time. Lookups run concurrently in parallel across multiple CORS proxies, yielding sub-500ms responses. Instantly import Jisho results into your custom flashcard deck.
* **🗃️ Spaced-Repetition (SRS) Flashcards**: Create your own custom review deck or study level vocabulary using standard 3D flip card animations. Mark cards as Mastered or Review to earn XP and optimize retention intervals.
* **🏆 Configurable Challenge Quizzes**: Test vocabulary, Kanji, and grammar per level. Customize question volume (up to 20 questions) and earn XP with live results evaluation and neon confetti celebrations.
* **☁️ Firebase Cloud Progress Backup**: Register an account in the split-screen authentication portal to sync your active daily streak, experience points (XP), quizzes completed count, and custom flashcard decks automatically.

---

## 🛠️ Technology Stack & Credits

### Tech Stack
* **Framework**: React 19 + TypeScript + Vite (compiled via Rolldown/ESBuild)
* **Database & Auth**: Google Firebase SDK (Authentication & Cloud Firestore)
* **Styling**: Modern Vanilla CSS Variables (cyberpunk neon accents, glassmorphic filters, keyframe micro-animations)
* **Icons**: Lucide React
* **Effects**: Canvas Confetti

### Dataset & API Credits
* **Vocabulary Data**: Sourced from [wkei/jlpt-vocab-api](https://github.com/wkei/jlpt-vocab-api)
* **Kanji Readings & Strokes**: Sourced from [davidluzgouveia/kanji-data](https://github.com/davidluzgouveia/kanji-data)
* **Dictionary Service**: Live lookup powered by the official [Jisho.org API](https://jisho.org/)

---

## 📦 Installation & Local Setup

Ensure you have **Node.js** (v18+) and **npm** installed.

1. **Clone the repository & enter the folder**:
   ```bash
   git clone https://github.com/Varomine/Japanese-Learning-website
   cd Japanese-Learning-website
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   *The server will boot, hosting the app locally (typically at `http://localhost:5173/` or `http://localhost:5174/`).*

4. **Build the production bundle**:
   ```bash
   npm run build
   ```
   *Generates fully optimized asset files inside the `/dist` directory.*

---

## 🔥 Firebase Cloud Configuration

Nihonkana.moe uses Firebase to sync study metrics. To link your own database backend:

### 1. Update Firebase Config File
Open [src/firebase.ts](file:///C:/Users/USER/.gemini/antigravity/scratch/nihonkana-moe/src/firebase.ts) and configure your web application secrets:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Configure Firebase Authentication
1. Go to the **Firebase Console** -> **Build** -> **Authentication**.
2. Click **Get Started**, choose **Sign-in method**, and enable **Email/Password**.

### 3. Deploy Cloud Firestore Rules
1. Go to **Firebase Console** -> **Build** -> **Firestore Database** and create a database instance.
2. Under the **Rules** tab, paste the following security rules and click **Publish**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
---
If there is firebase [ERROR](https://ibb.co/TBDMVN4N) but you are sure that you are doing everythin correctly just refresh the screen after ~1min. After hosting website. And everything should be alright
