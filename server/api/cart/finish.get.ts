import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { userId } = await readBody(event);

    if (!userId) {
        throw createError({ statusCode: 400, message: 'Missing required fields' });
    }

    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
        throw createError({ statusCode: 404, message: 'Cart not found' });
    }

    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
    });

    return { message: 'Cart cleared successfully' };
});
