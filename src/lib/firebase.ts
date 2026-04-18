import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4BsfFQYODkKT1siP2L3Y7okXoHTMvezA",
  authDomain: "arizona-structural-experts.firebaseapp.com",
  projectId: "arizona-structural-experts",
  storageBucket: "arizona-structural-experts.firebasestorage.app",
  messagingSenderId: "61538639359",
  appId: "1:61538639359:web:9e4e7f3a7e5fbe750adbca",
  measurementId: "G-2CEGRR3QDQ",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
