import { initializeApp } from "firebase/app";

import {
    getAuth, signInWithEmailAndPassword, onAuthStateChanged,
    createUserWithEmailAndPassword, signOut,
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

const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const register = async (email, username, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username,
            authProvider: "local",
            email,
            image: "../public/logo.png"
        });

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

const addScore = (date, score) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            addDoc(collection(db, "users", user.uid, "dates", date, "scores"), {
                score,
            });
        }
    })
}

const addImage = (selectedImage) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setDoc(doc(db, "users", user.uid), {
                image: selectedImage
            }, {merge: true});
        }
    });
}

export {
    auth, db, logIn, register, logout, addScore, addImage
};