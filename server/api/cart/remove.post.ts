import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { userId, productId } = await readBody(event);

    if (!userId || !productId) {
        throw createError({ statusCode: 400, message: 'Missing required fields' });
    }

    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
        throw createError({ statusCode: 404, message: 'Cart not found' });
    }

    const deletedItem = await prisma.cartItem.deleteMany({
        where: {
            cartId: cart.id,
            productId
        }
    });

    if (deletedItem.count === 0) {
        throw createError({ statusCode: 404, message: 'Item not found in cart' });
    }

    return { message: 'Item removed from cart successfully' };
});
