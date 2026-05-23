import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAG6wdI0M6FCusCUvOwGz_Ke-DuTGnn4gM",
  authDomain: "nohinkana.firebaseapp.com",
  projectId: "nohinkana",
  storageBucket: "nohinkana.firebasestorage.app",
  messagingSenderId: "783397660610",
  appId: "1:783397660610:web:3972585a8926a29f8d985b",
  measurementId: "G-4F1KD7CF7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
