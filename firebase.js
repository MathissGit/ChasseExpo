// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0kxDnvM66MAzTxfodsy8topf7nwOi1Ic",
    authDomain: "chasse-expo.firebaseapp.com",
    projectId: "chasse-expo",
    storageBucket: "chasse-expo.appspot.com",
    messagingSenderId: "89348081729",
    appId: "1:89348081729:web:32b251e76d3b81c9851ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getFirestore(app);

export {store}