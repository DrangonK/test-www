module.exports = () => {
    return async function cleanCache(ctx, next) {
        // 不确定是否有多余的设置，先设置了再说
        let headers = {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-store,max-age=0',
            'Expires': new Date('1970-01-01').toUTCString(),
            'Last-Modified': new Date('1970-01-01').toUTCString()
        };
        ctx.set(headers);
        await next();
    }
};