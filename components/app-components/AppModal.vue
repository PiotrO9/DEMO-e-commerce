<script setup lang='ts'>
const modalStore = useModalStore();

const isModalShown = computed(() => modalStore.isShown);
const title = computed(() => modalStore.title);
const description = computed(() => modalStore.description);
const iconName = computed(() => modalStore.iconName);
const backButtonText = computed(() => modalStore.backButtonText);
const extraButtonText = computed(() => modalStore.extraButtonText);
const extraButtonClickFunction = computed(() => modalStore.extraButtonClickFunction);

function handleModalClose() {
    modalStore.clearModal();
}
</script>

<template>
    <transition
        name="modal"
        enter-active-class="ease-out duration-300"
        leave-active-class="ease-in duration-200"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
    >
        <div v-if="isModalShown" class="fixed inset-0 z-50 flex items-center justify-center">
            <transition
                name="fade"
                enter-active-class="ease-out duration-300"
                leave-active-class="ease-in duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-70"
                leave-from-class="opacity-70"
                leave-to-class="opacity-0"
            >
                <div v-if="isModalShown" class="fixed inset-0 bg-black" @click="handleModalClose" />
            </transition>

            <div
                class="pointer-events-auto z-[2] flex w-full max-w-[calc(100dvw-40px)] flex-col items-center gap-5 rounded-lg bg-white p-8 shadow-lg sm:max-w-[min(65dvw,790px)]"
            >
                <Icon :name="iconName" class="size-16 fill-black" />
                <h2 class="text-center text-4xl font-bold">
                    {{ title }}
                </h2>
                <span class="text-center text-lg">
                    {{ description }}
                </span>
                <div class="flex gap-4">
                    <button class="base-button" @click="handleModalClose">
                        <span class="text-center font-bold text-white">
                            {{ backButtonText }}
                        </span>
                    </button>

                    <button v-if="extraButtonText" class="base-button" @click="extraButtonClickFunction">
                        <span class="text-center font-bold text-white">
                            {{ extraButtonText }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 0.7;
}
</style>
