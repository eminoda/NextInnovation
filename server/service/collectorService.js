const CollectorDao = require('../dao/CollectorDao');
const collectorDao = new CollectorDao();
const collectorService = {
    saveCollector: function (collector) {
        return collectorDao.insert(collector);
    },
    findCollectors: function () {
        return collectorDao.find();
    },
    findCollectorById: function (id) {
        return collectorDao.findOne({
            id: id
        });
    },
    findCollectorByNickName: function (nickName) {
        return collectorDao.findOne({
            nickName: nickName
        });
    },
    findBookByTelephone: function (telephone) {
        return collectorDao.findOne({
            telephone: telephone
        });
    },
    // 更新用户
    updateCollector: function (query, collector) {
        return collectorDao.update(query, collector);
    }
}
module.exports = collectorService;