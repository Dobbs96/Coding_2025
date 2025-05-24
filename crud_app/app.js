// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcoV2tLhBqPxy03mkEdL38RSTW1KiW6rw",
    authDomain: "my-first-crud-28c57.firebaseapp.com",
    projectId: "my-first-crud-28c57",
    storageBucket: "my-first-crud-28c57.firebasestorage.app",
    messagingSenderId: "380152514893",
    appId: "1:380152514893:web:56baa739f21e2422fa8f04",
    measurementId: "G-GVQMH8W4KZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
