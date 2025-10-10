import prisma from "../config/prismaClient.js"


export const addToCart = async(req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if(!productId || !quantity) return res.status(400).json({ error: "Product and quantity required"});

    try {
        const cartItem = await prisma.cartItem.upsert({
            where: { userId_productId: { userId, productId }},
            update: { quantity: { increment: quantity }},
            create: { userId, productId, quantity },
        });
        res.json(cartItem);
    } catch(err) {
        console.err(err);
        res.status(500).json({ error: "Server error"});
    }
};


export const getCart  = async(req, res) => {
    const userId = req.user.id;
    try {
        const cart = await prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
        res.json(cart);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
    }
};


export const removeFromCart = async(req, res) => {
    const userId = req.user.id;
    const productId = req.body;

    try {
        await prisma.cartItem.delete({
            where: { userId_productId : { userId, productId }},
        });
        res.json({ message: "Removed from cart "});
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
    }
}