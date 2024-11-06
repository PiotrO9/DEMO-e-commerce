import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
    const id: string = event.context?.params?.id ?? '';
    const prisma = new PrismaClient();

    const foundProduct = await prisma.product.findFirst({
        where: {
            id: id
        },
        include: {
            categories: true
        }
    });

    return {
        product: foundProduct
    };
});
