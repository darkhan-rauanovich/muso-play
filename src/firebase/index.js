import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBe9_187V4z--S-hrab3RSEXDeHu_MwaYA",
  authDomain: "muso-play.firebaseapp.com",
  projectId: "muso-play",
  storageBucket: "muso-play.appspot.com",
  messagingSenderId: "589206344622",
  appId: "1:589206344622:web:84a05e69862ae3097fae3f",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//timestamp
const timestamp = serverTimestamp;

export { auth, db, storage, timestamp };
