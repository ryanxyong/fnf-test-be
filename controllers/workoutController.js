import Workout from '../models/workoutModel.js';

// Workout Functions
export async function getWorkouts() {
    const workouts = await Workout.find().lean();
    return workouts;
}

export async function getWorkout(id) {
    const workout = await Workout.findById(id).lean();
    if (!workout) {
        throw new Error('Workout not found');
    }
    return workout;
}

export async function createWorkout(workoutFields) {
    const workout = new Workout({
        name: workoutFields.name,
        time: workoutFields.time,
        plan: workoutFields.plan,
    });
    const savedWorkout = await workout.save();
    return savedWorkout;
}

export async function updateWorkout(id, workoutFields) {
    const updatedWorkout = await Workout.findByIdAndUpdate(id, workoutFields, { new: true }).lean();
    if (!updatedWorkout) {
        throw new Error('Workout not found');
    }
    return updatedWorkout;
}

export async function deleteWorkout(id) {
    await Workout.findByIdAndDelete(id);
    return { msg: `Workout ${id} deleted successfully.` };
}

// Exercise Functions
export async function addExerciseToWorkout(workoutId, exerciseData) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    workout.plan.push(exerciseData);
    await workout.save();
    return workout;
}

export async function updateExerciseInWorkout(workoutId, exerciseId, exerciseData) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    const exerciseIndex = workout.plan.findIndex(ex => ex.id === exerciseId);
    if (exerciseIndex === -1) {
        throw new Error('Exercise not found');
    }
    workout.plan[exerciseIndex] = { ...workout.plan[exerciseIndex], ...exerciseData };
    await workout.save();
    return workout;
}

export async function removeExerciseFromWorkout(workoutId, exerciseId) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    workout.plan = workout.plan.filter(ex => ex.id !== exerciseId);
    await workout.save();
    return workout;
}

export async function getExerciseFromWorkout(workoutId, exerciseId) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    const exercise = workout.plan.find(ex => ex.id === exerciseId);
    if (!exercise) {
        throw new Error('Exercise not found');
    }
    return exercise;
}

// Lift Functions
export async function addLiftToExercise(workoutId, exerciseId, liftData) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    const exercise = workout.plan.find(ex => ex.id === exerciseId);
    if (!exercise) {
        throw new Error('Exercise not found');
    }
    exercise.lifts.push(liftData);
    await workout.save();
    return workout;
}

export async function updateLiftInExercise(workoutId, exerciseId, liftId, liftData) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    const exercise = workout.plan.find(ex => ex.id === exerciseId);
    if (!exercise) {
        throw new Error('Exercise not found');
    }
    const liftIndex = exercise.lifts.findIndex(lift => lift.id === liftId);
    if (liftIndex === -1) {
        throw new Error('Lift not found');
    }
    exercise.lifts[liftIndex] = { ...exercise.lifts[liftIndex], ...liftData };
    await workout.save();
    return workout;
}

export async function removeLiftFromExercise(workoutId, exerciseId, liftId) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    const exercise = workout.plan.find(ex => ex.id === exerciseId);
    if (!exercise) {
        throw new Error('Exercise not found');
    }
    exercise.lifts = exercise.lifts.filter(lift => lift.id !== liftId);
    await workout.save();
    return workout;
}

export async function getLiftFromExercise(workoutId, exerciseId, liftId) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    const exercise = workout.plan.find(ex => ex.id === exerciseId);
    if (!exercise) {
        throw new Error('Exercise not found');
    }
    const lift = exercise.lifts.find(lift => lift.id === liftId);
    if (!lift) {
        throw new Error('Lift not found');
    }
    return lift;
}
