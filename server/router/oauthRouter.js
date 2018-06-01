const Router = require('koa-router');
const router = new Router();
const logger = require('../service/loggerService')('oauthRouter');

const userService = require('../service/userService');

router.prefix('/oauth');

router.get('/', async (ctx, next) => {
    const user = await userService.userIsExist({
        age: 28
    });

    ctx.body = {
        data: user
    }
})
// client_id 16814dd692fa1ee336e2
// redirect_uri http://localhost:3000/oauth
// https://github.com/login/oauth/authorize

// https://github.com/login/oauth/authorize?client_id=16814dd692fa1ee336e2&state=xxx&redirect_uri=http://localhost:3000/oauth
module.exports = router;