
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ9lZpcoG-lvO0YmVn-w0mXXzV3L4W5Kw",
  authDomain: "tendor-climbing.firebaseapp.com",
  projectId: "tendor-climbing",
  storageBucket: "tendor-climbing.appspot.com",
  messagingSenderId: "77241245133",
  appId: "1:77241245133:web:cd3ec23860f5b81fcc7884",
  measurementId: "G-LJSSSLT5RJ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, storage, auth, collection, setDoc, doc, getDocs, updateDoc, addDoc }; 