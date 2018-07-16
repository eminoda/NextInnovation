const bookDao = require('../dao/bookDao');

const bookService = {
    saveBook: function (book) {
        return bookDao.insert(book);
    }

}
module.exports = bookService;