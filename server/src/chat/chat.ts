import * as socketIO from 'socket.io';
import * as log from 'log';

/*
 * A simple chat service implemented using socket.io for StudentLink
 */
export const initializeChat = service => {
    const io = socketIO(service);

    io.on('connection', () => {
        log.debug('A new user has connected to the chat');

        // TODO: return a chat body to the connected user

        // TODO: implement
        io.on('sendMessage', () => {
            // TODO: broadcast to all members within the group
        });
    });

    log.notice('Chat has been initialized');
};
