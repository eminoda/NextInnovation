const userModel = require('../model/userModel');

const userDao = {
    insertOne: function () {

    },
    findOne: function (query) {
        return userModel.findOne(query);
    }
}
module.exports = userDao;