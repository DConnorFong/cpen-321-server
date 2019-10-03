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

module.exports = router;
