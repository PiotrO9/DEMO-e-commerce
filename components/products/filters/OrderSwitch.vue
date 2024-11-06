<script setup lang="ts">
import type { OrderDirection } from '~/assets/types/enums';

const filtersStore = useFiltersStore();
const isChecked = ref(true);

const switchClasses = computed(() => {
    return isChecked.value ? 'translate-x-9' : 'translate-x-2';
});

watch(isChecked, () => {
    const orderValue = isChecked.value ? 'asc' : 'desc';

    filtersStore.setOrder(orderValue as OrderDirection);
});

function setCheckedState(value: boolean) {
    isChecked.value = value;
}
</script>

<template>
    <div class="order-switch mt-3 flex items-center justify-center gap-3">
        <span class="cursor-pointer select-none font-bold transition-colors" :class="{ 'text-main-color': !isChecked }" @click="setCheckedState(false)">
            Descending
        </span>
        <div class="relative h-8 w-16 cursor-pointer rounded-full bg-main-color" @click="setCheckedState(!isChecked)">
            <input v-model="isChecked" class="hidden" type="checkbox">
            <div class="absolute top-1 size-5 translate-y-[2px] rounded-full bg-white transition-transform duration-300" :class="switchClasses" />
        </div>
        <span class="cursor-pointer select-none font-bold transition-colors" :class="{ 'text-main-color': isChecked }" @click="setCheckedState(true)">
            Ascending
        </span>
    </div>
</template>
