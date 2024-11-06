import { randProductName, randUuid } from '@ngneat/falso';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const adminUser = await prisma.user.create({
        data: {
            id: randUuid(),
            login: 'admin',
            password: 'admin'
        }
    });

    await prisma.cart.create({
        data: {
            id: randUuid(),
            userId: adminUser.id
        }
    });

    const categories = [];

    for (let index = 0; index < 20; index++) {
        categories.push(
            await prisma.category.create({
                data: {
                    id: randUuid(),
                    name: randProductName()
                }
            })
        );
    }

    for (let index = 0; index < 150; index++) {
        await prisma.product.create({
            data: {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price({ min: 100, max: 5000 })),
                imageLink: faker.image.urlPicsumPhotos({ width: 1200, height: 1200, blur: 0, grayscale: false }),
                rating: faker.number.int({ min: 1, max: 5 }),
                ratingsQuantity: faker.number.int({ min: 5, max: 500 }),
                categories: {
                    connect: faker.helpers.arrayElements(
                        categories.map(category => ({ id: category.id })),
                        faker.number.int({ min: 1, max: 5 })
                    )
                }
            },
            include: {
                categories: true
            }
        });
    }

    console.log(`Database has been seeded. 🌱`);
};

main().catch((err) => {
    console.warn('Error While generating Seed: \n', err);
});
