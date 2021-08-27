import firebase from "firebase";
import "firebase/database";

const config = {
  apiKey: "AIzaSyABetqcPztp0cxDFy9zHSZWJ7BWID6jQNc",
  authDomain: "fir-user-apps.firebaseapp.com",
  databaseURL:
    "https://fir-user-apps-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-user-apps",
  storageBucket: "fir-user-apps.appspot.com",
  messagingSenderId: "928627946500",
  appId: "1:928627946500:web:fb417a00cb4f12314eb151",
  measurementId: "G-QS39E0SP54",
};
export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
