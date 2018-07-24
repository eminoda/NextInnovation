const logger = require('../service/loggerService')('bookRouter');
const collectorService = require('../service/collectorService');
const Router = require('koa-router');
const router = new Router();

router.prefix('/collector');

router.post('/add', async (ctx) => {
    try {
        let collector = {
            telephone: ctx.request.body.telephone,
            nickName: ctx.request.body.nickName,
            avatarUrl: ctx.request.body.avatarUrl,
            city: ctx.request.body.city,
            country: ctx.request.body.country,
            gender: ctx.request.body.gender,
            province: ctx.request.body.province,
        };
        let isExist = await collectorService.findBookByNickName(collector.nickName);
        if (isExist) {
            throw new Error('用户已存在');
        } else {
            let result = await collectorService.saveCollector(collector);
            ctx.body = {
                success: true,
                collector: result
            }
        }
    } catch (err) {
        ctx.body = {
            success: false,
            err: err.message
        }
    }
})

router.post('/:id', async (ctx) => {
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