// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZC1hYI6UDBO2T1dLHs5wc1dwCda51zzE",
  authDomain: "foodqr-ba71e.firebaseapp.com",
  projectId: "foodqr-ba71e",
  storageBucket: "foodqr-ba71e.firebasestorage.app",
  messagingSenderId: "266484500004",
  appId: "1:266484500004:web:49d992d9641de2629bbab1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);