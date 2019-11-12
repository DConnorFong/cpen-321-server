import * as express from 'express';
import { getChat, getChatMembers, createChatMessage } from '../chat/chatMethods';

const Chat = require('../models/chat');
const router = express.Router();

/*
 * Chat endpoints used to accelerate testing database functionality
 *
 * Normal chat usage should be done only through socket communication within the app
 */

/*
 * Get a chat object using its group ID
 *
 * GET /chat/group/:id
 */
router.get('/group/:id', async (req, res) => {
    try {
        const chat = await Chat.findOne({ groupId: req.params.id });

        if (!chat) {
            return res.status(404).send();
        }

        res.send(chat);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Get all group members of a chat
 *
 * GET /chat/group/:id/user
 */
router.get('/group/:id/user', async (req, res) => {
    const group = await getChatMembers('', req.params.id);

    if (!group) {
        return res.status(404).send();
    }

    res.send(group);
});

/*
 * Get a chat object using its user ID
 *
 * GET /chat/user/:id
 */
router.get('/user/:id', async (req, res) => {
    try {
        const chat = await getChat(req.params.id);

        if (!chat) {
            return res.status(404).send();
        }

        res.send(chat);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Create a new chat object
 *
 * POST /chat
 */
router.post('/', async (req, res) => {
    const chat = new Chat(req.body);

    try {
        await chat.save();
        res.status(201).send(chat);
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * Create a new chat message
 *
 * POST /chat/message
 */
router.post('/message', async (req, res) => {
    const message = await createChatMessage(req.body.userId, req.body.groupId, req.body.message);

    if (!message) {
        res.status(400).send();
    }

    res.status(201).send(message);
});

module.exports = router;
