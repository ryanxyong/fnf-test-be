import mongoose from 'mongoose';

const liftSchema = mongoose.Schema({
    amount: Number,
    reps: Number,
});

const exercisePlanSchema = mongoose.Schema({
    name: String,
    unit: String,
    max: String,
    lifts: [liftSchema],
});

const workoutSchema = mongoose.Schema({
    name: { type: String, required: true },
    time: String, // assuming 'time' refers to the duration e.g. "60 min"
    plan: [exercisePlanSchema],
}, {
    timestamps: true,
});

const WorkoutModel = mongoose.model('Workout', workoutSchema);

export default WorkoutModel;
