<script setup lang='ts'>
import type { Product } from '~/assets/types/types';
import { CURRENCY } from '~/constants';

const { product } = defineProps<{ product: Product }>();

function addProductToCartHandleClick() {
    const modalStore = useModalStore();
    const cartStore = useCartStore();

    const modalTitle = 'Add product to Cart';
    const modalDescription = 'Are you sure you want to add this item to your cart? You can review your selection before proceeding to checkout.';
    const modalIconName = 'ic:baseline-shopping-cart';
    const modalBackButtonText = 'Back';
    const modalExtraButtonText = 'Add to Cart';

    function handleAddToCart() {
        cartStore.addItem(product);
        modalStore.clearModal();
    };

    modalStore.showModal(modalTitle, modalDescription, modalIconName, modalBackButtonText, modalExtraButtonText, handleAddToCart);
}
</script>

<template>
    <div class="product-item relative flex h-max flex-col gap-5 rounded-lg p-3 shadow-xl lg:h-full">
        <div class="product-item-image-wrapper h-1/2 overflow-hidden rounded-lg lg:h-3/5">
            <NuxtLink :to="`/product/${product.id}`">
                <img class="transition-scale size-full cursor-pointer object-cover  transition-transform hover:scale-110" :src="product.imageLink" :alt="product.name">
            </NuxtLink>
        </div>
        <div class="product-item-data-wrapper flex flex-col">
            <span class="product-title mb-2 text-2xl font-bold">
                {{ product.name }}
            </span>
            <span class="product-description mb-2 line-clamp-2">
                {{ product.description }}
            </span>
            <span class="product-price text-lg font-bold">
                {{ product.price }} {{ CURRENCY }}
            </span>
            <div class="category-wrapper" />
        </div>
        <div class="button-wrapper my-2 flex h-12 w-full items-center justify-center">
            <button class="add-to-cart-button base-button" @click.prevent="addProductToCartHandleClick">
                Add product to cart
            </button>
        </div>
    </div>
</template>
