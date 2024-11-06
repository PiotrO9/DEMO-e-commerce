export default defineEventHandler(async (event) => {
    try {
        deleteCookie(event, 'auth_flag');
    }
    catch {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Error but idk'
        }));
    }

    return {
        message: 'ok'
    };
});
