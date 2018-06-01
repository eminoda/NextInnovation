const userDao = require('../dao/userDao');

const userService = {
    userIsExist: function (user) {
        return userDao.findOne(user);
    }
}
module.exports = userService;