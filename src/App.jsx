import { Routes, Route, useNavigate } from "react-router-dom";
import "./Pages/home.css";
import Home from "./Pages/Home";
import SellProduct from "./Pages/Sell";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config";
import Login from "./Pages/Lg";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged in");
        navigate("/");
      } else {
        console.log("loggedOut");
        navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sell" Protect element={<SellProduct />} />
    </Routes>
  );
};

export default App;
