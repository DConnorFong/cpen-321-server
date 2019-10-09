import * as express from 'express';
const Course = require('../models/course');

const router = express.Router();

/*
 * Read a course from the database using its Object ID
 *
 * GET /course/:id
 */
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id });

        if (!course) {
            return res.status(404).send();
        }

        res.send(course);
    } catch (error) {
        res.status(500).send();
    }
});

/*
 * Create a course
 * POST /course
 */
router.post('/', async (req, res) => {
    const course = new Course(req.body);

    try {
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send(error);
    }
});

/*
 * Modifies a course
 * PATCH /course/:id
 */
router.patch('/:id', async (req, res) => {
    // collect all of the requested key updates and validate them against allowed changes
    const updates = Object.keys(req.body);
    const allowedUpdates = ['times'];

    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates requested' });
    }

    try {
        const course = await Course.findOne({ _id: req.params.id });

        if (!course) {
            res.status(404).send();
        }

        updates.forEach(update => {
            course[update] = req.body[update];
        });

        await course.save();

        res.send(course);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
