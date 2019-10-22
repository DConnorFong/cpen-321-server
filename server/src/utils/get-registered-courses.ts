import * as request from 'request';
const User = require('../models/user');
const Course = require('../models/course');
import {generateCourseData} from './generate-course-data';


export const getRegisteredCourses = async function(userId) {

	const server = 'https://canvas.ubc.ca'

	const user = await User.findOne({ _id: userId });

	user.schedule = [
		"10000000000000000000000000000",
		"10000000000000000000000000000",
		"10000000000000000000000000000",
		"10000000000000000000000000000",
		"10000000000000000000000000000",
		"10000000000000000000000000000",
		"10000000000000000000000000000",
	]

	const courses = await Course.find({})

	let course_code, courseName, courseInDB;

	console.log('token:', user.token)

	return new Promise((resolve, reject) => {
		request.get(server + '/api/v1/courses', {
		  'auth': {
		    'bearer': user.token
		  }
		}, async (err, response, body) => {
			if (err || !response) {
				console.log('Error in request:', err)
				reject({})
			} else {
				body = JSON.parse(body)
				for (let i = 0; i < body.length; i++) {
					
					courseInDB = 0;
					let currCourse = body[i]
					//console.log('cc:', currCourse)
					if(!currCourse.access_restricted_by_date == true && !currCourse.name.includes('Engineering Co-op')) {
						
						courseName = currCourse.name
						courseName = courseName.split(" ")
						course_code = courseName[0] + courseName[1]
						courses.forEach((_course) => {
						
							if (course_code === _course.courseCode) {
								courseInDB = 1;
								//console.log('inDB:', course_code)
							}
						})

						let courseTimes = []
						let courseDays, _day;
						const response = await generateCourseData(courseName[0], courseName[1]);

						let sections = response['sections']
						let term1section = sections['101'] || sections['001']
						courseDays = term1section['days'].split(" ")

						for (let k = 0; k < courseDays.length; k++) {
							
							switch(courseDays[k]) {
										
								case 'Sun':
								courseTimes.push({
											day: 0,
											hourStart:  parseInt(term1section['start'].substring(0,2), 10),
											minuteStart: parseInt(term1section['start'].substring(3,5), 10),
											hourEnd: parseInt(term1section['end'].substring(0,2), 10),
											minuteEnd: parseInt(term1section['end'].substring(3,5), 10)
										})
								break;

								case 'Mon':
								courseTimes.push({
											day: 1,
											hourStart: parseInt(term1section['start'].substring(0,2), 10),
											minuteStart: parseInt(term1section['start'].substring(3,5), 10),
											hourEnd: parseInt(term1section['end'].substring(0,2), 10),
											minuteEnd: parseInt(term1section['end'].substring(3,5), 10)
										})
								break;

								case 'Tue':
								courseTimes.push({
											day: 2,
											hourStart: parseInt(term1section['start'].substring(0,2), 10),
											minuteStart: parseInt(term1section['start'].substring(3,5), 10),
											hourEnd: parseInt(term1section['end'].substring(0,2), 10),
											minuteEnd: parseInt(term1section['end'].substring(3,5), 10)
										})
								break;

								case 'Wed':
								courseTimes.push({
											day: 3,
											hourStart: parseInt(term1section['start'].substring(0,2), 10),
											minuteStart: parseInt(term1section['start'].substring(3,5), 10),
											hourEnd: parseInt(term1section['end'].substring(0,2), 10),
											minuteEnd: parseInt(term1section['end'].substring(3,5), 10)
										})
								break;

								case 'Thu':
								courseTimes.push({
											day: 4,
											hourStart: parseInt(term1section['start'].substring(0,2), 10),
											minuteStart: parseInt(term1section['start'].substring(3,5), 10),
											hourEnd: parseInt(term1section['end'].substring(0,2), 10),
											minuteEnd: parseInt(term1section['end'].substring(3,5), 10)
										})
								break;

								case 'Fri':
								courseTimes.push({
											day: 5,
											hourStart: parseInt(term1section['start'].substring(0,2), 10),
											minuteStart: parseInt(term1section['start'].substring(3,5), 10),
											hourEnd: parseInt(term1section['end'].substring(0,2), 10),
											minuteEnd: parseInt(term1section['end'].substring(3,5), 10)
										})
								break;

								case 'Sat':
								courseTimes.push({
											day: 6,
											hourStart: parseInt(term1section['start'].substring(0,2), 10),
											minuteStart: parseInt(term1section['start'].substring(3,5), 10),
											hourEnd: parseInt(term1section['end'].substring(0,2), 10),
											minuteEnd: parseInt(term1section['end'].substring(3,5), 10)
										})
								break;
							}
						}

						if (courseInDB == 0){

							const newCourse = new Course({
	   						    courseCode: course_code,
	   						    courseSection: courseName[2],
	   						    times: courseTimes
	   						});

	   						await newCourse.save()
						}

						user.courses.push(course_code)

						let startIndex, endIndex;

						courseTimes.forEach(function(courseObj) {
							
							if (courseObj.hourStart <= 21 && courseObj.hourEnd <= 22 
								&& !(courseObj.hourEnd == 22 && courseObj.minuteEnd == 30)) {

								switch (courseObj.day) {

									case 0:
										
										startIndex = (courseObj.hourStart)*2 - 15
										if (courseObj.minuteStart == 30) {
											startIndex += 1
										}
										
										endIndex = (courseObj.hourEnd)*2 - 15
										if (courseObj.minuteEnd == 30) {
											endIndex += 1
										}
										
										for(let i = startIndex; i < endIndex; i++) {
											user.schedule[0] = setCharAt(user.schedule[0], i, '1')//.charAt(i) = '1'
										}
										
									break;

									case 1:
										
										startIndex = (courseObj.hourStart)*2 - 15
										if (courseObj.minuteStart == 30) {
											startIndex += 1
										}
										
										endIndex = (courseObj.hourEnd)*2 - 15
										if (courseObj.minuteEnd == 30) {
											endIndex += 1
										}
										
										for(let i = startIndex; i < endIndex; i++) {
											user.schedule[1] = setCharAt(user.schedule[1], i, '1')//.charAt(i) = '1'
										}
										
									break;

									case 2:
										
										startIndex = (courseObj.hourStart)*2 - 15
										if (courseObj.minuteStart == 30) {
											startIndex += 1
										}
										
										endIndex = (courseObj.hourEnd)*2 - 15
										if (courseObj.minuteEnd == 30) {
											endIndex += 1
										}
										
										for(let i = startIndex; i < endIndex; i++) {
											user.schedule[2] = setCharAt(user.schedule[2], i, '1')//.charAt(i) = '1'
										}
										
									break;

									case 3:
										
										startIndex = (courseObj.hourStart)*2 - 15
										if (courseObj.minuteStart == 30) {
											startIndex += 1
										}
										
										endIndex = (courseObj.hourEnd)*2 - 15
										if (courseObj.minuteEnd == 30) {
											endIndex += 1
										}
										
										for(let i = startIndex; i < endIndex; i++) {
											user.schedule[3] = setCharAt(user.schedule[3], i, '1')//.charAt(i) = '1'
										}
										
									break;

									case 4:
										
										startIndex = (courseObj.hourStart)*2 - 15
										if (courseObj.minuteStart == 30) {
											startIndex += 1
										}
										
										endIndex = (courseObj.hourEnd)*2 - 15
										if (courseObj.minuteEnd == 30) {
											endIndex += 1
										}
										
										for(let i = startIndex; i < endIndex; i++) {
											user.schedule[4] = setCharAt(user.schedule[4], i, '1')//.charAt(i) = '1'
										}
										
									break;

									case 5:
										
										startIndex = (courseObj.hourStart)*2 - 15
										if (courseObj.minuteStart == 30) {
											startIndex += 1
										}
										
										endIndex = (courseObj.hourEnd)*2 - 15
										if (courseObj.minuteEnd == 30) {
											endIndex += 1
										}
										
										for(let i = startIndex; i < endIndex; i++) {
											user.schedule[5] = setCharAt(user.schedule[5], i, '1')//.charAt(i) = '1'
										}
										
									break;

									case 6:
										
										startIndex = (courseObj.hourStart)*2 - 15
										if (courseObj.minuteStart == 30) {
											startIndex += 1
										}
										
										endIndex = (courseObj.hourEnd)*2 - 15
										if (courseObj.minuteEnd == 30) {
											endIndex += 1
										}
										
										for(let i = startIndex; i < endIndex; i++) {
											user.schedule[6] = setCharAt(user.schedule[6], i, '1')//.charAt(i) = '1'
										}
										
									break;
									
								}
							}
						})//for each lecture

					}//if not eng coop
				} //for each canvas course
				await user.save()
				resolve(body)
			}
		});
	});

}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

