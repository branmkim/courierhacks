import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJNnMFr6CbAh2gEFQs108hdfGoFtTyqos",
    authDomain: "courierhacks.firebaseapp.com",
    projectId: "courierhacks",
    storageBucket: "courierhacks.appspot.com",
    messagingSenderId: "1009836967133",
    appId: "1:1009836967133:web:97c5533cbe932306c5c734",
    measurementId: "G-D63W65WRLG"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();