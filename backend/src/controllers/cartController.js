import prisma from "../config/prismaClient.js";

// 🛒 Add to Cart (create or increment)
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: quantity || 1 } },
      create: { userId, productId, quantity: quantity || 1 },
      include: { product: true },
    });

    res.json(cartItem);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🛍️ Get all items in the user's cart
export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ❌ Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params; // ✅ FIXED: get productId from URL params

  try {
    await prisma.cartItem.delete({
      where: { userId_productId: { userId, productId } },
    });

    res.json({ message: "Removed from cart" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: "Server error" });
  }
};
