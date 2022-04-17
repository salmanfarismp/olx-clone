import firebase from "firebase";
import 'firebase/auth'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9UQB440ECogGE-bp2yAo4dJV7xP5SBzA",
    authDomain: "olxclone-82f4d.firebaseapp.com",
    projectId: "olxclone-82f4d",
    storageBucket: "olxclone-82f4d.appspot.com",
    messagingSenderId: "1053075807885",
    appId: "1:1053075807885:web:e9e747447c815331650cc4",
    measurementId: "G-T4ZD73LRBM"
  };

export default firebase.initializeApp(firebaseConfig)