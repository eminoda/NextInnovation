const userDao = require('../dao/userDao');

const userService = {
    // 用户是否存在
    userIsExist: function (user) {
        return userDao.findOne(user);
    },
    // 根据用户名查找用户
    findUserByName: function (name) {
        return userDao.findOne({
            name: name
        });
    },
    findUserById: function (id) {
        return userDao.findOne({
            id: id
        });
    },
    // 查询符合条件所有用户
    findUsers: function (query) {
        return userDao.find(query)
    },
    // 保存用户
    saveUser: function (user) {
        return userDao.insert(user);
    },
    // 批量保存用户
    saveUsers: function (users) {
        return userDao.insert(users);
    },
    // 更新用户
    updateUser: function (query, user) {
        return userDao.update(query, user);
    },
    // 批量更新用户
    updateUsers: function (query, user) {
        return userDao.updateMany(query, user);
    },
    // 删除用户
    deleteUser: function (query) {
        return userDao.deleteOne(query);
    },
    // 批量删除
    deleteUsers: function (query) {
        return userDao.deleteMany(query)
    }

}
module.exports = userService;