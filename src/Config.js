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

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful - User:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Signup successful - User:", user.email);
    
    // Add user to Firestore
    await addDoc(collection(database, "user"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
      createdAt: new Date().toISOString()
    });
    
    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export { auth, login, signup, logout };
