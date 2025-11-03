// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAL3M1ma376C_u6Nx5Gf8ccZldBASyXqFw",
  authDomain: "bookmate-70861.firebaseapp.com",
  projectId: "bookmate-70861",
  storageBucket: "bookmate-70861.appspot.com",
  messagingSenderId: "35793299954",
  appId: "1:35793299954:web:9c42a17488fd8305c9636b",
  measurementId: "G-C0HQSDLSK0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
