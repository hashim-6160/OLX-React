import { createContext, useContext, useEffect, useState } from "react";
import { database, auth } from "./Config";
import { collection, count, getDocs } from "firebase/firestore";

export const AppContext = createContext();
export const useDB = () => useContext(AppContext);

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  });

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
