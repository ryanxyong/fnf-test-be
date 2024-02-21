import Workout from '../models/workoutModel.js';

export async function getWorkout(id) {
  const workout = await Workout.findById(id).lean();
  if (workout === null) {
    throw new Error('Workout not found');
  }
  return workout;
}

export async function getWorkouts() {
  const workouts = await Workout.find().lean();
  return workouts;
}

export async function createWorkout(workoutFields) {
  const workout = new Workout();
  workout.userID = workoutFields.userID;
  workout.workoutID = workoutFields.workoutID;
  workout.workoutName = workoutFields.workoutName;
  workout.exercisesData = workoutFields.exercisesData;
  workout.timeCreated = workoutFields.timeCreated;
  workout.workoutType = workoutFields.workoutType;
  workout.description = workoutFields.description;
  workout.completionTime = workoutFields.completionTime;

  const savedWorkout = workout.save();
  return savedWorkout;
}

export async function deleteWorkout(id) {
  await Workout.findByIdAndDelete(id);
  return { msg: `Workout ${id} deleted successfully.` };
}

export async function updateWorkout(id, workoutFields) {
  await Workout.findByIdAndUpdate(id, workoutFields);
  const workout = await Workout.findById(id);
  if (workout === null) {
    throw new Error('Workout not found');
  }
  return workout;
}