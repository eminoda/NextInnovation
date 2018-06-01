const mongoose = require('mongoose');
const mongoService = require('@/service/mongoService');
const userService = require('@/service/userService');
const timeout = 60000;
describe('Test mongo', () => {
    beforeAll(() => {
        return mongoService.connect();
    }, timeout);
    afterAll((done) => {
        return mongoose.disconnect();
    }, 10000);

    test('user find', () => {
        expect.assertions(1);
        return userService.userIsExist({
            age: 28
        }).then(data => {
            expect(data).not.toBeNull();
        })
    }, timeout);
})