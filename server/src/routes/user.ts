import * as express from 'express';
import { generateName } from '../utils/generate-name';
const User = require('../models/user');

const router = express.Router();

/*
 * Read a user from the database using its Object ID
 *
 * GET /user/:id
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Create a user
 *
 * POST /user
 */
router.post('/', async (req, res) => {
    const user = new User({
        ...req.body,
        aliasName: generateName(),
        groups: [],
    });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * Modifies a user
 * PATCH /user/:id
 */
router.patch('/:id', async (req, res) => {
    // collect all of the requested key updates and validate them against allowed changes
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'aliasName', 'courses', 'groups', 'schedule'];

    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates requested' });
    }

    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            res.status(404).send();
        }

        updates.forEach(update => {
            user[update] = req.body[update];
        });

        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
