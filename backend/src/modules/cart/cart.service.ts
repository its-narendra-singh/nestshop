import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Injectable()
export class CartService {
    private prisma = new PrismaClient();

    async getCart() {
        const items = await this.prisma.cartItem.findMany({
            include: { product: true },
        });

        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

        return {
            items,
            totalItems,
            totalPrice,
        };
    }

    async addOrUpdateCartItem(dto: AddCartItemDto) {
        const existing = await this.prisma.cartItem.findFirst({
            where: { productId: dto.productId },
        });

        if (existing) {
            return this.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: dto.quantity },
            });
        }

        return this.prisma.cartItem.create({
            data: {
                productId: dto.productId,
                quantity: dto.quantity,
            },
        });
    }

    async removeCartItem(id: string) {
        const exists = await this.prisma.cartItem.findUnique({ where: { id } });
        if (!exists) throw new NotFoundException('Cart item not found');

        return this.prisma.cartItem.delete({ where: { id } });
    }
}