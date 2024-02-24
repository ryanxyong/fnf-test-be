import express from 'express';
import * as Workout from '../controllers/workoutController.js';

const router = express.Router();

// Workout routes
router.get('/workouts', async (req, res) => {
    try {
        const workouts = await Workout.getWorkouts();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/workouts/:id', async (req, res) => {
    try {
        const workout = await Workout.getWorkout(req.params.id);
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/workouts', async (req, res) => {
    try {
        const newWorkout = await Workout.createWorkout(req.body);
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/workouts/:id', async (req, res) => {
    try {
        const updatedWorkout = await Workout.updateWorkout(req.params.id, req.body)
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/workouts/:id', async (req, res) => {
    try {
        await Workout.deleteWorkout(req.params.id);
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Exercise routes
router.post('/workouts/:workoutId/exercises', async (req, res) => {
    try {
        const updatedWorkout = await Workout.addExerciseToWorkout(req.params.workoutId, req.body);
        res.status(201).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/workouts/:workoutId/exercises/:exerciseId', async (req, res) => {
    try {
        const updatedWorkout = await Workout.updateExerciseInWorkout(req.params.workoutId, req.params.exerciseId, req.body);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/workouts/:workoutId/exercises/:exerciseId', async (req, res) => {  
    try {
        const updatedWorkout = await Workout.removeExerciseFromWorkout(req.params.workoutId, req.params.exerciseId);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/workouts/:workoutId/exercises/:exerciseId', async (req, res) => {
    try {
        const exercise = await Workout.getExerciseFromWorkout(req.params.workoutId, req.params.exerciseId);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lift routes
router.post('/workouts/:workoutId/exercises/:exerciseId/lifts', async (req, res) => {
    try {
        const updatedWorkout = await Workout.addLiftToExercise(req.params.workoutId, req.params.exerciseId, req.body);
        res.status(201).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/workouts/:workoutId/exercises/:exerciseId/lifts/:liftId', async (req, res) => {
    try {
        const updatedWorkout = await Workout.updateLiftInExercise(req.params.workoutId, req.params.exerciseId, req.params.liftId, req.body);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/workouts/:workoutId/exercises/:exerciseId/lifts/:liftId', async (req, res) => {
    try {
        const updatedWorkout = await Workout.removeLiftFromExercise(req.params.workoutId, req.params.exerciseId, req.params.liftId);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/workouts/:workoutId/exercises/:exerciseId/lifts/:liftId', async (req, res) => {
    try {
        const lift = await Workout.getLiftFromExercise(req.params.workoutId, req.params.exerciseId, req.params.liftId);
        res.status(200).json(lift);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
