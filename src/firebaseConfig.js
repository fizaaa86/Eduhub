// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOY-NYUJ4XZysQ87ynFWSKBsygUqOQgKk",
  authDomain: "eduhub-de9b2.firebaseapp.com",
  projectId: "eduhub-de9b2",
  storageBucket: "eduhub-de9b2.appspot.com",
  messagingSenderId: "133783389594",
  appId: "1:133783389594:web:12b9dcf4b70da5dc24e623"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app,firestore,storage};