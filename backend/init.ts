import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bootstrap() {
    try {
        // Check if Product table exists
        const tables = await prisma.$queryRawUnsafe<any[]>(
            `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
        );

        const hasProductTable = tables.some(t => t.table_name === 'Product');

        if (!hasProductTable) {
            console.log('🛠 Running migrations...');
            execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
        }

        // Check if Product table has data
        const productCount = await prisma.product.count();
        if (productCount === 0) {
            console.log('🌱 Seeding database...');
            execSync('npx prisma db seed', { stdio: 'inherit' });
        } else {
            console.log('✅ Seed data already exists.');
        }
    } catch (err) {
        console.error('❌ Init script failed:', err);
    } finally {
        await prisma.$disconnect();
    }
}

bootstrap();