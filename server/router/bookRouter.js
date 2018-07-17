const logger = require('../service/loggerService')('bookRouter');
const bookService = require('../service/bookService');
const Router = require('koa-router');
const router = new Router();
router.prefix('/book');

router.get('/list', async (ctx) => {
    let age = ctx.query.age;
    let result = await bookService.findBooks({
        age: {
            $regex: age
        }
    });
    ctx.body = {
        success: true,
        data: result
    }
})
module.exports = router;