import express from "express"
import authRoutes from "./routes/userRoutes.js"
import cors from "cors"
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();


app.use(cors());
app.use(express.json());

const PORT= 3000

app.use("/auth", authRoutes);


app.get("/", (req, res) => {
     res.send("This is backend of an ecommerce app");
})





app.listen(PORT, () => {
    console.log(`app is listening on the ${PORT}`);
})