// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAey5PoVJ-rcx_BFkBoT_iJeHLNFJ7lgJA",
  authDomain: "devjobs-b8054.firebaseapp.com",
  projectId: "devjobs-b8054",
  storageBucket: "devjobs-b8054.appspot.com",
  messagingSenderId: "647538263603",
  appId: "1:647538263603:web:dd728ddcd85bae3c0a8546",
  measurementId: "G-3HWZ9MQ50T",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
