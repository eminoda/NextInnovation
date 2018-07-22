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
        },
        isSelled: 0
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
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
/**
 * 查询具体书籍
 * id
 */
router.get('/detail/:id', async (ctx) => {
    logger.info(ctx.query);
    try {
        let book = await bookService.findBookById(ctx.params.id);
        ctx.body = {
            success: true,
            book: book
        }
    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})

router.get('/vagueList', async (ctx) => {
    logger.info(ctx.query);
    let name = ctx.query.name;
    let page = ctx.query.page || 1;
    let pageSize = ctx.query.pageSize || 10;
    let query = {};
    if (name) {
        query.name = {
            $regex: name
        }
        query.isSelled = 0;
    }
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
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
router.get('/allListByName', async (ctx) => {
    logger.info(ctx.query);
    let name = ctx.query.name;
    let page = ctx.query.page || 1;
    let pageSize = ctx.query.pageSize || 10;
    let query = {};
    if (name) {
        query.name = {
            $regex: name
        }
    }
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
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
router.post('/delete', async (ctx) => {
    try {
        let id = ctx.request.body.id;
        if (id) {
            let result = await bookService.deleteBook({
                id: id
            }, {
                isSelled: 1
            });
            ctx.body = {
                success: true,
                book: result
            }
        } else {
            throw new Error('参数不合法');
        }
    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})

router.post('/recover', async (ctx) => {
    try {
        let id = ctx.request.body.id;
        if (id) {
            let result = await bookService.updateBookById(id, {
                isSelled: 0
            });
            ctx.body = {
                success: true,
                book: result
            }
        } else {
            throw new Error('参数不合法');
        }
    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
module.exports = router;