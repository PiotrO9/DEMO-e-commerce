<script setup lang="ts">
const route = useRoute();

const isLoginPage = computed(() => {
    return route.path === '/login';
});
</script>

<template>
    <header class="fixed inset-x-0 top-0 flex h-16 w-full items-center justify-center bg-main-color">
        <div class="wrapper flex w-full justify-between">
            <NuxtLink to="/">
                <span class="text-xl font-bold text-white">Products</span>
            </NuxtLink>
            <div class="widgets flex gap-2">
                <WidgetsLogoutWidget v-if="!isLoginPage" />
                <AppComponentsAppCart />
            </div>
        </div>
    </header>
</template>
