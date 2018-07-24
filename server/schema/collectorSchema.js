const mongoose = require('mongoose');
const uuid = require('uuid/v1');
module.exports = new mongoose.Schema({
    id: {
        type: String,
        default: uuid
    },
    nickName: String,
    telephone: String,
    avatarUrl: String,
    city: String,
    country: String,
    gender: Number,
    province: String
}, {
    collection: 'collector',
    id: true
})