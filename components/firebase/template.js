//firebaseConfigの値を書き換えて、このファイルをclient.jsとして保存してください。

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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
export let firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase
export function initFirebase() {
  firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
}
// const analytics = getAnalytics(firebaseApp);