import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDmhW5WnRJ6ty9FOCjFh3LQhkA_wvkAPQo",
  authDomain: "week11-hybridprogramming.firebaseapp.com",
  projectId: "week11-hybridprogramming",
  storageBucket: "week11-hybridprogramming.appspot.com",
  messagingSenderId: "190539900206",
  appId: "1:190539900206:web:7fc6015b8c5885532046bf",
  measurementId: "G-N3CDFRK8B4"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}