import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.product.count();
    if (count > 0) {
        console.log(`Products already seeded (${count}). Skipping.`);
        return;
    }

    const img = (seed: string) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/600`;
    const products = [
        { name: 'Classic Tee', price: 19.99, image: img('tee-classic') },
        { name: 'Premium Hoodie', price: 49.99, image: img('hoodie-premium') },
        { name: 'Sport Sneakers', price: 79.99, image: img('sneakers-sport') },
        { name: 'Leather Backpack', price: 89.99, image: img('backpack-leather') },
        { name: 'Aviator Sunglasses', price: 39.99, image: img('sunglasses-aviator') },
        { name: 'Analog Watch', price: 59.99, image: img('watch-analog') },
        { name: 'Wireless Earbuds', price: 69.99, image: img('earbuds-wireless') },
        { name: 'Gaming Mouse', price: 34.99, image: img('mouse-gaming') },
        { name: 'Mechanical Keyboard', price: 89.99, image: img('keyboard-mechanical') },
        { name: 'Laptop Sleeve', price: 24.99, image: img('laptop-sleeve') },
        { name: 'Water Bottle', price: 14.99, image: img('water-bottle') },
        { name: 'Yoga Mat', price: 29.99, image: img('yoga-mat') },
        { name: 'Running Shorts', price: 22.99, image: img('shorts-running') },
        { name: 'Baseball Cap', price: 17.99, image: img('cap-baseball') },
        { name: 'Denim Jacket', price: 69.99, image: img('jacket-denim') },
        { name: 'Slim Fit Jeans', price: 49.99, image: img('jeans-slim') },
        { name: 'Casual Sneakers', price: 64.99, image: img('sneakers-casual') },
        { name: 'Graphic Tee', price: 21.99, image: img('tee-graphic') },
        { name: 'Formal Shoes', price: 99.99, image: img('shoes-formal') },
        { name: 'Travel Duffel Bag', price: 79.99, image: img('bag-duffel') },
    ];

    await prisma.product.createMany({ data: products });
    console.log('Seeded products:', products.length);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });