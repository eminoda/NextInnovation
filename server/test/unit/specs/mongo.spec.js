const mongoose = require('mongoose');
const mongoService = require('@/service/mongoService');
const userService = require('@/service/userService');
const spiderService = require('@/service/spiderService');
const timeout = 100000;
const logger = require('@/service/loggerService')('test');
describe('Test mongo', () => {
    beforeAll(() => {
        return mongoService.connect();
    }, timeout);
    afterAll((done) => {
        return mongoose.disconnect();
    }, timeout);
    test('book>>saveBook', () => {
        expect.assertions(1);
        return spiderService.getBookBasicInfo().then(data => {
            logger.debug(data);
            expect(data).not.toBeNull();
        })
    })
    // test('user >> findUserByName', () => {
    //     const user = {
    //         name: 'eminoda'
    //     }
    //     expect.assertions(1);
    //     return userService.findUserByName(user.name).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // });
    // test('user >> findUsers', () => {
    //     const query = {
    //         name: 'eminoda'
    //     }
    //     expect.assertions(1);
    //     return userService.findUsers(query).then(data => {
    //         logger.debug(data);
    //         expect(data.length).toBeGreaterThanOrEqual(1);
    //     })
    // });
    // test('user >> userIsExist', () => {
    //     const user = {
    //         name: 'eminoda'
    //     }
    //     expect.assertions(1);
    //     return userService.userIsExist(user).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // });
    // test('user >> saveUser', () => {
    //     const user = {
    //         name: 'test' + Math.round(Math.random() * 10),
    //         age: Math.round(Math.random() * 10)
    //     }
    //     expect.assertions(1);
    //     return userService.saveUser(user).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // });
    // test('user >> saveUsers', () => {
    //     const user = [{
    //         name: 'test' + Math.round(Math.random() * 10),
    //         age: Math.round(Math.random() * 10)
    //     }, {
    //         name: 'test' + Math.round(Math.random() * 10),
    //         age: Math.round(Math.random() * 10)
    //     }]
    //     expect.assertions(1);
    //     return userService.saveUsers(user).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // });
    // test('user >> updateUser', () => {
    //     const query = {
    //         age: {
    //             $lt: 100
    //         }
    //     }
    //     const user = {
    //         age: 33
    //     }
    //     expect.assertions(1);
    //     return userService.updateUser(query, user).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // })
    // test('user >> updateUsers', () => {
    //     const query = {
    //         age: {
    //             $lt: 100
    //         }
    //     }
    //     const user = {
    //         age: 44
    //     }
    //     expect.assertions(1);
    //     return userService.updateUsers(query, user).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // })
    // test('user >> deleteUser', () => {
    //     const query = {
    //         name: 'test2'
    //     }
    //     expect.assertions(1);
    //     return userService.deleteUser(query).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // })
    // test('user >> deleteUsers', () => {
    //     const query = {
    //         age: 44
    //     }
    //     expect.assertions(1);
    //     return userService.deleteUsers(query).then(data => {
    //         logger.debug(data);
    //         expect(data).not.toBeNull();
    //     })
    // })
})