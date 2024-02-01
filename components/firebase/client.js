// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqYlGjxwML-l-r5inFkeX7WLLizAWa5hg",
  authDomain: "image-thrower.firebaseapp.com",
  projectId: "image-thrower",
  storageBucket: "image-thrower.appspot.com",
  messagingSenderId: "734105557616",
  appId: "1:734105557616:web:2ea28e1797be57221c72b5",
  measurementId: "G-VX92MNBRLH"
};

// Initialize Firebase

export let firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export function initFirebase() {
  firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  
}
// const analytics = getAnalytics(firebaseApp);