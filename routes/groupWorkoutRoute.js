import express from 'express';
import * as GroupWorkout from '../controllers/groupWorkoutController.js';

const router = express.Router();



// Group workout routes
router.route('/')
    .get(async (req, res) => {
        try {
            const groupWorkouts = await GroupWorkout.getGroupWorkouts();
            res.status(200).json(groupWorkouts);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .post(async (req, res) => {
        try {
            const newWorkout = await GroupWorkout.createGroupWorkout(req.body);
            res.status(201).json(newWorkout);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })


router.route('/:id')
    .get(async (req, res) => {
        try {
            const groupWorkouts = await GroupWorkout.getGroupWorkout(req.params.id);
            res.status(200).json(groupWorkouts);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const updatedWorkout = await GroupWorkout.updateGroupWorkout(req.params.id, req.body)
            res.status(200).json(updatedWorkout);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .delete(async (req, res) => {
        try {
            await GroupWorkout.deleteGroupWorkout(req.params.id);
            res.status(200).json({ message: 'Workout deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

export default router;
