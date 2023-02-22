import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDzSOKOxpXzufYgeevKn0RUyCyJKVZ4pjo",
  authDomain: "linkedin-clone-21f7c.firebaseapp.com",
  projectId: "linkedin-clone-21f7c",
  storageBucket: "linkedin-clone-21f7c.appspot.com",
  messagingSenderId: "930653503763",
  appId: "1:930653503763:web:2c21830065bda388ff5ae6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)