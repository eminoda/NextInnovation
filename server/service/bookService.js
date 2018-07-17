const BookDao = require('../dao/BookDao');
const bookDao = new BookDao();
const bookService = {
    saveBook: function (book) {
        return bookDao.insert(book);
    },
    findBookByName: function (name) {
        return bookDao.findOne({
            name: name
        });
    },
    findBooks: function (query) {
        return bookDao.find(query)
    }
}
module.exports = bookService;