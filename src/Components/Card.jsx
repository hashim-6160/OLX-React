import "./card.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../Config";

const Cardd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(database, "products"));
        const productsList = querySnapshot.docs.map((doc) => doc.data());
        setProducts(productsList);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
