<script setup lang="ts">
const filtersStore = useFiltersStore();

filtersStore.loadDatasFromUrl();
</script>

<template>
    <AppComponentsAppModal />
    <NuxtLayout>
        <main class="scroll-hidden mt-16 flex size-full h-full max-h-[calc(100%-64px)] items-center justify-center">
            <NuxtPage />
        </main>
    </NuxtLayout>
</template>
