// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARu1HT7BwL6VFnTB3rZOK4HwVDXJLucyk",
  authDomain: "dojo-f3674.firebaseapp.com",
  projectId: "dojo-f3674",
  storageBucket: "dojo-f3674.appspot.com",
  messagingSenderId: "251986738884",
  appId: "1:251986738884:web:c2af175a28c22389ee9391",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
