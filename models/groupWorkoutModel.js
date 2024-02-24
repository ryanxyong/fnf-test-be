import mongoose from 'mongoose';

const liftSchema = mongoose.Schema({
    amount: Number,
    reps: Number,
});

const exercisePlanSchema = mongoose.Schema({
    name: String,
    unit: String,
    lifts: [liftSchema],
});

const groupWorkoutSchema = mongoose.Schema({
    name: { type: String, required: true },
    groupName: { type: String, required: true},
    time: String, // assuming 'time' refers to the duration e.g. "60 min"
    date: String,
    priority: Boolean,
    location: String,
    plan: [exercisePlanSchema],
}, {
    timestamps: true,
});

const GroupWorkoutModel = mongoose.model('groupWorkout', groupWorkoutSchema);

export default GroupWorkoutModel;
