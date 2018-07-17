const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
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
// router register
app.use(indexRouter.routes()).use(indexRouter.allowedMethods());
app.use(blogRouter.routes()).use(blogRouter.allowedMethods());
app.use(oauthRouter.routes()).use(oauthRouter.allowedMethods());
app.use(spiderRouter.routes()).use(spiderRouter.allowedMethods());
app.use(bookRouter.routes()).use(bookRouter.allowedMethods());

app.use(async ctx => {
    ctx.body = 'Hello World';
});

module.exports = app;