import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = async() => {
    try {
      await axiosClient.post("/cart/add", { productId: product.id, quantity: 1});
      alert("Added to cart!");
    } catch(err) {
      console.error("Error loading to cart", err);
      alert("Please sign in first");
      navigate("/login");
    }
  };
 return (
    <div className="border rounded-xl shadow-md m-4 p-4 w-64 text-center">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-700">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
