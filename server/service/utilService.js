const log4js = require('log4js');

const utilService = {
    getGithubResponse: function (responseStr) {
        let response = {};
        let responseArr = responseStr ? responseStr.split('&') : [];
        for (let i = 0; i < responseArr.length; i++) {
            let key = responseArr[i].split('=')[0];
            let value = responseArr[i].split('=')[1];
            response[key] = value;
        }
        return response;
    },
    // 记录访问日志
    recordAccessLogger: function (ctx, level, options = {}) {
        const log = log4js.getLogger('access');
        const space = ' ';
        const uid = ctx.cookies.get('uid') || '-';
        const remote_addr = ctx.ip || '-';
        const request_method = ctx.method;
        const request_data = ctx.method.toLocaleUpperCase() == 'GET' ? JSON.stringify(ctx.querystring || {}) : JSON.stringify(ctx.body || {});
        const request_url = ctx.path;
        const request_agent = ctx.headers['user-agent'] || '-';
        const http_protocol = ctx.protocol;
        const response_status = ctx.status;
        const response_time = options.response_time;
        log.info(
            uid + space +
            remote_addr + space +
            request_method + space +
            request_data + space +
            request_url + space +
            request_agent + space +
            http_protocol + space +
            response_status + space +
            response_time)
    }
}
module.exports = utilService;