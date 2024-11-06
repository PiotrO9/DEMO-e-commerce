<script setup lang='ts'>
import type { Product } from '@prisma/client';
import { CURRENCY } from '~/constants';

const modalStore = useModalStore();
const cartStore = useCartStore();
const route = useRoute();
const productId = route.params.id as string;

const quantity = ref(1);

const product = ref(await useFetch(`/api/products/${productId}`).then(res => res.data.value?.product));

function handleIncreaseQuantity() {
    quantity.value = quantity.value + 1;
}

function handleDecreaseQuantity() {
    if (quantity.value > 1) {
        quantity.value = quantity.value - 1;
    }
}

function handleAddToCart() {
    const title = 'Add product';
    const description = 'Do you want to add product to cart?';
    const modalIconName = 'ic:baseline-shopping-cart';
    const modalBackButtonText = 'Continue shopping';
    const modalExtraButtonText = 'Got to cart';

    cartStore.addItem(product.value as Product, quantity.value);

    function handleAddToCart() {
        navigateTo('/cart');
        modalStore.clearModal();
    };

    modalStore.showModal(title, description, modalIconName, modalBackButtonText, modalExtraButtonText, handleAddToCart);
}
</script>

<template>
    <div class="product-wrapper wrapper flex h-full flex-col items-center gap-8 py-6 lg:flex-row">
        <div class="iamge-wrapper max-h-[1000px] max-w-[1000px] overflow-hidden">
            <img :src="product?.imageLink" :alt="`${product?.name} image`">
        </div>

        <div class="datas-wrapper flex flex-col gap-6">
            <h1 class="text-6xl font-bold">
                {{ product?.name }}
            </h1>
            <ul class="flex flex-wrap items-center gap-2">
                <li v-for="category in product?.categories" :key="category.id" class="rounded-lg bg-main-color p-2 text-center text-sm font-bold text-white">
                    {{ category.name }}
                </li>
            </ul>
            <div class="ratings-wrapper flex items-center gap-2">
                <ul class="flex items-center gap-2">
                    <li v-for="index in product?.rating" :key="index">
                        <Icon name="material-symbols:star" class="size-5" />
                    </li>
                </ul>
                <ul class="flex items-center gap-1">
                    <li v-for="index in (5 - (product?.rating ?? 0)) " :key="index">
                        <Icon name="material-symbols:star-outline" class="size-5" />
                    </li>
                </ul>
                <span class="text-md font-medium">
                    ({{ product?.ratingsQuantity }} opinions)
                </span>
            </div>
            <span>
                {{ product?.description }}
            </span>
            <span>
                {{ product?.price }} {{ CURRENCY }}
            </span>
            <div class="flex gap-4">
                <div class="flex h-max">
                    <button class="flex size-12 cursor-pointer items-center justify-center rounded-lg rounded-r-none bg-slate-300 text-center text-xl font-bold text-white" @click="handleDecreaseQuantity">
                        -
                    </button>
                    <input v-model="quantity" type="number" min="1" class="h-12 max-w-14 cursor-pointer border-2 border-solid border-slate-300 text-center focus:border-2 focus:border-solid focus:border-slate-300">
                    <button class="flex size-12 items-center justify-center rounded-lg rounded-l-none bg-slate-300 text-center text-xl font-bold text-white" @click="handleIncreaseQuantity">
                        +
                    </button>
                </div>
                <div>
                    <button class="base-button" @click="handleAddToCart">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
