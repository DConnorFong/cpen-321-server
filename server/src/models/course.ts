import * as mongoose from 'mongoose';

/* Course
 *
 * courseCode - e.g CPEN321
 * courseSection - e.g. 101
 * times:
 *  day - 0 (Sunday) to 6 (Monday) following standard JS convention
 *  hourStart: 0-23
 *  minuteStart: 0-59
 *  hourEnd: 0-23
 *  minuteEnd: 0-59
 *
 * todo: assert on insert that hourStart:minuteStart < hourEnd:minuteEnd
 */
const courseSchema = new mongoose.Schema(
    {
        courseCode: {
            type: String,
            trim: true,
            required: true,
        },
        courseSection: {
            type: String,
            trim: true,
            required: true,
        },
        times: [
            {
                day: Number,
                hourStart: Number,
                minuteStart: Number,
                hourEnd: Number,
                minuteEnd: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
