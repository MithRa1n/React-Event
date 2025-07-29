import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAoFBh4WNAay-GZ_71Y9ULY2th6_UJhtU",
  authDomain: "calendar-react-f5b23.firebaseapp.com",
  projectId: "calendar-react-f5b23",
  storageBucket: "calendar-react-f5b23.firebasestorage.app",
  messagingSenderId: "311448703241",
  appId: "1:311448703241:web:93bda79bacc41a1bcc03d8",
  measurementId: "G-FDT6WWPTPG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);