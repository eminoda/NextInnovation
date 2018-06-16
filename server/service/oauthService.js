const githubConf = require('../conf/github.conf');
const HttpService = require('./httpService');
const utilService = require('./utilService');
const oauthService = {
    getAccessToken: function (options) {
        return new Promise((resolve, reject) => {
            new HttpService().request({
                url: 'https://github.com/login/oauth/access_token',
                method: 'POST',
                form: {
                    client_id: githubConf.client_id,
                    client_secret: githubConf.client_secret,
                    code: options.code,
                    redirect_uri: githubConf.redirect_uri,
                    state: options.state
                }
            }).then(data => {
                if (data.error) {
                    log.error(data.error);
                    reject(new Error(data.error));
                } else {
                    resolve(utilService.getGithubResponse(data));
                }
            }).catch(err => {
                reject(err);
            })
        })
    },
    getUserByAccessToken: function (access_token) {
        return new Promise((resolve, reject) => {
            new HttpService().request({
                headers: {
                    'User-Agent': 'my node',
                    'Authorization': 'token ' + access_token
                },
                url: 'https://api.github.com/user',
                qr: {
                    access_token: access_token
                }
            }).then(data => {
                resolve(JSON.parse(data));
            }).catch(err => {
                reject(err);
            })
        })
    }
}

module.exports = oauthService;