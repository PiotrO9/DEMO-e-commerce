import { PrismaClient } from '@prisma/client';

interface AddItemToCartModel {
    userId: string;
    productId: string;
    quantity: number;
}

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { productId, quantity, userId } = await readBody<AddItemToCartModel>(event);

    if (!productId || !quantity || !userId) {
        throw createError({ statusCode: 400, message: 'Missing required fields' });
    }

    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
        throw createError({ statusCode: 404, message: 'Cart not found' });
    }

    const cartItem = await prisma.cartItem.upsert({
        where: {
            cartId_productId: { cartId: cart.id, productId }
        },
        update: {
            quantity: { increment: quantity }
        },
        create: {
            cartId: cart.id,
            productId,
            quantity
        }
    });

    return cartItem;
});
