import mongoose from 'mongoose';

const exerciseDataSchema = mongoose.Schema({
    exercises: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    units: String,
    // for cardio, can store distance goals
    repsGoal: [Number], 
    // for cardio, can store time goals. for calisthenics, can represent added weight to body
    // will be converted to percentages in the frontend. units are arbitrary, so should be dealt with by frontend
    weightGoal: [Number], 
    repsCounted: [Number], // init to corresponding repsGoal with lower opacity?
    weightCounted: [Number], // init to corresponding weightGoal with lower opacity?
}, { // for testing purposes
    toJSON: { virtuals: false },
    timestamps: true,
});

const workoutSchema = mongoose.Schema({
    userID: {type:String, required: true},
    workoutID: { type:String, unique: true },
    workoutName: String,
    exercisesData: [exerciseDataSchema],
    timeCreated: Date,
    workoutType: String,
    description: String,
    completionTime: Date,
})

var WorkoutModel = mongoose.model('Workout', workoutSchema);

export default WorkoutModel
