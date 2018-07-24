const BaseDao = require('./BaseDao');
const collectorModel = require('../model/collectorModel');

function CollectorDao() {
    BaseDao.call(this, collectorModel);
    this.module = collectorModel;
}
CollectorDao.prototype = new BaseDao();

module.exports = CollectorDao;