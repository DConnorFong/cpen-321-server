import * as mongoose from 'mongoose';

/* Chat
 *
 * groupId: chats share a 1-1 mapping with groups
 * message {
 *  senderId: userId of the message sender
 *  senderName: first name of sender to be rendered in chat
 *  message: message contents
 *  createdAt: timestamp to be rendered in chat
 */
const chatSchema = new mongoose.Schema(
    {
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        messages: [
            {
                senderId: mongoose.Schema.Types.ObjectId,
                senderName: String,
                message: String,
                createdAt: Date,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
