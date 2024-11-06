<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface categoryDataModel {
    name: string;
    state: boolean;
    id: string;
}

const isExtended = ref(false);

const data = ref<categoryDataModel[]>(await useFetch('/api/categories').then((res) => {
    const categories = res.data.value?.categories;

    const filtersStore = useFiltersStore();

    if (categories) {
        return categories?.map(category => ({
            name: category.name,
            state: filtersStore.getSelectedCategories.includes(category.name),
            id: category.id
        }));
    }
    else {
        return [];
    }
}));

const title = ref('Filters');
const mainWrapperRef = ref<HTMLElement | null>(null);

function handleMainTileClick() {
    isExtended.value = !isExtended.value;
}

function handleClickOutside(event: MouseEvent) {
    const mainWrapper = mainWrapperRef.value;

    if (mainWrapper && !mainWrapper.contains(event.target as Node)) {
        isExtended.value = false;
    }
}

function handleCategoryClick(category: categoryDataModel) {
    category.state = !category.state;

    const filtersStore = useFiltersStore();

    filtersStore.updateSelectedCategoriesList(category.name);
}

onMounted(async () => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div ref="mainWrapperRef" class="relative">
        <div class="mt-4 flex cursor-pointer items-center justify-between rounded-sm bg-gray-200 p-2" @click="handleMainTileClick">
            <span class="select-none font-bold text-gray-600">
                {{ title }}
            </span>
            <Icon class="transform transition-transform duration-200" :class="{ '-rotate-90': isExtended }" name="material-symbols:arrow-back-ios-new-rounded" />
        </div>
        <ul v-if="isExtended" class="transition-max-height bg-gray-20 absolute z-[2] max-h-56 w-full overflow-y-auto duration-300">
            <li v-for="(category, index) in data" :key="index" class=" flex items-center gap-2 bg-white p-1" @click="handleCategoryClick(category)">
                <input class="size-5 cursor-pointer border-2 border-main-color checked:bg-main-color" type="checkbox" :checked="category.state">
                <span class="text-lg font-bold">
                    {{ category.name }}
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.arrow-icon.active {
    transform: rotate(-90deg);
}
</style>
