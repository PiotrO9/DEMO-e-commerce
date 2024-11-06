export default defineEventHandler((event) => {
    const authFlag = getCookie(event, 'auth_flag');

    if (authFlag === 'true') {
        return { authenticated: true };
    }

    return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
    }));
});
