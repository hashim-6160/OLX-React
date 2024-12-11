import "./card.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database, auth } from "../Config";
import { onAuthStateChanged } from "firebase/auth";

const Cardd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthInitialized(true);
      console.log("Card auth state:", user ? "Authenticated" : "Not authenticated");
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!authInitialized) return; // Wait for auth to initialize
      
      setLoading(true);
      try {
        console.log("Fetching products, auth state:", auth.currentUser?.email);
        
        const querySnapshot = await getDocs(collection(database, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched products:", productsList);
        setProducts(productsList);
        setError(null);
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          code: err.code,
          stack: err.stack,
          auth: auth.currentUser ? "Authenticated" : "Not authenticated"
        });
        setError(`Error fetching products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [authInitialized]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="products-list-container">
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className="products-list">
          {products.map((product, index) => (
            <li key={index} className="product-item">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="product-image"
              />
              <h2>{product.productName}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cardd;
