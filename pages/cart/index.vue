<script setup lang='ts'>
import type { Product } from '@prisma/client';
import { CURRENCY } from '~/constants';

const cartStore = useCartStore();

const items = computed(() => cartStore.items);

function handleProductRemove(product: Product) {
    // TODO
    // REMOVE PRODUCT
    cartStore.removeItemById(product.id);
}

function handlePurchase() {
    // TODO
    // FINISH SHOPPING
    cartStore.clearCart();
    navigateTo('/cart/thanks');
}

// function loadProducts() {

// }
</script>

<template>
    <div class="wrapper h-full">
        <div class="flex items-center justify-between">
            <h1 class="py-4 text-center text-6xl font-bold">
                Cart 🛒
            </h1>
            <div class="h-max">
                <button class="base-button" @click="handlePurchase">
                    Purchase
                </button>
            </div>
        </div>
        <ul v-if="items.length" class=" mt-6 flex flex-col gap-6">
            <li v-for="item in items" :key="item.product.id" class="cart-item flex gap-4">
                <div>
                    <img :src="item.product.imageLink" :alt="`${item.product.name} thumbnail`" class="size-full">
                </div>
                <div class="flex flex-col ">
                    <h2 class="text-lg font-bold">
                        {{ item.product.name }}
                    </h2>
                    <span>
                        {{
                            item.product.description
                        }}
                    </span>
                </div>
                <CartDataCell label="Each" :value="`${item.product.price} ${CURRENCY}`" />
                <CartDataCell label="Quantity" :value="`${item.quanitity}`" />
                <CartDataCell label="Total: "
                    :value="`${(item.product.price * item.quanitity).toFixed(2)} ${CURRENCY}`" />
                <div class="flex items-center justify-center">
                    <Icon name="icomoon-free:bin" class="dark-icon size-6" @click="handleProductRemove(item.product)" />
                </div>
            </li>
        </ul>
        <div v-else class="flex justify-center">
            <h2 class="text-2xl font-bold">
                Cart is empty 😥😭😩
            </h2>
        </div>
    </div>
</template>

<style scoped>
.cart-item {
    display: grid;

    @media (width > 960px) {
        grid-template-columns: 100px 6fr repeat(3, minmax(0, 2fr)) 1fr;
    }
}
</style>
