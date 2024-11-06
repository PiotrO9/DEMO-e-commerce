import { navigateTo, useRouter } from '#app';

export default defineNuxtPlugin(() => {
    const router = useRouter();

    router.beforeEach(async (to) => {
        const publicRoutes = ['/login'];

        if (publicRoutes.includes(to.path)) {
            return true;
        }

        try {
            await $fetch('/api/auth/check', {
                method: 'GET',
                credentials: 'include'
            });

            return true;
        }
        catch {
            return navigateTo('/login');
        }
    });
});
