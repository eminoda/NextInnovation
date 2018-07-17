const logger = require('../service/loggerService')('spiderRouter');
const bookService = require('../service/bookService');
const spiderService = require('../service/spiderService');
const Router = require('koa-router');
const router = new Router();
router.prefix('/spider');

router.get('/add/books/:page', async (ctx) => {
    let page = ctx.params.page;
    let books = await spiderService.getBookBasicInfo(page) || [];
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

router.get('/add/bookDetail', async (ctx) => {
    let book = await spiderService.getBookDetail({
        page: 'http://www.997788.com/5709/auction_102_17680840.html'
    });
    ctx.body = {
        success: true,
        book: book
    }
})
module.exports = router;