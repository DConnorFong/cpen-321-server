export {};

const dbHandler = require('../../__mocks__/db/mongoose');
const request = require('supertest');
const mongoose = require('mongoose');
const service = require('../../src/service');
const Chat = require('../../src/models/chat');
const Group = require('../../src/models/group');
const User = require('../../src/models/user');

const testGroupId = mongoose.Types.ObjectId();
const invalidGroupId = mongoose.Types.ObjectId();

const groupMember1 = mongoose.Types.ObjectId();
const groupMember2 = mongoose.Types.ObjectId();
const groupMember3 = mongoose.Types.ObjectId();

const testGroup = {
    _id: testGroupId,
    members: [groupMember1, groupMember2, groupMember3],
    courses: [],
    meeting_times: [],
};

const testChat = {
    groupId: testGroupId,
    messages: [],
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
    await Chat.deleteMany();
    await User.deleteMany();
    await new Group(testGroup).save();
    await new Chat(testChat).save();
    await new User(testUser).save();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

test('Can retrieve a valid chat', async () => {
    await request(service)
        .get(`/chat/group/${testGroupId}`)
        .send()
        .expect(200);
});

test('Can not retrieve an invalid chat', async () => {
    await request(service)
        .get(`/chat/group/${invalidGroupId}`)
        .send()
        .expect(404);
});

test('Can retrieve all users of a valid chat', async () => {
    const response = await request(service)
        .get(`/chat/group/${testGroupId}/user`)
        .send()
        .expect(200);

    expect(response.body[0]).toEqual(groupMember1.toString());
    expect(response.body[1]).toEqual(groupMember2.toString());
    expect(response.body[2]).toEqual(groupMember3.toString());
});

test('Can create a new chat object', async () => {
    await request(service)
        .post('/chat')
        .send({
            groupId: mongoose.Types.ObjectId(),
            messages: [],
        })
        .expect(201);
});

test('Can retrieve a user-specific chat object', async () => {
    const response = await request(service)
        .get(`/chat/user/${groupMember1}`)
        .send()
        .expect(200);

    expect(response.body[0].groupId).toEqual(testGroupId.toString());
});

test('Can send a new chat message', async () => {
    const response = await request(service)
        .post('/chat/message')
        .send({
            groupId: testGroupId,
            userId: groupMember1,
            message: 'Hello this is a test!',
        })
        .expect(201);

    expect(response.body.message).toEqual('Hello this is a test!');
});
