// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGNvNQTVDQU3gtKZCP-XRLKPEtjET_2yM",
    authDomain: "buzz-books.firebaseapp.com",
    projectId: "buzz-books",
    storageBucket: "buzz-books.appspot.com",
    messagingSenderId: "117389728648",
    appId: "1:117389728648:web:b91f0eb7c6d680473ef83d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
