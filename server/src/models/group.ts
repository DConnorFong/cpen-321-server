import * as mongoose from 'mongoose';

/* Group
 *
 * members - e.g. [id1, id2, ..., idn]
 * courses - e.g. ['CPEN331', 'CPEN321', 'CPEN311']
 * meeting_times - list of 7 29-bit numbers (stored as strings), 1s show when the group is meeting.
 * The first 1 is to ensure when the string is cast to a number, the size will stay the same so no errors
 * occur when anding two of these numbers. Zero index number is Sunday
 * e.g. ['10000111100000000001111000000', ..., etc.] 
 */
const groupSchema = new mongoose.Schema(
    {
        members: [
            {
                type: String,
                required: true,
            },
        ],
        courses: [
            {
                type: String,
                required: true,
            },
        ],
        meeting_times: [
            {
                type: String,
                trim: true,
                required: true,
            },
        ]
    },
    {
        timestamps: true,
    }
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;