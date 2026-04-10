import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDMSLRFTa_onXrsAlfujM5RKhbE5XnNYdU",
  authDomain: "cprg303-firebase-52c43.firebaseapp.com",
  projectId: "cprg303-firebase-52c43",
  storageBucket: "cprg303-firebase-52c43.firebasestorage.app",
  messagingSenderId: "282509144493",
  appId: "1:282509144493:web:8f9c201cdc2f70fc9c3124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
