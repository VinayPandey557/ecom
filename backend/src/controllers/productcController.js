import prisma from "../config/prismaClient.js";
import slugify from "slugify";

// CREATE product
export const createProduct = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const slug = slugify(name, { lower: true, strict: true });

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        slug,
        categoryId,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET single product by slug
export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
