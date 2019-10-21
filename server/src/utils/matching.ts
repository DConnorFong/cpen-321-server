const _User = require('../models/user');
const Group = require('../models/group');
const async = require('async');
import {pushUserJoinedGroup} from './send-push-notification';

const MAX_GROUP_SIZE = 4;

//library to ask for user input?
//need endpoint for user to request group, us to respond with choices, user to reply with choice, etc.

//TODO add logic so user doesnt get paired with group they are already in



const assignPreferenceScores = async function(userId, callback) { //user is an object with userID, courses, and schedule fields
	
	try {
		const user = await _User.findOne({ _id: userId });
		const groups = await Group.find( {/*members: { size: { $lte: MAX_GROUP_SIZE } } */})//TODO: need to find syntax for this
		const potential_matches = [] //objects with two fields: groupID, pref_score;
		let pref; //temp to store pref value for current group
		let pcntIntersect; // temp to store percent of intersection between user and current group's schedules
		const threshold = 130; // threshold above which pref will need to be in order for corresponding group to be potential match
		let common_courses; // common courses between user and current group
		const num_u_courses = user.courses.length
		let num_g_courses;

		// debugging
		// console.log('groups', groups)
		// console.log('user', user)

		groups.forEach(function(group) {

			num_g_courses = group.courses.length

			const tasks = [(done) => {
					getCommonCourses(user.courses, group.courses, (err, courses) => {
						if (err || !courses || !courses.length) {
							done(err)
						} else {
							common_courses = courses
							done(null)
							//callback(err, courses)//TODO: check if need this or fix it
						}
					})

				}, (done) => {
					calcPcntIntersect(user.schedule, group.meeting_times, (err, percent_intersect, meetings) => {
						if (err) {
							done(err)
						} else {
							pcntIntersect = percent_intersect
							done(null)
							//callback(err)//TODO: check if need this or fix it
						}	
					})
			}]

			async.series(tasks, (err) => {
				if (err) {
					callback(err)
				} else {
					console.log('pref calculated')
				}
			})

			if (common_courses) {
				pref = (common_courses.length/num_u_courses + common_courses.length/num_g_courses )*(pcntIntersect)
				if (pref > threshold) {
					potential_matches.push({groupId: group._id, pref: pref})
				}
			}

		})

		if (!(potential_matches.length > 0)) {
			return callback('No potential matches found')
		}

		let sorted_potential_matches = potential_matches.sort((pm1, pm2) => pm2.pref - pm1.pref);

		callback(null, sorted_potential_matches);

	} catch (error) {
		callback(error)
	}
}

const getCommonCourses = function(user_courses, group_courses, callback) {

	if (!user_courses || !user_courses.length || !group_courses || !group_courses.length) {
		return callback('ERROR: User or Group has no courses to process')
	}

	//console.log('u:', user_courses, 'g:', group_courses)

	const courses = []
	user_courses.forEach(function(u_course) {
		group_courses.forEach(function(g_course) {
			if (g_course === u_course) {//TODO: check id field name
				courses.push(u_course)
			}
		})
	})

	return callback(null, courses)
}

const calcPcntIntersect = function(u_sched, g_meetings, callback) {

	let u_day_binary, g_day_binary, pctIntersect, andedValue
	let g_1_count = 0, u_1_count = 0;

	const potential_meeting_times = []

	for (let i = 0; i < u_sched.length; i++) {

		u_day_binary = parseInt(u_sched[i], 2)
		//console.log('user day parsed:', u_day_binary, 'binary value:', u_day_binary.toString(2))
		g_day_binary = parseInt(g_meetings[i], 2) 
		//console.log('group day parsed:', g_day_binary, 'binary value:', g_day_binary.toString(2))

		andedValue = u_day_binary & g_day_binary
		andedValue = andedValue.toString(2)
		potential_meeting_times.push(andedValue)
		//console.log('andedValue:', andedValue)

		for (let j = 0; j < andedValue.length; j++) {
			if (andedValue.charAt(j) == '1') {
				u_1_count++;
			}
		}
	}

	g_meetings.forEach(function(day) {
		for (let j = 0; j < day.length; j++) {
			if (day.charAt(j) == '1') {
				g_1_count++;
			}
		}
	})

	pctIntersect = 100*u_1_count/g_1_count;

	return callback(null, pctIntersect, potential_meeting_times)

	// Transform user and group's schedules into binary numbers of length 28, each bit in this number corresponds
	// to a 30 min block in the day from 8am to 10pm (we may allow user to change their preferred range in the future).
	// A 1 will mean the user is free, a 0 will mean they are busy. We then "and" the binary numbers together, which will
	// give us the times when the user and group are both free marked with 1's. 
	// After that we will find the percent of the time that the user is free during the group meeting times using:

	//				100% * (number of 1's in result of "and" operation) / (number of 1's in group's schedule)

	// callback(null, pcntIntersect);
}

const findGroupForUser = async function(userId, sortedPotentialMatches, callback) {

	// if (sortedPotentialMatches.size > 0) {
	// 	const group1 = sortedPotentialMatches.shift();
	// 	const group2 = sortedPotentialMatches.shift();
	// 	const group3 = sortedPotentialMatches.shift();
	// 	const choice = promptUsertoChoose(group1, group2, group3);// returns 1, 2, 3 respectively if user chooses one of groups
	// 														// returns 0 if user wants to regenerate groups
	// 														// returns -1 if user wants to create own group
	// 	switch (choice) {
	// 		case 1:
	// 		joinGroup(user, group1, callback) // joinGroup will perform updates on the corresponding group object in the DB
	// 		break;
			
	// 		case 2:
	// 		joinGroup(user, group2, callback)
	// 		break;
			
	// 		case 3:
	// 		joinGroup(user, group3, callback)
	// 		break;
			
	// 		case 0:
	// 		findGroupForUser(sortedPotentialMatches, callback)
	// 		break;
			
	// 		case -1:
	// 		createNewGroup(user, callback)
	// 		break;
	// 	}
	// } else {
	// 	createNewGroup(user, callback)
	// }

	// Above will be for final product, code for MVP below
	try {

		joinGroup(userId, sortedPotentialMatches[0].groupId, (err, group) => {
			if (err)
				return callback(err)
			else {
				return callback(null, group)
			}
		});

	} catch (error) {
		callback(error)
	}


	//console.log('sortedPotentialMatches:', sortedPotentialMatches)
	
}

const joinGroup = async function(userId, groupId, callback) {
	
	try {
		const user = await _User.findOne({ _id: userId });
		const group = await Group.findOne({_id: groupId});

		getCommonCourses(user.courses, group.courses, (err, common_courses) => {
			if (err)
				return callback(err)
			else {
				group.courses = common_courses
			}
		})

		calcPcntIntersect(user.schedule, group.meeting_times, (err, pctIntersect, new_meeting_times) => {
			if (err)
				return callback(err)
			else {
				group.meeting_times = new_meeting_times
			}
		})

		group.members.push(userId)
		user.groups.push(groupId)
		
		//console.log('group:', group)
		//console.log('user:', user)

		await group.save()
		await user.save()

		const groupUserTokens = []
		let curr_member;

		for (let i = 0; i < group.members.length; i++) {
			curr_member = await _User.findOne({ _id: group.members[i] });
			groupUserTokens.push(curr_member.pushNotificationToken)
		}

		pushUserJoinedGroup(groupUserTokens, user.firstName)

		return callback(null, group)

	} catch (error) {
		callback(error)
	}
}

const createGroup = async function(userId, callback) { //TODO test

	try {

		const user = await _User.findOne({ _id: userId });

		const group = new Group({
	        members: [userId],
	        courses: user.courses,
	        meeting_times: user.schedule

	    });

		user.groups.push(group._id)

		await user.save()
	    await group.save()

	    return callback(null, group)

	} catch (error) {
		callback(error)
	}
}

export const matchUser = async function(userId, callback) {

	try {

		let sortedPotentialMatches;
		await assignPreferenceScores(userId, (err, sorted_matches) => {
			if (err == 'No potential matches found') {
				createGroup(userId, (err, group) => {
					if (err) {
						console.log(err)
						return callback(err)
					} else {
						return callback(null, group)
					}
				})
			} else if (err) {
				console.log(err)
				return callback(err) 
			} else {
				sortedPotentialMatches = sorted_matches
				console.log('match potential matches:', sortedPotentialMatches)
				findGroupForUser(userId, sortedPotentialMatches, (err, group) => {
					if (err) {
						console.log(err)
						return callback(err)
					} else {
						console.log('found group:', group)
						return callback(null, group);
					}
				});
			}
		})
	} catch (error) {
		console.log(error)
		callback(error)
	}
	
}

// matchUser('5d8c51d88a7fc5ae1f4531a3', (err, group) => {
// 	console.log(group)
// })


// Callback convention in this file: callback() with null as first argument means that no error took place


