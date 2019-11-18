import * as request from 'request';
import * as log from 'log';
import { generateCourseData } from './generate-course-data';

const User = require('../models/user');
const Course = require('../models/course');

export const getRegisteredCourses = async userId => {
    const server = 'https://canvas.ubc.ca';
    const user = await User.findOne({ _id: userId });
    user.schedule = [
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
    ];

    const courses = await Course.find({});
    let courseCode;
    let courseName;
    let courseInDB;

    // log.debug('token:', user.token);

    return new Promise((resolve, reject) => {
        request.get(
            server + '/api/v1/courses',
            {
                auth: {
                    bearer: user.token,
                },
            },
            async (err, response, body) => {
                if (err || !response) {
                    log.error('Error in request:', err);
                    reject({});
                } else {
                    body = JSON.parse(body);
                    user.courses = [];
                    for (let j = 0; j < body.length; j++) {
                        courseInDB = 0;
                        const currCourse = body[j];
                        // log.debug('cc:', currCourse);
                        if (
                            !currCourse.access_restricted_by_date === true &&
                            !currCourse.name.includes('Engineering Co-op') &&
                            !currCourse.name.includes('Safety') &&
                            !currCourse.name.includes('Capstone')
                        ) {
                            courseName = currCourse.name;
                            courseName = courseName.split(' ');
                            courseCode = courseName[0] + courseName[1];
                            courses.forEach(userCourse => {
                                if (courseCode === userCourse.courseCode) {
                                    courseInDB = 1;
                                    // log.debug('inDB:', courseCode);
                                }
                            });

                            const courseTimes = [];
                            const Response = await generateCourseData(courseName[0], courseName[1]);
                            const Sections = 'sections';
                            const Days = 'days';
                            const Start = 'start';
                            const End = 'end';
                            const sections = Response[Sections];
                            const term1section = sections['101'] || sections['001'];
                            const courseDays = term1section[Days].split(' ');

                            for (const currDay of courseDays) {
                                switch (currDay) {
                                    case 'Sun':
                                        courseTimes.push({
                                            day: 0,
                                            hourStart: parseInt(term1section[Start].substring(0, 2), 10),
                                            minuteStart: parseInt(term1section[Start].substring(3, 5), 10),
                                            hourEnd: parseInt(term1section[End].substring(0, 2), 10),
                                            minuteEnd: parseInt(term1section[End].substring(3, 5), 10),
                                        });
                                        break;

                                    case 'Mon':
                                        courseTimes.push({
                                            day: 1,
                                            hourStart: parseInt(term1section[Start].substring(0, 2), 10),
                                            minuteStart: parseInt(term1section[Start].substring(3, 5), 10),
                                            hourEnd: parseInt(term1section[End].substring(0, 2), 10),
                                            minuteEnd: parseInt(term1section[End].substring(3, 5), 10),
                                        });
                                        break;

                                    case 'Tue':
                                        courseTimes.push({
                                            day: 2,
                                            hourStart: parseInt(term1section[Start].substring(0, 2), 10),
                                            minuteStart: parseInt(term1section[Start].substring(3, 5), 10),
                                            hourEnd: parseInt(term1section[End].substring(0, 2), 10),
                                            minuteEnd: parseInt(term1section[End].substring(3, 5), 10),
                                        });
                                        break;

                                    case 'Wed':
                                        courseTimes.push({
                                            day: 3,
                                            hourStart: parseInt(term1section[Start].substring(0, 2), 10),
                                            minuteStart: parseInt(term1section[Start].substring(3, 5), 10),
                                            hourEnd: parseInt(term1section[End].substring(0, 2), 10),
                                            minuteEnd: parseInt(term1section[End].substring(3, 5), 10),
                                        });
                                        break;

                                    case 'Thu':
                                        courseTimes.push({
                                            day: 4,
                                            hourStart: parseInt(term1section[Start].substring(0, 2), 10),
                                            minuteStart: parseInt(term1section[Start].substring(3, 5), 10),
                                            hourEnd: parseInt(term1section[End].substring(0, 2), 10),
                                            minuteEnd: parseInt(term1section[End].substring(3, 5), 10),
                                        });
                                        break;

                                    case 'Fri':
                                        courseTimes.push({
                                            day: 5,
                                            hourStart: parseInt(term1section[Start].substring(0, 2), 10),
                                            minuteStart: parseInt(term1section[Start].substring(3, 5), 10),
                                            hourEnd: parseInt(term1section[End].substring(0, 2), 10),
                                            minuteEnd: parseInt(term1section[End].substring(3, 5), 10),
                                        });
                                        break;

                                    case 'Sat':
                                        courseTimes.push({
                                            day: 6,
                                            hourStart: parseInt(term1section[Start].substring(0, 2), 10),
                                            minuteStart: parseInt(term1section[Start].substring(3, 5), 10),
                                            hourEnd: parseInt(term1section[End].substring(0, 2), 10),
                                            minuteEnd: parseInt(term1section[End].substring(3, 5), 10),
                                        });
                                        break;
                                }
                            }

                            if (courseInDB === 0) {
                                const newCourse = new Course({
                                    courseCode: courseCode,
                                    courseSection: courseName[2],
                                    times: courseTimes,
                                });

                                await newCourse.save();
                            }

                            user.courses.push(courseCode);

                            let startIndex;
                            let endIndex;
                            let i;

                            courseTimes.forEach(courseObj => {
                                if (
                                    courseObj.hourStart <= 21 &&
                                    courseObj.hourEnd <= 22 &&
                                    !(courseObj.hourEnd === 22 && courseObj.minuteEnd === 30)
                                ) {
                                    switch (courseObj.day) {
                                        case 0:
                                            startIndex = courseObj.hourStart * 2 - 15;
                                            if (courseObj.minuteStart === 30) {
                                                startIndex += 1;
                                            }
                                            endIndex = courseObj.hourEnd * 2 - 15;
                                            if (courseObj.minuteEnd === 30) {
                                                endIndex += 1;
                                            }
                                            for (i = startIndex; i < endIndex; i++) {
                                                user.schedule[0] = setCharAt(user.schedule[0], i, '0');
                                            }
                                            break;

                                        case 1:
                                            startIndex = courseObj.hourStart * 2 - 15;
                                            if (courseObj.minuteStart === 30) {
                                                startIndex += 1;
                                            }
                                            endIndex = courseObj.hourEnd * 2 - 15;
                                            if (courseObj.minuteEnd === 30) {
                                                endIndex += 1;
                                            }
                                            for (i = startIndex; i < endIndex; i++) {
                                                user.schedule[1] = setCharAt(user.schedule[1], i, '0');
                                            }
                                            break;

                                        case 2:
                                            startIndex = courseObj.hourStart * 2 - 15;
                                            if (courseObj.minuteStart === 30) {
                                                startIndex += 1;
                                            }
                                            endIndex = courseObj.hourEnd * 2 - 15;
                                            if (courseObj.minuteEnd === 30) {
                                                endIndex += 1;
                                            }
                                            for (i = startIndex; i < endIndex; i++) {
                                                user.schedule[2] = setCharAt(user.schedule[2], i, '0');
                                            }
                                            break;

                                        case 3:
                                            startIndex = courseObj.hourStart * 2 - 15;
                                            if (courseObj.minuteStart === 30) {
                                                startIndex += 1;
                                            }
                                            endIndex = courseObj.hourEnd * 2 - 15;
                                            if (courseObj.minuteEnd === 30) {
                                                endIndex += 1;
                                            }
                                            for (i = startIndex; i < endIndex; i++) {
                                                user.schedule[3] = setCharAt(user.schedule[3], i, '0');
                                            }
                                            break;

                                        case 4:
                                            startIndex = courseObj.hourStart * 2 - 15;
                                            if (courseObj.minuteStart === 30) {
                                                startIndex += 1;
                                            }
                                            endIndex = courseObj.hourEnd * 2 - 15;
                                            if (courseObj.minuteEnd === 30) {
                                                endIndex += 1;
                                            }
                                            for (i = startIndex; i < endIndex; i++) {
                                                user.schedule[4] = setCharAt(user.schedule[4], i, '0');
                                            }
                                            break;

                                        case 5:
                                            startIndex = courseObj.hourStart * 2 - 15;
                                            if (courseObj.minuteStart === 30) {
                                                startIndex += 1;
                                            }
                                            endIndex = courseObj.hourEnd * 2 - 15;
                                            if (courseObj.minuteEnd === 30) {
                                                endIndex += 1;
                                            }
                                            for (i = startIndex; i < endIndex; i++) {
                                                user.schedule[5] = setCharAt(user.schedule[5], i, '0');
                                            }
                                            break;

                                        case 6:
                                            startIndex = courseObj.hourStart * 2 - 15;
                                            if (courseObj.minuteStart === 30) {
                                                startIndex += 1;
                                            }
                                            endIndex = courseObj.hourEnd * 2 - 15;
                                            if (courseObj.minuteEnd === 30) {
                                                endIndex += 1;
                                            }
                                            for (i = startIndex; i < endIndex; i++) {
                                                user.schedule[6] = setCharAt(user.schedule[6], i, '0');
                                            }
                                            break;
                                    }
                                }
                            }); // for each lecture
                        } // if not eng coop
                    } // for each canvas course
                    await user.save();
                    resolve(body);
                }
            }
        );
    });
};

function setCharAt(str, index, chr) {
    if (index > str.length - 1) {
        return str;
    }
    return str.substr(0, index) + chr + str.substr(index + 1);
}
