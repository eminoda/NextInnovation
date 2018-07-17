const mongoose = require('mongoose');
const uuid = require('uuid/v1');
module.exports = new mongoose.Schema({
    id: {
        type: String,
        default: uuid
    },
    name: String,
    age: String,
    href: String,
    imageUrl: String, //标题图片
    detailImageUrls: []
}, {
    collection: 'book',
    id: true
})