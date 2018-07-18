const logger = require('../service/loggerService')('bookRouter');
const bookService = require('../service/bookService');
const Router = require('koa-router');
const router = new Router();
router.prefix('/book');

/**
 * 查询书籍列表
 * age 时间类别
 * page
 * pageSize
 */
router.get('/list', async (ctx) => {
    let page = ctx.query.page || 1;
    let pageSize = ctx.query.pageSize || 10;
    let age = ctx.query.age;
    let query = age ? {
        age: {
            $regex: age
        }
    } : {}

    let totalCount = await bookService.findBooks(query).count();
    let books = await bookService.findBooks(query).skip(page * pageSize).limit(pageSize);
    ctx.body = {
        success: true,
        books: books,
        totalCount: totalCount,
        page: page,
        pageSize: pageSize
    }
})

router.get('/detail/:id', async (ctx) => {
    let book = await bookService.findBookById(ctx.params.id);
    ctx.body = {
        success: true,
        book: book
    }
})
module.exports = router;