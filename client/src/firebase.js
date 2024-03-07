// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-jallu-dev.firebaseapp.com",
  projectId: "mern-estate-jallu-dev",
  storageBucket: "mern-estate-jallu-dev.appspot.com",
  messagingSenderId: "591963844657",
  appId: "1:591963844657:web:53bc877e69404e46642510",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
