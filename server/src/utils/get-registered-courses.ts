import * as request from 'request';
const User = require('../models/user');
const Course = require('../models/course');
import {generateCourseData} from './generate-course-data';


export const getRegisteredCourses = async function(userId) {

	const server = 'https://canvas.ubc.ca'

	const user = await User.findOne({ _id: userId });

	const courses = await Course.find({})

	let course_code, courseName, courseInDB;

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

						if(courseInDB === 0) {

							let courseTimes = []
							let courseDays, _day;
							const response = await generateCourseData(courseName[0], courseName[1]);

							let sections = response['sections']
							let term1section = sections['101']
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
						
							const newCourse = new Course({
	   						    courseCode: course_code,
	   						    courseSection: courseName[2],
	   						    times: courseTimes
	   						});

	   						await newCourse.save()
						}

					}
				}
				resolve(body)
			}
		});
	});

}
