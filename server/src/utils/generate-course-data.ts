import * as request from 'request';
const endpoint = process.env.SSC_SERVER;

/*
 * Generates UBC course data from an SSC web-scraper
 *
 * courseCode: 4 character (capitalized) facualty code e.g. CPEN, CPSC, ELEC
 * courseNumber: 3 digit identifcation number e.g. 101, 321, 331
 *
 * returns a promise that will be resolved/rejected upon response. This means
 * proper usage looks like 'const response = await generateCourseData('CPEN', '321');'
 *
 * resolve returns a JSON object. To access the fields with the above example use:
 * 'response['course_code'];' to retrieve values.
 */
export const generateCourseData = (courseCode, courseNumber) => {
    // perform input formatting to create the request endpoint
    courseCode = courseCode.trim().toUpperCase();
    courseNumber = courseNumber.trim();
    const reqEndpoint = `${endpoint}${courseCode}/${courseNumber}/`;

    return new Promise((resolve, reject) => {
        request(reqEndpoint, { json: true }, (err, res, body) => {
            if (err) {
                console.log(`Error retrieving SSC data: ${err}`);
                reject({});
            } else if (res == null) {
                console.log('Error retrieving SSC data: invalid input');
                reject({});
            } else {
                resolve(body);
            }
        });
    });
};
