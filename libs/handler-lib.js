const handler = (lambda) => {
    return async function (event, context) {
        let body, statusCode;

        try {
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            body = { error: e.message };
            statusCode = 500;
        }

        // Return HTTP response
        return {
            statusCode,
            headers: {
                "X-Requested-With": '*',
                "Access-Control-Allow-Headers": '*',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": '*',
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(body),
        };
    };
};

export{
    handler
};