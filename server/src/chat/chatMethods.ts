import * as Chat from '../models/chat';
import * as Group from '../models/group';

/*
 * Get an initial representation of all chats on a user connection
 *
 * userId: the id of the connecting user
 */
export const getChat = (userId: string) => {
    // TODO: implement
    // retrieve all groups of a user
    // create a JSON object
    // iterate: add all chat data from each group to the JSON object
    // return the object
    return {};
};

/*
 * Assemble a chat message and save it as a database entry
 *
 * userId: the id of the sending user
 * groupId: the id of the target chat
 * message: contents
 */
export const createChatMessage = (userId: string, groupId: string, message: string) => {
    // TODO: implement
    // retrieve the chat from group id
    // update the messages list
    // save the chat
    // return the message
    return {};
};
