const logger = require('./loggerService')('mongoService');
const mongoConf = require('../conf/mongo.conf');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const options = {
    user: mongoConf.user,
    pass: mongoConf.pass,
    poolSize: 10,
    autoReconnect: true,
    reconnectTries: true,
    reconnectInterval: 5000,
    bufferMaxEntries: false
}
// verbose mongodb sql 
mongoose.set('debug', true)

const mongoService = {
    connect: function () {
        logger.debug('创建连接...');
        return mongoose.connect(mongoConf.url, options);
    },
    disconnect: function () {
        logger.debug('关闭连接...');
        return mongoose.disconnect();
    }
}

module.exports = mongoService