<script setup lang="ts">
import { useCartStore, initializeCartStore } from '~/stores/cartStore';

const cartStore = useCartStore();
const itemsAmount = ref(0);

const displayAmount = computed(() => {
    return cartStore.uniqueProductsCount > 9 ? '9+' : cartStore.uniqueProductsCount;
});

watch(
    () => cartStore.uniqueProductsCount,
    (newAmount) => {
        itemsAmount.value = newAmount;
    }
);

onMounted(() => {
    initializeCartStore();
    itemsAmount.value = cartStore.totalProductsCount;
});
</script>

<template>
    <NuxtLink to="/cart" class="cart relative" :class="{ 'cursor-pointer': itemsAmount > 0 }">
        <Icon name="material-symbols:shopping-cart-outline-rounded" class="white-icon size-8" />
        <div v-if="itemsAmount > 0" class="absolute right-[-4px] top-[-2px] flex size-5 items-center justify-center rounded-full bg-red-600">
            <span class="text-center text-[12px] font-bold text-white">
                {{ displayAmount }}
            </span>
        </div>
    </NuxtLink>
</template>
