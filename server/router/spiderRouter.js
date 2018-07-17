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
    let id = '17ae3d00-89de-11e8-8e97-3131e50ef046';
    let book = await bookService.findBookById(id);
    let detailImageUrls = await spiderService.getBookDetail({
        page: book.href
    });
    let result = await bookService.updateBookById(id, {
        detailImageUrls: detailImageUrls
    })
    ctx.body = {
        success: true,
        book: result
    }
})
module.exports = router;