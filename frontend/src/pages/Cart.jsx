import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Cart() {
  const [cart, setCart] = useState([]);


  const fetchCart = async() => {
    try {
      const res = await axiosClient.get("/cart");
      setCart(res.data);
    } catch(err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axiosClient.delete(`/cart/${productId}`);
      setCart((prevCart) => prevCart.filter((item) => item.productId !==productId));
    } catch(err) {
      console.error("Error removing from cart:", err);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-700">${item.product.price}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.productId)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
