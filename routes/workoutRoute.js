import express from 'express';
import * as Workout from '../controllers/workoutController.js';
import * as Exercise from '../controllers/exerciseController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world')
  });

// get all workouts or post a new workout
router.route('/workouts')
    .get(async (req, res) => {
        try{
            const result = await Workout.getWorkouts();
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })
    .post(async (req, res) => {
        try{
            const result = await Workout.createWorkout(req.body);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })

// get, update, or delete a specific workout
router.route('/workouts/:workoutID')
    .get(async (req, res) => {
        try{
            const result = await Workout.getWorkout(req.params.workoutID);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })
    .put(async (req, res) => {
        try{
            const result = await Workout.updateWorkout(req.params.workoutID, req.body);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })
    .delete(async (req, res) => {
        try{
            const result = await Workout.deleteWorkout(req.params.workoutID);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })

// get all exercises or post a new exercise
router.route('/exercises')
    .get(async (req, res) => {
        try{
            const result = await Exercise.getExercises();
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })
    .post(async (req, res) => {
        try{
            const result = await Exercise.createExercise(req.body);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })

// get, update, or delete a specific exercise
router.route('/exercises/:exerciseID')
    .get(async (req, res) => {
        try{
            const result = await Exercise.getExercise(req.params.exerciseID);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })
    .put(async (req, res) => {
        try{
            const result = await Exercise.udpateExercise(req.params.exerciseID, req.body);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })
    .delete(async (req, res) => {
        try{
            const result = await Exercise.deleteExercise(req.params.exerciseID);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    })

export default router;