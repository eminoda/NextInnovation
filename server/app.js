const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const logger = require('./service/loggerService')('app');
// router
const blogRouter = require('./router/blogRouter');
const indexRouter = require('./router/indexRouter');
const oauthRouter = require('./router/oauthRouter');
const spiderRouter = require('./router/spiderRouter');
const bookRouter = require('./router/bookRouter');

// middleware
app.use(serve(__dirname + '/public'));
app.use(koaNunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));
// hander error page
app.use(async (ctx, next) => {
    try {
        await next();
        // 接口请求
        if (ctx.header && ctx.header['content-type'] == 'application/json') {}
    } catch (err) {
        log.error(err);
        ctx.state.err = err;
        ctx.body = {
            success: false,
            err: err
        }
    }
})
// router register
app.use(indexRouter.routes()).use(indexRouter.allowedMethods());
app.use(blogRouter.routes()).use(blogRouter.allowedMethods());
app.use(oauthRouter.routes()).use(oauthRouter.allowedMethods());
app.use(spiderRouter.routes()).use(spiderRouter.allowedMethods());
app.use(bookRouter.routes()).use(bookRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    log.error(err);
});

module.exports = app;