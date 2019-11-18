import * as mongoose from 'mongoose';
import * as log from 'log';
import * as bcrypt from 'bcrypt';

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
        username: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
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
                trim: true,
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
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// DB should never store plain text passwords
userSchema.pre('save', async function(next) {
    const saltRounds = +(process.env.SALT_ROUNDS || 8);
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }

    next();
});

userSchema.statics.attemptLogin = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        log.debug(`user.ts attemptLogin: ${username} - not found`);
        throw new Error();
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        log.debug(`user.ts attemptLogin: ${username} - invalid password`);
        throw new Error();
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
