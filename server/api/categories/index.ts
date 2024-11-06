import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async () => {
    const prisma = new PrismaClient();

    return {
        categories: await prisma.category.findMany({
            select: {
                name: true,
                id: true
            }
        })
    };
});
