import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOtDKquCApioYgmXDawUkY_aV4eAVRO2s",
  authDomain: "baby-typewriting-institute-0.firebaseapp.com",
  databaseURL: "https://baby-typewriting-institute-0-default-rtdb.firebaseio.com",
  projectId: "baby-typewriting-institute-0",
  storageBucket: "baby-typewriting-institute-0.appspot.com",
  messagingSenderId: "1094138411569",
  appId: "1:1094138411569:web:0232df186287bb9e747310",
  measurementId: "G-P0Z2D32JWJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);