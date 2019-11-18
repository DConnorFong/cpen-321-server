export {};

const dbHandler = require('../../__mocks__/db/mongoose');
const request = require('supertest');
const mongoose = require('mongoose');
const service = require('../../src/service');
const Group = require('../../src/models/group');
const User = require('../../src/models/user');

const testGroupId = mongoose.Types.ObjectId();
const invalidGroupId = mongoose.Types.ObjectId();

const groupMember1 = mongoose.Types.ObjectId();
const groupMember2 = mongoose.Types.ObjectId();
const groupMember3 = mongoose.Types.ObjectId();

const testGroup = {
    _id: testGroupId,
    members: [groupMember1],
    courses: [],
    meeting_times: [],
};

const testUser = {
    _id: groupMember1,
    firstName: 'Chat',
    lastName: 'Test',
    username: 'TestUser',
    password: 'TestPassword101',
    courses: [],
    groups: [testGroupId],
};

beforeAll(async () => {
    await dbHandler.connect();
});

beforeEach(async () => {
    await Group.deleteMany();
    await User.deleteMany();
    await new Group(testGroup).save();
    await new User(testUser).save();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

test('Can retrieve a valid group', async () => {
    await request(service)
        .get(`/group/${testGroupId}`)
        .send()
        .expect(200);
});

test('Can not retrieve an invalid group', async () => {
    await request(service)
        .get(`/group/${invalidGroupId}`)
        .send()
        .expect(404);
});

test('Can create a new group', async () => {
    const newGroupId = mongoose.Types.ObjectId();

    await request(service)
        .post('/group')
        .send({
            _id: newGroupId,
            members: [groupMember1],
            courses: [],
            meeting_times: [],
        })
        .expect(201);
});

test('Can modify an existing group using valid parameters', async () => {
    const response = await request(service)
        .patch(`/group/${testGroupId}`)
        .send({
            members: [groupMember2],
        })
        .expect(200);

    expect(response.body.members[0]).toEqual(groupMember2.toString());
});

test('Can not modify an existing group using invalid parameters', async () => {
    await request(service)
        .patch(`/group/${testGroupId}`)
        .send({
            _id: invalidGroupId,
        })
        .expect(400);
});
