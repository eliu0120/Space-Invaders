import { initializeApp } from "firebase/app";

import {
    getAuth, signInWithEmailAndPassword, onAuthStateChanged,
    createUserWithEmailAndPassword, sendPasswordResetEmail, signOut,
} from 'firebase/auth';
import {
    getFirestore, collection, addDoc, setDoc, doc,
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAYqpIU5GgE6xS4RINuQ_GHzK_6G-J0Hi8",
    authDomain: "space-invaders-6b7d9.firebaseapp.com",
    databaseURL: "https://space-invaders-6b7d9-default-rtdb.firebaseio.com/",
    projectId: "space-invaders-6b7d9",
    storageBucket: "space-invaders-6b7d9.appspot.com",
    messagingSenderId: "731300708466",
    appId: "1:731300708466:web:13185967770ed090f582eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const register = async (email, username, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username,
            authProvider: "local",
            email,
        });

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};