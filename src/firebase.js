import firebase from "firebase";

const firebaseConfig = {
  apiKey: "test",
  authDomain: "test",
  databaseURL: "test",
  projectId: "test",
  storageBucket: "test",
  messagingSenderId: "test",
  appId: "test",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
