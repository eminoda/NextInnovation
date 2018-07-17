const BaseDao = require('./BaseDao');
const bookModel = require('../model/bookModel');

function BookDao() {
    BaseDao.call(this, bookModel);
    this.module = bookModel;
}
BookDao.prototype = new BaseDao();

module.exports = BookDao;