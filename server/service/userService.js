const userDao = require('../dao/userDao');

const userService = {
    userIsExist: function (user) {
        return userDao.findOne(user);
    },
    findUserByName: function (name) {
        return userDao.findOne({
            name: name
        });
    },
    findUsers: function (query) {
        return userDao.find(query)
    },
    saveUser: function (user) {
        return userDao.insert(user);
    },
    saveUsers: function (users) {
        return userDao.insert(users);
    },
    updateUser: function (query, user) {
        return userDao.update(query, user);
    },
    updateUsers: function (query, user) {
        return userDao.updateMany(query, user);
    },
    deleteUser: function (query) {
        return userDao.deleteOne(query);
    },
    deleteUsers: function (query) {
        return userDao.deteteMany(query)
    }

}
module.exports = userService;