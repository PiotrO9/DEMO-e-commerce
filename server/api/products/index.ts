import { PrismaClient } from '@prisma/client';
import paginateProducts from '~/helpers/paginateProducts';
import { OrderDirection } from '~/assets/types/enums';
import { PRODUCTS_PER_PAGE, PRICE_RANGE_MINIMAL_VALUE, PRICE_RANGE_MAXIMAL_VALUE } from '~/constants';

const prisma = new PrismaClient();

interface QueryParams {
    order?: OrderDirection;
    page: number;
    filters?: string;
    priceRanges: string;
    phrase?: string;
    selectedFilters: string;
}

export default defineEventHandler(async (event) => {
    const { page } = getQuery<QueryParams>(event);
    const { filters, priceRanges, phrase, selectedFilters, order } = getQuery<QueryParams>(event);

    const orderBy = getOrderByConditions(filters, order);
    const where = buildWhereConditions(priceRanges, phrase, selectedFilters);

    const foundProducts = await prisma.product.findMany({
        orderBy,
        where,
        include: {
            categories: true
        }
    });

    return {
        products: paginateProducts(foundProducts, page),
        paginationData: createPaginationData(page, foundProducts.length)
    };
});

function parsePriceRange(priceRanges: string): { minPrice: number; maxPrice: number } {
    try {
        const { minPrice, maxPrice } = JSON.parse(priceRanges);

        return {
            minPrice: minPrice || PRICE_RANGE_MINIMAL_VALUE,
            maxPrice: maxPrice || PRICE_RANGE_MAXIMAL_VALUE
        };
    }
    catch (error) {
        console.error('Error parsing price ranges:', error);

        return {
            minPrice: PRICE_RANGE_MINIMAL_VALUE,
            maxPrice: PRICE_RANGE_MAXIMAL_VALUE
        };
    }
}

function buildWhereConditions(priceRanges: string, phrase?: string, selectedFilters?: string) {
    const { minPrice, maxPrice } = parsePriceRange(priceRanges);

    const whereConditions: Record<string, any> = {
        price: {
            gte: minPrice,
            lte: maxPrice
        },
        name: phrase ? { contains: phrase } : undefined,
        categories: selectedFilters
            ? {
                some: {
                    name: {
                        in: selectedFilters.split(',').map(filter => filter.trim())
                    }
                }
            }
            : undefined
    };

    return removeUndefinedProperties(whereConditions);
}

function getOrderByConditions(filters?: string, order?: OrderDirection) {
    if (!filters) {
        filters = 'name';
    }

    const selectedOrder = order ?? OrderDirection.ASC;

    return filters.split(',').map(filter => ({
        [filter.trim()]: selectedOrder
    }));
}

function removeUndefinedProperties(obj: Record<string, any>) {
    return Object.keys(obj).reduce((acc, key) => {
        if (obj[key] !== undefined) {
            acc[key] = obj[key];
        }

        return acc;
    }, {});
}

function createPaginationData(page: number, productsAmount: number) {
    const totalPages = Math.floor(productsAmount / PRODUCTS_PER_PAGE);

    return {
        currentPage: page > totalPages ? totalPages : page,
        totalPages: totalPages
    };
}
