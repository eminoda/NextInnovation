const Router = require('koa-router');
const router = new Router();
router.prefix('/');

router.get('/', async (ctx) => {
    await ctx.render('index');
})

module.exports = router;