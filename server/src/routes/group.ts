import * as express from 'express';
const Group = require('../models/group');
const User = require('../models/user');

const router = express.Router();

/*
 * Read a group from the database using its Object ID
 *
 * GET /group/:id
 */
router.get('/:id', async (req, res) => {
    try {
        
        const group = await Group.findOne({ _id: req.params.id });
        
        let curr_member;
        const retGroup = [];

        for (let i = 0; i < group.members.length; i++) {
            curr_member = await User.findOne({ _id: group.members[i] });
            console.log('member:', curr_member)
            retGroup.push(`${curr_member.firstName} ${curr_member.lastName}: ${curr_member._id}`)
        }

        if (!group) {
            return res.status(404).send();
        }

        res.send(retGroup);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Create a group
 *
 * POST /group
 *
 * Assume that this is called with fields from one user in the req body
 */
router.post('/', async (req, res) => {
    const group = new Group({
        ...req.body,
    });

    try {

        const user = await User.findOne({ _id: req.body.members[0]});
        if (!user) {
            return res.status(404).send();
        }

        user.groups.push(group._id)
        
        await user.save();
        await group.save();
        res.status(201).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * Modifies a group
 * PATCH /group/:id
 */
router.patch('/:id', async (req, res) => {
    // collect all of the requested key updates and validate them against allowed changes
    const updates = Object.keys(req.body);
    const allowedUpdates = ['members', 'courses', 'meeting_times'];

    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates requested' });
    }

    try {
        const group = await Group.findOne({ _id: req.params.id });

        if (!group) {
            res.status(404).send();
        }

        updates.forEach(update => {
            group[update] = req.body[update];
        });
        
        await group.save();
        res.send(group);
    } catch (error) {
        res.status(400).send(error);
    }

});

module.exports = router;
