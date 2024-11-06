import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GetCartModel {
    userId: string;
}

export default defineEventHandler(async (event) => {
    const { userId } = await readBody<GetCartModel>(event);

    if (!userId) {
        throw createError({ statusCode: 400, message: 'Missing user ID' });
    }

    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            cartItems: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!cart) {
        throw createError({ statusCode: 404, message: 'Cart not found' });
    }

    return cart;
});
