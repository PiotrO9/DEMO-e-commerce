<script setup lang="ts">
const error = useError();
</script>

<template>
    <div class="wrapper">
        <h1>Error {{ error?.statusCode }}</h1>
        <NuxtLink to="/">
            Home page
        </NuxtLink>
    </div>
</template>
