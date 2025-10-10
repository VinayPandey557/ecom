import prisma from "../config/prismaClient.js";

// Create order from cart
export const createOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await prisma.cartItem.findMany({ where: { userId }, include: { product: true } });
    if (!cartItems.length) return res.status(400).json({ error: "Cart is empty" });

    const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
        items: { create: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity, price: item.product.price })) }
      },
      include: { items: true }
    });

    // Clear user cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all orders for logged-in user
export const getOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } }
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
