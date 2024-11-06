import { OrderDirection } from '~/assets/types/enums';
import { PRICE_RANGE_MINIMAL_VALUE, PRICE_RANGE_MAXIMAL_VALUE } from '~/constants';
import type { PaginationModel } from '~/assets/types/types';

interface FiltersDatasModel {
    order: OrderDirection;
    filters: string;
    phrase: string;
    selectedCategories: string[];
}

export interface PriceRangeModel {
    minPrice: number;
    maxPrice: number;
}

interface filtersStoreModel {
    filtersData: FiltersDatasModel;
    priceRange: PriceRangeModel;
    paginationData: PaginationModel;
}

function encodeArrayForUrl(values: string[]): string {
    return values.map(value => value.replace(/\s+/g, '-')).join(',');
}

function decodeUrlStringToArray(urlString: string): string[] {
    return urlString.split(',').map(value => value.replace(/-/g, ' '));
}

function isStringArray(value: LocationQueryValue | LocationQueryValue[]): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isString(value: LocationQueryValue | LocationQueryValue[]): value is string {
    return typeof value === 'string';
}

function parseQueryParamAsArray(param: LocationQueryValue | LocationQueryValue[]): string[] {
    if (isStringArray(param)) {
        return param;
    }
    else if (isString(param)) {
        return decodeUrlStringToArray(param);
    }

    return [];
}

export const useFiltersStore = defineStore('filters', {
    state: (): filtersStoreModel => ({
        filtersData: {
            order: OrderDirection.ASC,
            filters: 'name',
            phrase: '',
            selectedCategories: []
        },
        priceRange: {
            minPrice: PRICE_RANGE_MINIMAL_VALUE,
            maxPrice: PRICE_RANGE_MAXIMAL_VALUE
        },
        paginationData: {
            currentPage: 1,
            totalPages: 1
        }
    }),
    actions: {
        loadDatasFromUrl() {
            const route = useRoute();
            const query = route.query;

            if (query.order) {
                this.filtersData.order = query.order as OrderDirection;
            }

            if (query.phrase !== undefined) {
                this.filtersData.phrase = query.phrase as string;
            }

            if (query.selectedCategories) {
                this.filtersData.selectedCategories = parseQueryParamAsArray(query.selectedCategories);
            }
            else {
                this.filtersData.selectedCategories = [];
            }

            if (query.minPrice) {
                this.priceRange.minPrice = Number(query.minPrice);
            }

            if (query.maxPrice) {
                this.priceRange.maxPrice = Number(query.maxPrice);
            }

            if (query.currentPage) {
                this.paginationData.currentPage = Number(query.currentPage);
            }
        },
        updateUrlWithFilters() {
            const router = useRouter();

            const query: { [key: string]: any } = {
                order: this.filtersData.order,
                phrase: this.filtersData.phrase || undefined,
                selectedCategories: this.filtersData.selectedCategories.length ? encodeArrayForUrl(this.filtersData.selectedCategories) : undefined,
                minPrice: this.priceRange.minPrice !== PRICE_RANGE_MINIMAL_VALUE ? this.priceRange.minPrice : undefined,
                maxPrice: this.priceRange.maxPrice !== PRICE_RANGE_MAXIMAL_VALUE ? this.priceRange.maxPrice : undefined,
                currentPage: (this.paginationData.currentPage > 1) ? this.paginationData.currentPage : undefined
            };

            Object.keys(query).forEach(
                key => query[key] === undefined && delete query[key]
            );

            router.push({ query });
        },
        setOrder(order: OrderDirection) {
            this.filtersData.order = order;
            this.updateUrlWithFilters();
        },
        setPhrase(phrase: string) {
            this.filtersData.phrase = phrase;
            this.updateUrlWithFilters();
        },
        updateSelectedCategoriesList(category: string) {
            if (this.filtersData.selectedCategories.includes(category)) {
                const index = this.filtersData.selectedCategories.indexOf(category);

                if (index !== -1) {
                    this.filtersData.selectedCategories.splice(index, 1);
                }
            }
            else {
                this.filtersData.selectedCategories.push(category);
            }

            this.updateUrlWithFilters();
        },
        setPriceRanges(priceRanges: PriceRangeModel) {
            this.priceRange = priceRanges;
            this.updateUrlWithFilters();
        },
        setPaginationData(paginationData: PaginationModel) {
            if (paginationData.currentPage != this.paginationData.currentPage) {
                this.paginationData.currentPage = paginationData.currentPage;
                this.updateUrlWithFilters();
            }

            if (paginationData.totalPages != this.paginationData.totalPages) {
                this.paginationData.totalPages = paginationData.totalPages;
                this.updateUrlWithFilters();
            }
        },
        setCurrentPage(page: number) {
            if (page > this.paginationData.totalPages) {
                this.paginationData.currentPage = this.paginationData.totalPages;
            }
            else {
                this.paginationData.currentPage = page;
            }

            this.updateUrlWithFilters();
        }
    },
    getters: {
        getOrder(state): OrderDirection {
            return state.filtersData.order;
        },
        getPhrase(state): string {
            return state.filtersData.phrase;
        },
        getSelectedCategories(state): string[] {
            return state.filtersData.selectedCategories;
        },
        getPaginationDatas(state): PaginationModel {
            return state.paginationData;
        },
        getPriceRanges(state): PriceRangeModel {
            return state.priceRange;
        }
    }
});
