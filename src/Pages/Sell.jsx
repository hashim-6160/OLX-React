import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, imgDB } from "../Config"; 
import { collection, addDoc } from "firebase/firestore";
import "./sell.css";
import { useState } from "react";
import { v4 } from "uuid";

const SellProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (image) {
        const imageRef = ref(imgDB, `products/${v4()}_${image.name}`); 
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef); 

        await addDoc(collection(database, "products"), {
          productName,
          description,
          price,
          imageUrl,
          category,
        });

        setProductName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setCategory(""); 
        setError(null);
      } else {
        setError("Please select an image.");
      }
    } catch (err) {
      console.error("Error uploading image and saving product:", err);
      setError("Error uploading image and saving product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-product-container">
      <h1>Sell Your Product</h1>
      <form onSubmit={handleSubmit} className="sell-product-form">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        {loading && <p>Uploading...</p>}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
