import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvqlBEatyXpPHJGjfFeaCg4_rG2iBOh7A",
  authDomain: "costume-catalog.firebaseapp.com",
  projectId: "costume-catalog",
  storageBucket: "costume-catalog.firebasestorage.app",
  messagingSenderId: "494925364385",
  appId: "1:494925364385:web:c77637f70daa1f1d0344e0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
