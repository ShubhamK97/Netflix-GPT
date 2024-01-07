// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7WLy2H0tptUteKExcEJxOBpJ0LnOYCuM",
  authDomain: "netflixgpt-69bbf.firebaseapp.com",
  projectId: "netflixgpt-69bbf",
  storageBucket: "netflixgpt-69bbf.appspot.com",
  messagingSenderId: "95312502709",
  appId: "1:95312502709:web:58d593291bbd30d8f383fc",
  measurementId: "G-6C1VKWSSWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
