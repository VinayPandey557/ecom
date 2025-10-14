import prisma from "../src/config/prismaClient.js";

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "iPhone 15 Pro",
        slug: "iphone-15-pro",
        description: "Apple flagship smartphone with A17 chip",
        price: 1199.99,
        stock: 20,
        imageUrl: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone15pro-hero-geo-202309_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&.v=1693004182507",
      },
      {
        name: "MacBook Air M3",
        slug: "macbook-air-m3",
        description: "Lightweight laptop with Apple M3 chip",
        price: 1499.99,
        stock: 10,
        imageUrl: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-m3-hero?wid=940&hei=1112&fmt=png-alpha&.v=1707850561231",
      },
      {
        name: "Apple Watch Ultra 2",
        slug: "apple-watch-ultra-2",
        description: "Smartwatch with titanium case",
        price: 799.99,
        stock: 15,
        imageUrl: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/apple-watch-ultra-2-hero-202309?wid=940&hei=1112&fmt=png-alpha&.v=1693004710941",
      },
    ],
  });

  console.log("✅ Products seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    prisma.$disconnect();
  });
