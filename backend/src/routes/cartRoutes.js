import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();
router.use(authMiddleware);




router.post("/", addToCart);
router.get("/", getCart);
router.delete("/", removeFromCart);


export default router;