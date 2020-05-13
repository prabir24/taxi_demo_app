import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA-dYOy4pNoEWHuYu0hImtKl-hHtx-qg9I",
  authDomain: "taxi-booking-app-4c94a.firebaseapp.com",
  databaseURL: "https://taxi-booking-app-4c94a.firebaseio.com",
  projectId: "taxi-booking-app-4c94a",
  storageBucket: "taxi-booking-app-4c94a.appspot.com",
  messagingSenderId: "1558663354",
  appId: "1:1558663354:web:bc9034dcf18f3c790a3283",
  measurementId: "G-3R53CDFLRJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
