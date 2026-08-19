import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC5wRn9I9x9-HjWfv29j_lIzHK06DfR5bc",
  authDomain: "wtc-project-e36a8.firebaseapp.com",
  projectId: "wtc-project-e36a8",
  storageBucket: "wtc-project-e36a8.firebasestorage.app",
  messagingSenderId: "368797693253",
  appId: "1:368797693253:web:f123daf483f316e8aefa2c",
  measurementId: "G-C1WMP9YC8S",
};

export const firebaseConfigured = Object.values(firebaseConfig).every(Boolean);
const app = firebaseConfigured ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export const analytics = app && typeof window !== "undefined"
  ? isSupported().then((supported) => (supported ? getAnalytics(app) : null))
  : Promise.resolve(null);
export default app;
