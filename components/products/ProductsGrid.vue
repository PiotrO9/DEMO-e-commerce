<script setup lang="ts">
import type { Product, PaginationModel } from '~/assets/types/types';

const orderValue = computed(() => filtersStore.getOrder);
const currentPageValue = computed(() => filtersStore.getPaginationDatas.currentPage);
const priceRangesValue = computed(() => filtersStore.getPriceRanges);
const phraseValue = computed(() => filtersStore.getPhrase);
const selectedFilters = computed(() => filtersStore.getSelectedCategories.join(','));

const filtersStore = useFiltersStore();

const { data: productsData } = await useAsyncData<{ products: Product[]; paginationData: PaginationModel }>('products', () => $fetch('/api/products', {
    query: {
        order: orderValue.value,
        page: currentPageValue.value,
        priceRanges: priceRangesValue.value,
        phrase: phraseValue.value,
        selectedFilters: selectedFilters.value
    }
}), {
    watch: [orderValue, currentPageValue, priceRangesValue, phraseValue, selectedFilters]
});

const products = computed(() => productsData.value?.products);
const paginationData = computed(() => productsData.value?.paginationData);

watch(paginationData, () => {
    filtersStore.setPaginationData(paginationData.value || { currentPage: 1, totalPages: 1 });
}, { immediate: true });
</script>

<template>
    <div class="quad-grid py-6">
        <template v-if="products && products?.length > 0">
            <ProductsProductGridItem v-for="(product, index) in products" :key="index" :product="product" />
        </template>
    </div>
</template>
