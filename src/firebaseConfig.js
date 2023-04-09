// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyByDwY29vNMQOIMJKm49PTe5vbDOYwQG1w",
    authDomain: "shop-599ca.firebaseapp.com",
    databaseURL: "https://shop-599ca-default-rtdb.firebaseio.com",
    projectId: "shop-599ca",
    storageBucket: "shop-599ca.appspot.com",
    messagingSenderId: "1025329409329",
    appId: "1:1025329409329:web:c3eeae8b547c4f01661410",
    measurementId: "G-GQ72FD4M72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

