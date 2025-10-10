import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axiosClient.get("/cart").then((res) => setCart(res.data));
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.product.id}>
          <p>{item.product.name} — {item.quantity} pcs</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
