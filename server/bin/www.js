const logger = require('../service/loggerService')('app');

const app = require('../app');

const mongoService = require('../service/mongoService');

mongoService.connect().then(data => {
    logger.debug('连接成功');
}).catch(error => {
    logger.error(error);
})

app.listen(3000);