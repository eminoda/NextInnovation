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
    logger.info(ctx.query);
    let page = ctx.query.page || 1;
    let pageSize = ctx.query.pageSize || 10;
    let age = ctx.query.age;
    let query = age ? {
        age: {
            $regex: age
        }
    } : {}
    try {
        let totalCount = await bookService.findBooks(query).count();
        let books = await bookService.findBooks(query).skip((page - 1) * pageSize).limit(Number(pageSize));
        ctx.body = {
            success: true,
            books: books,
            totalCount: totalCount,
            page: page,
            pageSize: pageSize
        }
    } catch (err) {
        next(err)
    }
})
/**
 * 查询具体书籍
 * id
 */
router.get('/detail/:id', async (ctx) => {
    let book = await bookService.findBookById(ctx.params.id);
    ctx.body = {
        success: true,
        book: book
    }
})

router.get('/vagueList', async (ctx) => {
    let name = ctx.query.name;
    let page = ctx.query.page || 1;
    let pageSize = ctx.query.pageSize || 10;
    let query = {
        name: {
            $regex: name
        }
    }
    let totalCount = await bookService.findBooks(query).count();
    let books = await bookService.findBooks(query).skip((page - 1) * pageSize).limit(Number(pageSize));
    ctx.body = {
        success: true,
        books: books,
        totalCount: totalCount,
        page: page,
        pageSize: pageSize
    }
})
module.exports = router;