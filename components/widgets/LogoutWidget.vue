<script setup lang='ts'>
function handleLogout() {
    $fetch('/api/auth/logout').then(() => {
        navigateTo('/login');
    }).catch(() => {
        // TODO
        // SHOW NOTIFICATION
    });
}
</script>

<template>
    <div>
        <Icon name="material-symbols:logout" class="white-icon size-8 cursor-pointer" @click="handleLogout" />
    </div>
</template>
