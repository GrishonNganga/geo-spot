// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHFOfkwOpj9UZIL3ZeeHihkDsA0XQNRhA",
  authDomain: "geospot-414108.firebaseapp.com",
  projectId: "geospot-414108",
  storageBucket: "geospot-414108.appspot.com",
  messagingSenderId: "300563931278",
  appId: "1:300563931278:web:b13bea750d4e291693e9df",
  measurementId: "G-393BFD389T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);