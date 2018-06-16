const userModel = require('../model/userModel');

const userDao = {
    insert: function (user) {
        return userModel.create(user);
    },
    update: function (query, user) {
        return userModel.update(query, {
            $set: user
        });
    },
    updateMany: function (query, user) {
        return userModel.updateMany(query, {
            $set: user
        });
    },
    findOne: function (query) {
        return userModel.findOne(query);
    },
    find: function (query) {
        return userModel.find(query);
    },
    deleteOne: function (query) {
        return userModel.deleteOne(query);
    },
    deleteMany: function (query) {
        return userModel.deleteMany(query);
    }
}
module.exports = userDao;