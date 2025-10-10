import express from "express"
import cors from "cors"


import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express();


app.use(cors());
app.use(express.json());

const PORT= 5000



app.get("/", (req, res) => {
     res.send("This is backend of an ecommerce app");
})

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});






app.listen(PORT, () => {
    console.log(`app is listening on the ${PORT}`);
})