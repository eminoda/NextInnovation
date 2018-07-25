const logger = require('../service/loggerService')('bookRouter');
const collectorService = require('../service/collectorService');
const Router = require('koa-router');
const router = new Router();

router.prefix('/collector');

/**
 * 查询收藏家信息By Id
 */
router.get('/:id', async (ctx) => {
    logger.info(ctx.request.body);
    try {
        let id = ctx.params.id;
        if (!id) throw new Error('参数不正确');
        let isExist = await collectorService.findCollectorById(id);
        if (!isExist) throw new Error('用户不存在');
        ctx.body = {
            success: true,
            collector: isExist
        }
    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
/**
 * 查询收藏家信息By nickName
 */
router.get('/webcat/:nickName', async (ctx) => {
    logger.info(ctx.request.body);
    try {
        let nickName = ctx.params.nickName;
        if (!nickName) throw new Error('参数不正确');
        let isExist = await collectorService.findCollectorByNickName(nickName);
        ctx.body = {
            success: true,
            data: isExist
        }

    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
/**
 * 新增收藏家
 */
router.post('/add', async (ctx) => {
    logger.info(ctx.request.body);
    try {
        let collector = {
            telephone: ctx.request.body.telephone || '',
            nickName: ctx.request.body.nickName || '',
            avatarUrl: ctx.request.body.avatarUrl || '',
            city: ctx.request.body.city || '',
            country: ctx.request.body.country || '',
            gender: ctx.request.body.gender || '',
            province: ctx.request.body.province || '',
        };
        collector.isAdmin = 0;
        if (!collector.nickName) {
            throw new Error('用户信息获取失败');
        }
        // 已存在，则直接返回用户信息
        let isExist = await collectorService.findCollectorByNickName(collector.nickName);
        if (isExist) throw new Error('用户已存在');
        let result = await collectorService.saveCollector(collector);
        ctx.body = {
            success: true,
            data: result
        }
    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
/**
 * 绑定收藏家 手机号 By Id
 */
router.post('/bind/:id', async (ctx) => {
    try {
        let telephone = ctx.request.body.telephone;
        let id = ctx.params.id;
        if (!telephone) {
            throw new Error('参数不正确');
        } else {
            let isExist = await collectorService.findCollectorById(id);
            if (!isExist) throw new Error('用户不存在');

            let result = await collectorService.updateCollector({
                id: id
            }, {
                telephone: telephone
            })
            ctx.body = {
                success: true,
                data: result
            }
        }

    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})
module.exports = router;