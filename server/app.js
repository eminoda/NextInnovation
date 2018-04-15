const Koa = require('koa');
const app = new Koa();
// router
const blogRouter = require('./router/blogRouter');

// middleware
app.use(blogRouter.routes())
    .use(blogRouter.allowedMethods());

app.use(async ctx => {
    ctx.body = 'Hello World';
});

module.exports = app;