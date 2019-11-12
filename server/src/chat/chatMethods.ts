const User = require('../models/user');
const Chat = require('../models/chat');
const Group = require('../models/group');

/*
 * Get an initial representation of all chats on a user connection
 *
 * userId: the id of the connecting user
 */
export const getChat = async (userId: string) => {
    // retrieve all groups of a user
    const user = await User.findOne({ _id: userId });

    // TODO: error handling
    // if (!user) {}

    const groups = user.groups;

    // fill an array with chat data from each group
    const chat = [];

    for (const group of groups) {
        const currChat = await Chat.findOne({ groupId: group });
        chat.push(currChat);
    }

    return chat;
};

/*
 * Get a list of userIds for all chat members
 *
 * groupId: the id of the target chat
 */
export const getChatMembers = async (userId: string, groupId: string) => {
    const group = await Group.findOne({ _id: groupId });

    // TODO: error handling
    // if (!group) {}

    const chatMembers = [];

    for (const member of group.members) {
        if (member !== userId) {
            chatMembers.push(member);
        }
    }

    return chatMembers;
};

/*
 * Assemble a chat message and save it as a database entry
 *
 * userId: the id of the sending user
 * groupId: the id of the target chat
 * message: contents
 */
export const createChatMessage = async (userId: string, groupId: string, message: string) => {
    // retrieve the chat from group id
    const chat = await Chat.findOne({ groupId });
    const user = await User.findOne({ _id: userId });

    // update the messages list
    const newMessage = {
        senderId: userId,
        senderName: user.firstName,
        message,
        createdAt: Date.now(),
    };

    chat.messages.push(newMessage);

    await chat.save();

    return newMessage;
};
