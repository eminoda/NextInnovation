const BookDao = require('../dao/BookDao');
const bookDao = new BookDao();
const bookService = {
    saveBook: function (book) {
        return bookDao.insert(book);
    },
    findBookById: function (id) {
        return bookDao.findOne({
            id: id
        })
    },
    findBookByName: function (name) {
        return bookDao.findOne({
            name: name
        });
    },
    findBooks: function (query) {
        return bookDao.find(query)
    },
    updateBookById: function (id, book) {
        return bookDao.update({
            id: id
        }, book);
    },
    deleteBooks: function () {
        return bookDao.deleteMany();
    }
}
module.exports = bookService;