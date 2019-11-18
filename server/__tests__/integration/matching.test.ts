export {};

const dbHandler = require('../../__mocks__/db/mongoose');
const request = require('supertest');
const service = require('../../src/service');

const User = require('../../src/models/user');
const Group = require('../../src/models/group');

let cpenOgId;
let perfectMatchId;
let goodMatchUserId;

beforeAll(async () => {
    await dbHandler.connect();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

test('Initialize Group and User DBs', async () => {
    await User.deleteMany();
    await Group.deleteMany();

    const awfulMatchGroup = new Group({
        members: ['dummyUserID1', 'dummyUserID2'],
        courses: ['BLAH200', 'BLAH201', 'BLAH202'],
        meeting_times: [
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '10000000000000000000000000000',
        ],
        names: ['dummyUser1', 'dummyUser2'],
    });

    await awfulMatchGroup.save();
});

test('A user with no matches should have their own group created', async () => {
    const CpenOG = new User({
        firstName: 'CPEN',
        lastName: 'OG',
        username: 'CPENOG',
        password: '123ABC',
        courses: ['ELEC221', 'CPEN321', 'CPEN311', 'CPEN331'],
        groups: [],
        schedule: [
            '11111111111111111111111111111',
            '11111111111110000011111111111',
            '11111111110001111111111111111',
            '11111111111110011111111111111',
            '11111111110001111111111111111',
            '11111110000110011111111111111',
            '11111111111111111111111111111',
        ],
    });

    await CpenOG.save();

    cpenOgId = CpenOG._id.toString();

    const response = await request(service)
        .post(`/user/${CpenOG._id}/match`)
        .send();

    const body = response.body;

    // Check group is added to user
    const CpenOGAfter = await User.findOne({ _id: CpenOG._id });
    expect(CpenOGAfter.groups[0].toString()).toEqual(body._id);

    // Check group members
    expect(body.members).toEqual([cpenOgId]);

    // Check group courses
    body.courses.forEach(course => {
        expect(CpenOG.courses.includes(course.toString())).toBe(true);
    });
    expect(body.courses.length).toEqual(CpenOG.courses.length);

    // Check group meeting times
    body.meeting_times.forEach(day => {
        expect(CpenOG.schedule.includes(day.toString())).toBe(true);
    });
    expect(body.meeting_times.length).toEqual(CpenOG.schedule.length);

    // Check group names
    expect(body.names).toEqual([`${CpenOG.firstName} ${CpenOG.lastName}`]);
});

test('A perfect match will join the correct group', async () => {
    const decentMatchGroup = new Group({
        members: ['dummyUserID1', 'dummyUserID2'],
        courses: ['ELEC221', 'CPEN331', 'NOPE111', 'NOPE222'],
        meeting_times: [
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '10000000000000000000000000000',
            '11111111110001111111111111111',
            '11111110000110011111111111111',
            '11111111111111111111111111111',
        ],
        names: ['dummyUser1', 'dummyUser2'],
    });

    await decentMatchGroup.save();

    const perfectMatchUser = new User({
        firstName: 'Perfect',
        lastName: 'Match',
        username: 'PerfectMatch',
        password: '123ABC',
        courses: ['ELEC221', 'CPEN321', 'CPEN311', 'CPEN331'],
        groups: [],
        schedule: [
            '11111111111111111111111111111',
            '11111111111110000011111111111',
            '11111111110001111111111111111',
            '11111111111110011111111111111',
            '11111111110001111111111111111',
            '11111110000110011111111111111',
            '11111111111111111111111111111',
        ],
    });

    await perfectMatchUser.save();

    perfectMatchId = perfectMatchUser._id.toString();

    const response = await request(service)
        .post(`/user/${perfectMatchUser._id}/match`)
        .send();

    const body = response.body;

    // Check group is added to user
    const perfectMatchUserAfter = await User.findOne({ _id: perfectMatchUser._id });
    expect(perfectMatchUserAfter.groups[0].toString()).toEqual(body._id);

    // Check group members
    expect(body.members).toEqual([cpenOgId, perfectMatchId]);

    // Check group courses
    body.courses.forEach(course => {
        expect(perfectMatchUser.courses.includes(course.toString())).toBe(true);
    });
    expect(body.courses.length).toEqual(perfectMatchUser.courses.length);

    // Check group meeting times
    body.meeting_times.forEach(day => {
        expect(perfectMatchUser.schedule.includes(day.toString())).toBe(true);
    });
    expect(body.meeting_times.length).toEqual(perfectMatchUser.schedule.length);

    // Check group names
    expect(body.names).toEqual([`CPEN OG`, `${perfectMatchUser.firstName} ${perfectMatchUser.lastName}`]);
});

test('A good match will join the correct group', async () => {
    const goodMatchUser = new User({
        firstName: 'Good',
        lastName: 'Match',
        username: 'GoodMatch',
        password: '123ABC',
        courses: ['ELEC221', 'CPEN321', 'CPEN311', 'DUST666'],
        groups: [],
        schedule: [
            '10000000000000000000000000000',
            '11111111111110000011111111111',
            '11111111110001111111111111111',
            '11100001111110011111000011111',
            '11111111110001111111111111111',
            '11111110000110011111111111111',
            '10000000000000000000000000000',
        ],
    });

    await goodMatchUser.save();

    goodMatchUserId = goodMatchUser._id.toString();

    const response = await request(service)
        .post(`/user/${goodMatchUser._id}/match`)
        .send();

    const body = response.body;

    // Check group is added to user
    const goodMatchUserAfter = await User.findOne({ _id: goodMatchUser._id });
    expect(goodMatchUserAfter.groups[0].toString()).toEqual(body._id);

    // Check group members
    expect(body.members).toEqual([cpenOgId, perfectMatchId, goodMatchUserId]);

    // Check group courses
    body.courses.forEach(course => {
        expect(goodMatchUser.courses.includes(course.toString())).toBe(true);
    });
    expect(body.courses.length).toEqual(3);

    // Check group meeting times
    body.meeting_times.forEach(day => {
        expect(goodMatchUser.schedule.includes(day.toString())).toBe(true);
    });
    expect(body.meeting_times.length).toEqual(goodMatchUser.schedule.length);

    // Check group names
    expect(body.names).toEqual([`CPEN OG`, `Perfect Match`, `${goodMatchUser.firstName} ${goodMatchUser.lastName}`]);
});

test('A user will not join groups they are already in', async () => {
    const goodMatchUser = await User.findOne({ _id: goodMatchUserId });

    const response = await request(service)
        .post(`/user/${goodMatchUserId}/match`)
        .send();

    const body = response.body;

    // Check group members
    expect(body.members).toEqual([goodMatchUserId]);

    // Check group courses
    body.courses.forEach(course => {
        expect(goodMatchUser.courses.includes(course.toString())).toBe(true);
    });
    expect(body.courses.length).toEqual(goodMatchUser.courses.length);

    // Check group meeting times
    body.meeting_times.forEach(day => {
        expect(goodMatchUser.schedule.includes(day.toString())).toBe(true);
    });
    expect(body.meeting_times.length).toEqual(goodMatchUser.schedule.length);

    // Check group names
    expect(body.names).toEqual([`${goodMatchUser.firstName} ${goodMatchUser.lastName}`]);
});
