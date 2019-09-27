import * as mongoose from 'mongoose';

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
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
