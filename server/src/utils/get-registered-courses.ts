import * as request from 'request';
const User = require('../models/user');

export const getRegisteredCourses = async function(userId) {

	const server = 'https://canvas.ubc.ca'

	const user = await User.findOne({ _id: userId });

	return new Promise((resolve, reject) => {
		request.get(server + '/api/v1/courses', {
		  'auth': {
		    'bearer': user.token
		  }
		}, (err, response, body) => {
			if (err || !response) {
				console.log('Error in request:', err)
				reject({})
			} else {
				console.log(body)
				resolve(body)
			}
		});
	});

}


