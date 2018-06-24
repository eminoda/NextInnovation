const Router = require('koa-router');
const router = new Router();
const logger = require('../service/loggerService')('oauthRouter');
const githubConf = require('../conf/github.conf');
const userService = require('../service/userService');
const oauthService = require('../service/oauthService');
const jwt = require('jsonwebtoken');
router.prefix('/oauth');

// 开始授权
router.get('/', async (ctx, next) => {
    let client_id = githubConf.client_id;
    let redirect_uri = githubConf.redirect_uri;
    let state = 123456; //TODO 加密
    // 通过github，重定向到指定路径
    console.log(ctx.query.backUrl || ctx.query.backurl);
    let third_redirect_uri = '?backUrl=' + githubConf.blog_uri + jwt.decode(decodeURIComponent(ctx.query.backUrl || ctx.query.backurl), 'hexo');
    console.log(third_redirect_uri);
    ctx.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}${third_redirect_uri}`);
})

// 
router.get('/authorize', async (ctx, next) => {
    // 校验链接参数
    let backUrl = ctx.query.backUrl;
    let state = ctx.query.state;
    let code = ctx.query.code;
    let accessObj = await oauthService.getAccessToken({
        state,
        code
    })
    if (accessObj && accessObj.access_token) {
        const githubUser = await oauthService.getUserByAccessToken(accessObj.access_token);
        if (githubUser) {
            const existUser = await userService.findUserById(githubUser.id);
            if (existUser) {
                ctx.body = existUser;
            } else {
                githubUser.name = githubUser.login;
                const result = await userService.saveUser(githubUser);
                ctx.body = result;
            }
            // 登录状态保存
            ctx.redirect(backUrl);
        } else {
            ctx.body = '授权失败，用户错误'
        }
    } else {
        ctx.body = '授权失败';
    }
})
module.exports = router;