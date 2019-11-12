import * as socketIO from 'socket.io';
import * as log from 'log';
import { createChatMessage, getChat, getChatMembers } from './chatMethods';

/*
 * A simple chat service implemented using socket.io for StudentLink
 *
 * TODO: verify if this requires async
 */
export const initializeChat = service => {
    const io = socketIO(service);

    io.on('connection', (socket, userId: string) => {
        log.debug('A new user has connected to the chat');

        // a user is allocated their own listening room
        socket.join(userId);

        getChat(userId).then(initChat => {
            socket.emit('init', initChat);
        });

        io.on('sendMessage', async (sentUserId: string, sentGroupId: string, message: string, callback) => {
            const newMessage = await createChatMessage(sentUserId, sentGroupId, message);

            // retrieve a group members list
            const chatMembers = await getChatMembers(sentUserId, sentGroupId);

            // iterate through the list and send socket messages to each member
            for (const member of chatMembers) {
                io.to(member).emit('message', newMessage);
            }

            // TODO: emit push notifications

            callback(newMessage);
        });
    });

    log.notice('Chat has been initialized');
};
