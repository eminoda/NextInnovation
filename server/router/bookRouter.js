const logger = require('../service/loggerService')('bookRouter');
const bookService = require('../service/bookService');
const Router = require('koa-router');
const router = new Router();
router.prefix('/book');

router.get('/list', async (ctx) => {
    let query = ctx.query;
    let result = await bookService.findBooks(query);
    ctx.body = {
        success: true,
        data: result
    }
})
module.exports = router;