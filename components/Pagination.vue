<script setup lang="ts">
import { computed } from 'vue';

const filtersStore = useFiltersStore();

const currentPage = computed(() => filtersStore.getPaginationDatas.currentPage);
const totalPagesAmount = computed(() => filtersStore.getPaginationDatas.totalPages);

function visiblePages() {
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPagesAmount.value) {
        endPage = totalPagesAmount.value;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
}

function changePage(page: number) {
    if (page >= 1 && page <= totalPagesAmount.value) {
        filtersStore.setCurrentPage(page);
    }
}

function goToFirstPage() {
    changePage(1);
}

function goToLastPage() {
    changePage(totalPagesAmount.value);
}

function goToPreviousPage() {
    if (currentPage.value > 1) {
        changePage(currentPage.value - 1);
    }
}

function goToNextPage() {
    if (currentPage.value < totalPagesAmount.value) {
        changePage(currentPage.value + 1);
    }
}

function setBackgroundColorWhenButtonActive(page: number) {
    return (page == currentPage.value) ? 'bg-blue-500 text-white' : 'bg-gray-200';
}
</script>

<template>
    <div v-if="totalPagesAmount > 1" class="pagination pb-4">
        <div class="pagination-wrapper">
            <ul class="pagination-list flex items-center justify-center gap-2">
                <li>
                    <button
                        :disabled="currentPage === 1"
                        class="pagination-control"
                        aria-label="Go to first page"
                        @click="goToFirstPage"
                    >
                        <Icon name="material-symbols-light:keyboard-double-arrow-left" />
                    </button>
                </li>
                <li>
                    <button
                        :disabled="currentPage === 1"
                        class="pagination-control"
                        aria-label="Go to previous page"
                        @click="goToPreviousPage"
                    >
                        <Icon name="ic:baseline-keyboard-arrow-left" />
                    </button>
                </li>

                <li
                    v-for="page in visiblePages()"
                    :key="page"
                >
                    <button
                        class="rounded-full px-3 py-1 text-sm transition-colors hover:bg-gray-300"
                        :class="setBackgroundColorWhenButtonActive(page)"
                        :aria-label="`Go to page ${page}`"
                        @click="changePage(page)"
                    >
                        {{ page }}
                    </button>
                </li>

                <li>
                    <button
                        :disabled="currentPage === totalPagesAmount"
                        class="pagination-control"
                        aria-label="Go to next page"
                        @click="goToNextPage"
                    >
                        <Icon name="ic:baseline-keyboard-arrow-right" />
                    </button>
                </li>
                <li>
                    <button
                        :disabled="currentPage === totalPagesAmount"
                        class="pagination-control"
                        aria-label="Go to last page"
                        @click="goToLastPage"
                    >
                        <Icon name="si:double-arrow-right-duotone" />
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
