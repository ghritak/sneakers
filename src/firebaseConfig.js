import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




