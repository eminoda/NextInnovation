const logger = require('../service/loggerService')('spiderRouter');
const bookService = require('../service/bookService');
const spiderService = require('../service/spiderService');
const Router = require('koa-router');
const router = new Router();
router.prefix('/spider');

router.get('/login', async (ctx) => {
    let result = await spiderService.login("http://www.997788.com/mini/user/check/checkuser_shop.php?V3B6Y1R3G855412");
    ctx.body = {
        success: true,
        data: result
    }
})

router.get('/delete/books', async (ctx) => {
    let result = await bookService.deleteBooks();
    ctx.body = {
        success: true,
        data: result
    }
})

router.get('/add/books/:totalPage', async (ctx) => {
    let cookies = await spiderService.login("http://www.997788.com/mini/user/check/checkuser_shop.php?V3B6Y1R3G855412");
    cookies = cookieToStr(cookies);
    let totalPage = ctx.params.totalPage;
    let pageUrl = "http://www.997788.com/5709/all_3_102_5330/";
    for (let page = 1; page <= totalPage; page++) {
        // 请求下一页
        logger.info('pageUrl:' + pageUrl);
        if (page > 5) {
            console.log(1);
        }
        // 获取页面book列表
        let books = await spiderService.getBookBasicInfo(pageUrl, cookies) || [];
        for (let book of books) {
            let result = await bookService.findBookByName(book.name);
            // 添加不存在书籍
            if (!result) {
                let result = await bookService.saveBook(book);
            }
        }
        pageUrl = await spiderService.getNextPage(pageUrl, cookies);
        pageUrl = 'http://www.997788.com/5709/all_3_102_5330/?' + pageUrl;
    }
    ctx.body = {
        success: true
    }
})

router.get('/add/bookDetail', async (ctx) => {
    let books = await bookService.findBooks();
    let result;
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        logger.debug(book);
        // 有图片详情
        if (book.detailImageUrls && book.detailImageUrls.length == 0) {
            let detailImageUrls = await spiderService.getBookDetail({
                page: book.href
            });
            result = await bookService.updateBookById(book.id, {
                detailImageUrls: detailImageUrls
            })
        } else {
            result = {}
        }
    }

    ctx.body = {
        success: true,
        data: result
    }
})

router.get('/add/book/:id', async (ctx) => {
    let id = ctx.params.id;
    let book = await bookService.findBookById(id);
    logger.debug(book);
    let result;
    if (book.detailImageUrls && book.detailImageUrls.length == 0) {
        let detailImageUrls = await spiderService.getBookDetail({
            page: book.href
        });
        result = await bookService.updateBookById(book.id, {
            detailImageUrls: detailImageUrls
        })
    }
    ctx.body = {
        success: true,
        data: result
    }
})

function cookieToStr(cookies) {
    let cookieStr = '';
    for (let i = 0; i < cookies.length; i++) {
        cookieStr = cookieStr + cookies[i] + ';'
    }
    return cookieStr;
}
module.exports = router;