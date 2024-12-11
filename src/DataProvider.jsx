import { createContext, useContext, useEffect, useState } from "react";
import { database, auth } from "./Config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AppContext = createContext();
export const useDB = () => useContext(AppContext);

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthInitialized(true);
      if (user) {
        console.log("Auth state changed - User logged in:", user.email);
      } else {
        console.log("Auth state changed - User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!authInitialized) return; // Wait for auth to initialize
      
      try {
        console.log("Fetching user data, auth state:", auth.currentUser?.email);
        const querySnapshot = await getDocs(collection(database, "user"));
        const dataList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList);

        const loggedInUser = dataList.find(
          (user) => user.email === auth.currentUser?.email
        );
        if (loggedInUser) {
          setName(loggedInUser.name);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authInitialized]);


  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return (
    <AppContext.Provider
      value={{ data, loading, name, increment, decrement, counter}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default DataProvider;
