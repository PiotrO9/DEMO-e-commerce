import { PRODUCTS_PER_PAGE } from '~/constants';

export default function paginateProducts<T>(products: Array<T>, page: number) {
    if (isNaN(page) || page < 1) {
        page = 1;
    }

    const productsItemsAmount = products.length;
    const minimalProductIndex = (page - 1) * PRODUCTS_PER_PAGE;

    if (minimalProductIndex + PRODUCTS_PER_PAGE > productsItemsAmount) {
        return products.slice(minimalProductIndex, productsItemsAmount - minimalProductIndex + PRODUCTS_PER_PAGE);
    }
    else {
        return products.slice(minimalProductIndex, minimalProductIndex + PRODUCTS_PER_PAGE);
    }
}
