import * as express from 'express';
import { getChat } from '../chat/chatMethods';

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
 * GET /chat/:id
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

module.exports = router;
