import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import productsData from "../assets/products";

function Home() {
  const [products, setProducts]  = useState(productsData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/products");
        setProducts(res.data);
      } catch(err) {
        console.error("Error fetching products", err);
        setError("Failed to load products. Please try again later");
      } finally{
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading products...
      </div>
    );
  }
  if(error) {
    return (
      <div className="flex justify-center items-center h-screen text-red font-semibold">
        { error }
      </div>
    )
  }

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🛍️ Our Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
