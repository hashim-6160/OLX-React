import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCslmfZARI9L0teZBVw1u_ERzILoSOWOJ0",
  authDomain: "olx-clone-c463e.firebaseapp.com",
  projectId: "olx-clone-c463e",
  storageBucket: "olx-clone-c463e.appspot.com",
  messagingSenderId: "604221487537",
  appId: "1:604221487537:web:0fa0aaeba050978bdfe590",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const imgDB = getStorage(app);
const auth = getAuth(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(database, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export { auth, login, signup, logout };
