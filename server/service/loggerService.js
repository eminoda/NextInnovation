const log4js = require('log4js');
const log4js_extend = require("log4js-extend");
log4js.configure(require('../conf/log.conf.js'));

log4js_extend(log4js, {
    path: __dirname,
    format: "at @name (@file:@line:@column)"
});

function getLogger(module) {
    return log4js.getLogger(module);
}
module.exports = getLogger;