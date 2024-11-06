<script setup lang="ts">
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { SLIDER_CONFIG, CURRENCY } from '~/constants';

const filtersStore = useFiltersStore();

const slider = ref(null);

const minRangeValue = ref(filtersStore.getPriceRanges.minPrice ?? SLIDER_CONFIG.minValue);
const maxRangeValue = ref(filtersStore.getPriceRanges.maxPrice ?? SLIDER_CONFIG.maxValue);

onMounted(() => {
    if (slider.value) {
        const sliderInstance = noUiSlider.create(slider.value, {
            start: [filtersStore.getPriceRanges.minPrice ?? SLIDER_CONFIG.minValue, filtersStore.getPriceRanges.maxPrice ?? SLIDER_CONFIG.maxValue],
            connect: true,
            step: SLIDER_CONFIG.step,
            range: {
                min: SLIDER_CONFIG.minValue,
                max: SLIDER_CONFIG.maxValue
            }
        });

        sliderInstance.on('update', (values) => {
            minRangeValue.value = Number(values[0]);
            maxRangeValue.value = Number(values[1]);
        });

        sliderInstance.on('change', (values) => {
            filtersStore.setPriceRanges({
                minPrice: Number(values[0]),
                maxPrice: Number(values[1])
            });
        });
    }
});
</script>

<template>
    <div class="price-range relative h-12">
        <div class="price-range-wrapper absolute top-1/2 w-full">
            <div ref="slider" class="slider" />
        </div>
        <span
            class="price-range-values absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3"
        >
            {{ minRangeValue }}{{ CURRENCY }} -  {{ maxRangeValue }}{{ CURRENCY }}
        </span>
    </div>
</template>

<style>
.price-range {
    .price-range-wrapper {
        .noUi-target {
            height: 3px;
            width: 100%;
            border: none;
            top: -2px;
        }

        .noUi-horizontal {
            .noUi-handle {
                top: -12px;
                border: none;
                background-color: #148A84;
                cursor: pointer;
            }
        }
    }
}
</style>
