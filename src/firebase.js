// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
 import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJhVIIaZmPMpVKz-CvsiKzD0e8096APMc",
  authDomain: "chat-875da.firebaseapp.com",
  projectId: "chat-875da",
  storageBucket: "chat-875da.appspot.com",
  messagingSenderId: "836661846070",
  appId: "1:836661846070:web:2fcc0126b4cb33d1397897",
  measurementId: "G-VD95TNZY8S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const storage = getStorage();
export const db = getFirestore()

