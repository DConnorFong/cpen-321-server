import * as express from 'express';
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
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
