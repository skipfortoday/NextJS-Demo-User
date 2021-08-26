import firebase from "firebase";
import "firebase/database";

// const config = {
//   apiKey: "AIzaSyBEQW9jtmuXbFern0irXR1umEgkmBr8-3Q",
//   authDomain: "tcard-syc.firebaseapp.com",
//   databaseURL:
//     "https://tcard-syc-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "tcard-syc",
//   storageBucket: "tcard-syc.appspot.com",
//   messagingSenderId: "27147994029",
//   appId: "1:27147994029:web:e7908897892f6ab8aa1724",
//   measurementId: "G-NTWN5RBFG4",
// };

const config = {
  apiKey: "AIzaSyAsL_65vgGQrihQkI6vtZ8RM_Rp4TCPa10",
  authDomain: "lviors-f417b.firebaseapp.com",
  databaseURL:
    "https://lviors-f417b-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "lviors-f417b",
  storageBucket: "lviors-f417b.appspot.com",
  messagingSenderId: "933038820667",
  appId: "1:933038820667:web:c2dc1d3842e9eff40dbb1e",
  measurementId: "G-M7PY9RDF4M",
};
export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
// var firebaseConfig = {};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   ("eror");
// }
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const fconn = firebase.database();

// export { auth, provider, fconn };
