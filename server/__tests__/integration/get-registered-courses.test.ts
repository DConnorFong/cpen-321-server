export {};

const dbHandler = require('../../__mocks__/db/mongoose');
const request = require('supertest');
const service = require('../../src/service');
const User = require('../../src/models/user');
const Group = require('../../src/models/group');
const Course = require('../../src/models/course');

beforeAll(async () => {
    await dbHandler.connect();
});

beforeEach(async () => {
    await User.deleteMany();
    await Group.deleteMany();
    await Course.deleteMany();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

test('getRegisteredCourses for User should update User and Course DBs correctly', async () => {
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
        token: '11224~rYZTGpt74Yy7x4y9bNqdlgwFCnNprYupmI0Fah7FrbjxGiY2RT4pjuZIcKQ4URMW',
    });

    await CpenOG.save();

    await request(service)
        .post(`/user/${CpenOG._id}/courses`)
        .send();

    const CpenOgAfter = await User.findOne({ _id: CpenOG._id });
    const _CPEN311 = await Course.findOne({ courseCode: 'CPEN311' });
    const _CPEN321 = await Course.findOne({ courseCode: 'CPEN321' });
    const _CPEN331 = await Course.findOne({ courseCode: 'CPEN331' });
    const _ELEC221 = await Course.findOne({ courseCode: 'ELEC221' });

    // Check user courses
    const expectedCourses = ['ELEC221', 'CPEN321', 'CPEN311', 'CPEN331'];

    CpenOgAfter.courses.forEach(course => {
        expect(expectedCourses.includes(course.toString())).toBe(true);
    });
    expect(CpenOgAfter.courses.length).toEqual(expectedCourses.length);

    // Check user schedule
    const expectedSchedule = [
        '11111111111111111111111111111',
        '11111111111110000011111111111',
        '11111111110001111111111111111',
        '11111111111110011111111111111',
        '11111111110001111111111111111',
        '11111110000110011111111111111',
        '11111111111111111111111111111',
    ];

    CpenOgAfter.schedule.forEach(day => {
        expect(expectedSchedule.includes(day.toString())).toBe(true);
    });
    expect(CpenOgAfter.schedule.length).toEqual(expectedSchedule.length);

    // Check ELEC 221 times
    const elec221ExpectedTimes1 = {
        day: 1,
        hourStart: 14,
        minuteStart: 0,
        hourEnd: 15,
        minuteEnd: 0,
    };

    const elec221ExpectedTimes2 = {
        day: 3,
        hourStart: 14,
        minuteStart: 0,
        hourEnd: 15,
        minuteEnd: 0,
    };

    const elec221ExpectedTimes3 = {
        day: 5,
        hourStart: 14,
        minuteStart: 0,
        hourEnd: 15,
        minuteEnd: 0,
    };

    const ELEC221 = JSON.parse(JSON.stringify(_ELEC221));

    expect(ELEC221.times[0].day).toEqual(elec221ExpectedTimes1.day);
    expect(ELEC221.times[0].hourStart).toEqual(elec221ExpectedTimes1.hourStart);
    expect(ELEC221.times[0].minuteStart).toEqual(elec221ExpectedTimes1.minuteStart);
    expect(ELEC221.times[0].hourEnd).toEqual(elec221ExpectedTimes1.hourEnd);
    expect(ELEC221.times[0].minuteEnd).toEqual(elec221ExpectedTimes1.minuteEnd);

    expect(ELEC221.times[1].day).toEqual(elec221ExpectedTimes2.day);
    expect(ELEC221.times[1].hourStart).toEqual(elec221ExpectedTimes2.hourStart);
    expect(ELEC221.times[1].minuteStart).toEqual(elec221ExpectedTimes2.minuteStart);
    expect(ELEC221.times[1].hourEnd).toEqual(elec221ExpectedTimes2.hourEnd);
    expect(ELEC221.times[1].minuteEnd).toEqual(elec221ExpectedTimes2.minuteEnd);

    expect(ELEC221.times[2].day).toEqual(elec221ExpectedTimes3.day);
    expect(ELEC221.times[2].hourStart).toEqual(elec221ExpectedTimes3.hourStart);
    expect(ELEC221.times[2].minuteStart).toEqual(elec221ExpectedTimes3.minuteStart);
    expect(ELEC221.times[2].hourEnd).toEqual(elec221ExpectedTimes3.hourEnd);
    expect(ELEC221.times[2].minuteEnd).toEqual(elec221ExpectedTimes3.minuteEnd);

    // Check CPEN 311 times
    const cpen311ExpectedTimes1 = {
        day: 2,
        hourStart: 12,
        minuteStart: 30,
        hourEnd: 14,
        minuteEnd: 0,
    };

    const cpen311ExpectedTimes2 = {
        day: 4,
        hourStart: 12,
        minuteStart: 30,
        hourEnd: 14,
        minuteEnd: 0,
    };

    const CPEN311 = JSON.parse(JSON.stringify(_CPEN311));

    expect(CPEN311.times[0].day).toEqual(cpen311ExpectedTimes1.day);
    expect(CPEN311.times[0].hourStart).toEqual(cpen311ExpectedTimes1.hourStart);
    expect(CPEN311.times[0].minuteStart).toEqual(cpen311ExpectedTimes1.minuteStart);
    expect(CPEN311.times[0].hourEnd).toEqual(cpen311ExpectedTimes1.hourEnd);
    expect(CPEN311.times[0].minuteEnd).toEqual(cpen311ExpectedTimes1.minuteEnd);

    expect(CPEN311.times[1].day).toEqual(cpen311ExpectedTimes2.day);
    expect(CPEN311.times[1].hourStart).toEqual(cpen311ExpectedTimes2.hourStart);
    expect(CPEN311.times[1].minuteStart).toEqual(cpen311ExpectedTimes2.minuteStart);
    expect(CPEN311.times[1].hourEnd).toEqual(cpen311ExpectedTimes2.hourEnd);
    expect(CPEN311.times[1].minuteEnd).toEqual(cpen311ExpectedTimes2.minuteEnd);

    // Check CPEN 321 times
    const cpen321ExpectedTimes1 = {
        day: 1,
        hourStart: 15,
        minuteStart: 0,
        hourEnd: 16,
        minuteEnd: 30,
    };

    const CPEN321 = JSON.parse(JSON.stringify(_CPEN321));

    expect(CPEN321.times[0].day).toEqual(cpen321ExpectedTimes1.day);
    expect(CPEN321.times[0].hourStart).toEqual(cpen321ExpectedTimes1.hourStart);
    expect(CPEN321.times[0].minuteStart).toEqual(cpen321ExpectedTimes1.minuteStart);
    expect(CPEN321.times[0].hourEnd).toEqual(cpen321ExpectedTimes1.hourEnd);
    expect(CPEN321.times[0].minuteEnd).toEqual(cpen321ExpectedTimes1.minuteEnd);

    // Check CPEN 331 times
    const cpen331ExpectedTimes1 = {
        day: 5,
        hourStart: 11,
        minuteStart: 0,
        hourEnd: 13,
        minuteEnd: 0,
    };

    //   const cpen331ExpectedTimes2 = {
    // "day" : 5,
    //       "hourStart" : 15,
    //       "minuteStart" : 0,
    //       "hourEnd" : 16,
    //       "minuteEnd" : 0
    //   }

    const CPEN331 = JSON.parse(JSON.stringify(_CPEN331));

    expect(CPEN331.times[0].day).toEqual(cpen331ExpectedTimes1.day);
    expect(CPEN331.times[0].hourStart).toEqual(cpen331ExpectedTimes1.hourStart);
    expect(CPEN331.times[0].minuteStart).toEqual(cpen331ExpectedTimes1.minuteStart);
    expect(CPEN331.times[0].hourEnd).toEqual(cpen331ExpectedTimes1.hourEnd);
    expect(CPEN331.times[0].minuteEnd).toEqual(cpen331ExpectedTimes1.minuteEnd);
});
