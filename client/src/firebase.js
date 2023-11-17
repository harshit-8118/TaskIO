import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_ADDNOTE_API_KEY,
  authDomain: "addnote-1699259210502.firebaseapp.com",
  projectId: process.env.REACT_APP_ADDNOTE_PROJECT_ID,
  storageBucket: "addnote-1699259210502.appspot.com",
  messagingSenderId: process.env.REACT_APP_ADDNOTE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ADDNOTE_MESSAGING_APP_ID,
  measurementId: "G-6HSXHRG2FJ",
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
