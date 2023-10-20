// Firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SERVER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Authentication
firebaseApp.auth = getAuth(firebaseApp)
firebaseApp.auth.setPersistence(browserLocalPersistence).then(_ => {}) // Session stays in LocalStorage until user logs out


export {
    firebaseApp
}
