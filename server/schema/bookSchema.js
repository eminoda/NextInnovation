const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    name: String,
    age: String,
    href: String,
    imageUrl: String
}, {
    collection: 'book'
})