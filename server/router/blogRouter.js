const Router = require('koa-router');
const router = new Router();
const markdown = require('markdown').markdown;
const fs = require('fs');
router.prefix('/blog');

router.get('/:markdownName', async (ctx, next) => {
    const markdownName = ctx.params.markdownName;
    try {
        const content = await markdown.toHTML(fs.readFileSync(`./blogs/${markdownName}.md`, {
            encoding: 'utf-8'
        }));
        await ctx.render('blog', {
            content: content
        });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;