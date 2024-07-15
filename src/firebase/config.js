import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCprYDuJDpVXyYW34-onJr_AyFLkP_kECA",
    authDomain: "fir-c62e0.firebaseapp.com",
    projectId: "fir-c62e0",
    storageBucket: "fir-c62e0.appspot.com",
    messagingSenderId: "726828350399",
    appId: "1:726828350399:web:c13abcd531fc094955ff0a",
    measurementId: "G-2ZF660L3YY"
};

export default firebase.initializeApp(firebaseConfig);