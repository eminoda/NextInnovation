const Koa = require('koa');
const app = new Koa();
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
// router
const blogRouter = require('./router/blogRouter');

// middleware
app.use(koaNunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));
app.use(blogRouter.routes())
    .use(blogRouter.allowedMethods());

app.use(async ctx => {
    ctx.body = 'Hello World';
});

module.exports = app;