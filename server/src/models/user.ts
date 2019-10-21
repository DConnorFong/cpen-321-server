import * as mongoose from 'mongoose';

/* User
 *
 * firstName - e.g. Connor
 * lastName - e.g. Fong
 * courses:
 *  e.g. ['CPEN331', 'CPEN321', 'CPEN311']
 * groups:
 *  e.g. ['groupID1', 'groupID2', etc.]
 * schedule: 
 * e.g. ['10000111100000000001111000000', ..., etc.] 
 * pushNotificationToken - Expo API token used to send push notifications to device
 */
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        aliasName: {
            type: String,
            trim: true,
            default: 'Defaulting Defaulter',
        },
        pushNotificationToken: {
            type: String,
            trim: true,
        },
        courses: [
            {
                type: String,
                trim:  true,
                required: true,
            },
        ],
        groups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
        ],
        schedule: [
            {
                type: String,
                trim: true,
                required: true,
            },
        ],
        token: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
