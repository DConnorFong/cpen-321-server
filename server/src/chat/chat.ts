import * as socketIO from 'socket.io';
import * as log from 'log';
import { createChatMessage, getChat } from './chatMethods';

/*
 * A simple chat service implemented using socket.io for StudentLink
 */
export const initializeChat = service => {
    const io = socketIO(service);

    io.on('connection', (socket, userId: string) => {
        log.debug('A new user has connected to the chat');

        const initChat = getChat(userId);
        socket.emit('init', initChat);

        io.on('sendMessage', (sentUserId: string, sentGroupId: string, message: string, callback) => {
            const newMessage = createChatMessage(sentUserId, sentGroupId, message);

            // TODO: add 'room' listening
            io.emit('message', newMessage);
            callback(newMessage);
        });
    });

    log.notice('Chat has been initialized');
};
