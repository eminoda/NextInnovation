const log4js = require('log4js');
log4js.configure(require('../conf/log.conf.js'));

function getLogger(module) {
    return log4js.getLogger(module);
}
module.exports = getLogger;