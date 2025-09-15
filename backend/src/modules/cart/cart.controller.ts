import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    async getCart() {
        return this.cartService.getCart();
    }

    @Post()
    async addOrUpdate(@Body() dto: AddCartItemDto) {
        return this.cartService.addOrUpdateCartItem(dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.cartService.removeCartItem(id);
    }
}