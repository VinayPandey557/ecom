import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createProduct , getProducts , getProductBySlug } from "../controllers/productcController.js"



const router = express.Router();


router.post("/", authMiddleware, createProduct) // Protected
router.get("/", getProducts );
router.get("/:slug", getProductBySlug);

export default router;