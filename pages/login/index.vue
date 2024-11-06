<script setup lang='ts'>
const loginInput = ref('');
const passwordInput = ref('');

definePageMeta({
    middleware: 'login'
});

async function handleLoginSubmit() {
    try {
        await $fetch('/api/auth/login', {
            method: 'post',
            body: {
                login: loginInput.value,
                password: passwordInput.value
            }
        });

        navigateTo('/');
    }
    catch {
        const modalStore = useModalStore();

        modalStore.showModal(
            'Invalid credentials',
            'Login or password are wrong',
            'material-symbols:error',
            'Back'
        );
    }
}
</script>

<template>
    <div class="flex size-[200px] flex-col gap-2">
        <h1 class="text-center text-2xl font-bold">
            Login
        </h1>
        <input v-model="loginInput" type="text" class="base-input w-full" placeholder="Login">
        <input v-model="passwordInput" type="password" class="base-input w-full" placeholder="Password">
        <button class="base-button justify-center" @click="handleLoginSubmit">
            Login
        </button>
    </div>
</template>
