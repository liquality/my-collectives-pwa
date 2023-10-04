// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXOkChzAbJHaKOx5uPCsYDjRYVKKXhqB4",
  authDomain: "group-mints.firebaseapp.com",
  projectId: "group-mints",
  storageBucket: "group-mints.appspot.com",
  messagingSenderId: "563994360560",
  appId: "1:563994360560:web:579918a7b6f1dbb98a6035",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
