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
    detailImageUrls: [], //详情图片
    desc: String, //描述
    isSelled: Number //0  出售中，1 已卖出
}, {
    collection: 'book',
    id: true
})