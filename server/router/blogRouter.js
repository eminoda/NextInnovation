const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const markdown = require('markdown').markdown;

router.prefix('/blog');

router.get('/', (ctx, next) => {
    try {
        ctx.body = markdown.toHTML(fs.readFileSync('./blogs/nextInnovation.md', {
            encoding: 'utf-8'
        }));
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;