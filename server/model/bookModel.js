const mongoose = require('mongoose');
const bookSchema = require('../schema/bookSchema');

module.exports = mongoose.model('book', bookSchema);