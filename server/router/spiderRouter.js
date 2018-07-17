const logger = require('../service/loggerService')('spiderRouter');
const bookService = require('../service/bookService');
const spiderService = require('../service/spiderService');
const Router = require('koa-router');
const router = new Router();
router.prefix('/spider');

router.get('/add/books', async (ctx) => {
    let books = await spiderService.getBookBasicInfo() || [];
    for (let book of books) {
        let result = await bookService.findBookByName(book.name);
        // 添加不存在书籍
        if (!result) {
            let result = await bookService.saveBook(book);
        }
    }
    ctx.body = {
        success: true
    }
})

router.get('/query/books', async (ctx) => {
    let result = await bookService.findBooks({});
    ctx.body = {
        success: true,
        data: result
    }
})
module.exports = router;