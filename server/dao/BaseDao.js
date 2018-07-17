function BaseDao(module) {
    this.module = module;
}
// 增加数据
BaseDao.prototype.insert = function (document) {
    return this.module.create(document);
}
// 更新数据
BaseDao.prototype.update = function (query, document) {
    return this.module.update(query, {
        $set: document
    });
}
// 更新多条
BaseDao.prototype.updateMany = function (query, document) {
    return this.module.updateMany(query, {
        $set: document
    });
}
// 查询一条
BaseDao.prototype.findOne = function (query) {
    return this.module.findOne(query);
}
// 查询多条
BaseDao.prototype.find = function (query) {
    return this.module.find(query);
}
// 删除一条
BaseDao.prototype.deleteOne = function (query) {
    return this.module.deleteOne(query);
}
// 删除多条
BaseDao.prototype.deleteMany = function (query) {
    return this.module.deleteMany(query);
}
module.exports = BaseDao;