const bookModel = require('../model/bookModel');

const bookDao = {
    insert: function (book) {
        return bookModel.create(book);
    }
}
module.exports = bookDao;