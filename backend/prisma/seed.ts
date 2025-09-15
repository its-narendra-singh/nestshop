import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            { name: 'T-shirt', price: 29.99, image: 'https://dummyimage.com/300x300/cccccc/000000.png&text=Product' },
            { name: 'Sneakers', price: 89.99, image: 'https://dummyimage.com/300x300/cccccc/000000.png&text=Product' },
            { name: 'Backpack', price: 49.99, image: 'https://dummyimage.com/300x300/cccccc/000000.png&text=Product' },
        ],
    });
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());