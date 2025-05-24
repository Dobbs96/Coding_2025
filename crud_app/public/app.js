// Import the functions you need from the SDKs you need
import { initializeApp } from "./firebase/app";
import { getFirestore } from "firebase/firestore/lite";

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
const db = getFirestore(app);

const counterRef = doc(db, "demo", "counter");

async function loadCounter() {
    const docSnap = await getDoc(counterRef);
    if (docSnap.exists()) {
        document.getElementById("counter").textContent = docSnap.data().value;
    } else {
        await setDoc(counterRef, { value: 0 });
        document.getElementById("counter").textContent = 0;
    }
}

async function increment() {
    const docSnap = await getDoc(counterRef);
    if (docSnap.exists()) {
        const newValue = docSnap.data().value + 1;
        await updateDoc(counterRef, { value: newValue });
        document.getElementById("counter").textContent = newValue;
    }
}

async function deleteCounter() {
    await deleteDoc(counterRef);
    document.getElementById("counter").textContent = 0;
}

document
    .getElementById("incrementCounter")
    .addEventListener("click", increment);
document
    .getElementById("deleteCounter")
    .addEventListener("click", deleteCounter);

loadCounter();
