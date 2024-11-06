<script setup lang="ts">
const filtersStore = useFiltersStore();

const searchedPhrase = ref('');

function handleInput() {
    filtersStore.setPhrase(searchedPhrase.value);
}
</script>

<template>
    <div class="search-input mt-4 flex  items-center gap-4 bg-light-gray p-2">
        <Icon name="material-symbols:search" />
        <input v-model="searchedPhrase" class="bg-light-gray text-medium-gray" type="text" placeholder="Search..." @input="handleInput">
    </div>
</template>
