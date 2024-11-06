interface bodyLoginModel {
    login: string;
    password: string;
}

export default defineEventHandler(async (event) => {
    const { login, password } = await readBody<bodyLoginModel>(event);

    if (login != 'admin' && password != 'admin') {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Invalid Credentials'
        }));
    }

    setCookie(event, 'auth_flag', 'true', {
        httpOnly: true,
        maxAge: 60 * 60 * 24
    });

    return {
        message: 'ok'
    };
});
