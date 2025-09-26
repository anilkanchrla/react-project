
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAzf-ntQlmZar9FszeGv9GLZzpyU0Cb-8Q",
  authDomain: "you-miss-home-food.firebaseapp.com",
  projectId: "you-miss-home-food",
  storageBucket: "you-miss-home-food.firebasestorage.app",
  messagingSenderId: "1066120404714",
  appId: "1:1066120404714:web:8b1961318f4b7ceece0193",
  measurementId: "G-LS96DLYE4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = getStorage(app);