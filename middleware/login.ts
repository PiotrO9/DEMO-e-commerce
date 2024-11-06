export default async function () {
    try {
        await $fetch('/api/auth/check', {
            method: 'GET',
            credentials: 'include'
        });

        return navigateTo('/');
    }
    catch {
        // TODO
        // Dodac modal
    }
}
