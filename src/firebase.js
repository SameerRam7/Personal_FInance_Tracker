// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth,GoogleAuthProvider} from "firebase.auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCYupcFi-z9mEPqDVdoQ54JkIn688OGqO8",
  authDomain: "walletwise-app.firebaseapp.com",
  projectId: "walletwise-app",
  storageBucket: "walletwise-app.appspot.com",
  messagingSenderId: "765780302621",
  appId: "1:765780302621:web:b94e98825571579a721ff4",
  measurementId: "G-QKQ6QW5VL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db =getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};