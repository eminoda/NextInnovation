const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    name: String,
    age: String,
    href: String,
    imageUrl: String, //标题图片
    detailImageUrls: []
}, {
    collection: 'book'
})