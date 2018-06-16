const request = require('request')
const logger = require('./loggerService')('httpService');

function HttpService() {

}

HttpService.prototype.request = function (options) {
    logger.debug(options);
    return new Promise((resolve, reject) => {
        try {
            request(options, function (err, response, body) {
                if (err) {
                    logger.error(err);
                    reject(err);
                } else {
                    try {
                        resolve(body);
                    } catch (err) {
                        logger.error(err);
                        reject(err);
                    }
                }
            })
        } catch (err) {
            logger.error(err);
            reject(err);
        }
    })
}

module.exports = HttpService;