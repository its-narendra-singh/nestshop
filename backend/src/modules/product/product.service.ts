import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductService {
    private prisma = new PrismaClient();

    async getAllProducts() {
        return this.prisma.product.findMany();
    }
}