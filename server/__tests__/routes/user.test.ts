export {};

const dbHandler = require('../../__mocks__/db/mongoose');
const request = require('supertest');
const service = require('../../src/service');
const User = require('../../src/models/user');

const testUserId = '5d8c51d08a7fc5ae1f4531a2';
const invalidUserId = '000051d08a7fc5ae1f450000';

const testUser = {
    _id: testUserId,
    firstName: 'Test',
    lastName: 'User',
    username: 'TestUser',
    password: 'TestPassword101',
};

beforeAll(async () => {
    await dbHandler.connect();
});

beforeEach(async () => {
    await User.deleteMany();
    await new User(testUser).save();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

test('Can retrieve a valid user', async () => {
    await request(service)
        .get(`/user/${testUserId}`)
        .send()
        .expect(200);
});

test('Can not retrieve a invalid user', async () => {
    await request(service)
        .get(`/user/${invalidUserId}`)
        .send()
        .expect(404);
});

test('Can login with valid credentials', async () => {
    await request(service)
        .post('/user/login')
        .send({
            username: 'TestUser',
            password: 'TestPassword101',
        })
        .expect(200);
});

test('Can not login with invalid credentials', async () => {
    await request(service)
        .post('/user/login')
        .send({
            username: 'INVALID',
            password: 'CREDENTIALS',
        })
        .expect(400);
});

test('Can create a new user', async () => {
    const newUserId = '5d8c51d08a7fc5ae1f455555';

    const newUser = {
        _id: newUserId,
        firstName: 'New',
        lastName: 'User',
        username: 'NewUser',
        password: 'NewPassword101',
    };

    // create a new user
    await request(service)
        .post('/user')
        .send(newUser)
        .expect(201);

    // validate that they are in the database
    await request(service)
        .get(`/user/${newUserId}`)
        .send()
        .expect(200);
});

test('Can update an existing user', async () => {
    const response = await request(service)
        .patch(`/user/${testUserId}`)
        .send({
            firstName: 'Tester',
        });

    expect(response.body.firstName).toEqual('Tester');
});

test('Can not update an existing user with invalid fields', async () => {
    await request(service)
        .patch(`/user/${testUserId}`)
        .send({
            _id: invalidUserId,
        })
        .expect(400);
});

// plain text password security
test('Stored password should not be the same as plain text password', async () => {
    const user = await User.findOne({ username: testUser.username });

    expect(testUser.password).not.toEqual(user.password);
});
