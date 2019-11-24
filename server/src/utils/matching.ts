const User = require('../models/user');
const Group = require('../models/group');
const Chat = require('../models/chat');
const async = require('async');
const mongoose = require('mongoose');
import { pushUserJoinedGroup } from './send-push-notification';
import { generateName } from '../utils/generate-name';
import * as log from 'log';

const MAX_GROUP_SIZE = 4;

const assignPreferenceScores = async (userId, callback) => {
    // user is an object with userID, courses, and schedule fields

    try {
        const user = await User.findOne({ _id: userId });
        const groups = await Group.find({
            /*members: { size: { $lte: MAX_GROUP_SIZE } } */
        }); // TODO: need to find syntax for this
        const potentialMatches = []; // objects with two fields: groupID, pref_score;
        let pref; // temp to store pref value for current group
        let pcntIntersect; // temp to store percent of intersection between user and current group's schedules
        const threshold = 90; // threshold above which pref will need to be in order for corresponding group to be potential match
        let commonCourses; // common courses between user and current group
        const numUCourses = user.courses.length;
        let numGCourses;

        // log.debug('groups', groups);
        // log.debug('user', user);

        groups.forEach(group => {
            numGCourses = group.courses.length;

            const tasks = [
                done => {
                    getCommonCourses(user.courses, group.courses, (err, courses) => {
                        if (err || !courses || !courses.length) {
                            done(err);
                        } else {
                            commonCourses = courses;
                            done(null);
                        }
                    });
                },
                done => {
                    calcPcntIntersect(user.schedule, group.meeting_times, (err, percentIntersect, meetings) => {
                        if (err) {
                            done(err);
                        } else {
                            pcntIntersect = percentIntersect;
                            done(null);
                        }
                    });
                },
            ];

            async.series(tasks, err => {
                if (err) {
                    callback(err);
                } else {
                    // log.debug('pref calculated');
                }
            });

            if (commonCourses && !group.members.includes(user._id)) {
                pref = (commonCourses.length / numUCourses + commonCourses.length / numGCourses) * pcntIntersect;
                if (pref > threshold) {
                    potentialMatches.push({ group: { group }, pref: pref });
                }
            }
        });

        if (!(potentialMatches.length > 0)) {
            return callback('No potential matches found');
        }

        const sortedPotentialMatches = potentialMatches.sort((pm1, pm2) => pm2.pref - pm1.pref);

        callback(null, sortedPotentialMatches);
    } catch (error) {
        callback(error);
    }
};

const getCommonCourses = (userCourses, groupCourses, callback) => {
    if (!userCourses || !userCourses.length || !groupCourses || !groupCourses.length) {
        return callback('ERROR: User or Group has no courses to process');
    }

    // log.debug('u:', user_courses, 'g:', group_courses);

    const courses = [];
    userCourses.forEach(uCourse => {
        groupCourses.forEach(gCourse => {
            if (gCourse === uCourse) {
                // TODO: check id field name
                courses.push(uCourse);
            }
        });
    });

    return callback(null, courses);
};

const calcPcntIntersect = (uSched, gMeetings, callback) => {
    let uDayBinary;
    let gDayBinary;
    let pctIntersect;
    let andedValue;
    let g1Count = 0;
    let u1Count = 0;

    const potentialMeetingTimes = [];

    for (let i = 0; i < uSched.length; i++) {
        uDayBinary = parseInt(uSched[i], 2);
        // log.debug('user day parsed:', u_day_binary, 'binary value:', u_day_binary.toString(2));
        gDayBinary = parseInt(gMeetings[i], 2);
        // log.debug('group day parsed:', g_day_binary, 'binary value:', g_day_binary.toString(2));

        andedValue = uDayBinary & gDayBinary;
        andedValue = andedValue.toString(2);
        potentialMeetingTimes.push(andedValue);
        // log.debug('andedValue:', andedValue);

        for (let j = 0; j < andedValue.length; j++) {
            if (andedValue.charAt(j) === '1') {
                u1Count++;
            }
        }
    }

    gMeetings.forEach(day => {
        for (let j = 0; j < day.length; j++) {
            if (day.charAt(j) === '1') {
                g1Count++;
            }
        }
    });

    pctIntersect = (100 * u1Count) / g1Count;

    return callback(null, pctIntersect, potentialMeetingTimes);
};

export const joinGroup = async (userId, groupId, callback) => {
    try {
        const user = await User.findOne({ _id: userId });
        const group = await Group.findOne({ _id: groupId });

        getCommonCourses(user.courses, group.courses, (err, commonCourses) => {
            if (err) {
                return callback(err);
            } else {
                group.courses = commonCourses;
            }
        });

        calcPcntIntersect(user.schedule, group.meeting_times, (err, pctIntersect, newMeetingTimes) => {
            if (err) {
                return callback(err);
            } else {
                group.meeting_times = newMeetingTimes;
            }
        });

        group.members.push(userId);
        group.names.push(`${user.firstName} ${user.lastName}`);
        user.groups.push(groupId);

        // log.debug('group:', group);
        // log.debug('user:', user);

        await group.save();
        await user.save();

        const groupUserTokens = [];
        let currMember;
        const groupCopy = JSON.parse(JSON.stringify(group));

        for (const groupMember of group.members) {
            currMember = await User.findOne({ _id: groupMember });
            if (currMember) {
                groupUserTokens.push(currMember.pushNotificationToken);
            }
        }

        pushUserJoinedGroup(groupUserTokens, user.firstName);

        return callback(null, groupCopy);
    } catch (error) {
        callback(error);
    }
};

const createGroup = async (userId, callback) => {
    try {
        const user = await User.findOne({ _id: userId });
        const groupId = mongoose.Types.ObjectId();

        const group = new Group({
            _id: groupId,
            members: [userId],
            courses: user.courses,
            meeting_times: user.schedule,
            names: [`${user.firstName} ${user.lastName}`],
            groupName: generateName(),
        });

        const chat = new Chat({
            groupId,
            messages: [],
        });

        user.groups.push(group._id);

        await user.save();
        await group.save();
        await chat.save();

        const groupCopy = JSON.parse(JSON.stringify(group));

        return callback(null, groupCopy);
    } catch (error) {
        callback(error);
    }
};

export const matchUser = async (userId, callback) => {
    try {
        let sortedPotentialMatches;
        await assignPreferenceScores(userId, (err, sortedMatches) => {
            if (err === 'No potential matches found') {
                createGroup(userId, (error, group) => {
                    if (error) {
                        log.error(error);
                        return callback(error);
                    } else {
                        return callback(null, group);
                    }
                });
            } else if (err) {
                log.error(err);
                return callback(err);
            } else {
                sortedPotentialMatches = sortedMatches;
                // log.debug('match potential matches:', sortedPotentialMatches);
                return callback(null, sortedPotentialMatches);
            }
        });
    } catch (error) {
        log.error(error);
        callback(error);
    }
};
