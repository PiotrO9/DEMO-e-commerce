<script setup lang='ts'>
interface CartDacaCellModel {
    label: string;
    value: string;
}

const { label, value } = defineProps<CartDacaCellModel>();
</script>

<template>
    <div class="flex flex-col justify-center gap-2">
        <span class="text-lg font-medium">
            {{ label }}
        </span>
        <span>
            {{ value }}
        </span>
    </div>
</template>
