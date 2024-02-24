import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        id: {
            type: String,
            unique: true,
            sparse: true,
        },
        profilePic: {
            data: Buffer,
            contentType: String,
        },
        phoneNumber: {
            type: String,
        },
        timeCreated: {
            type: Number, // or Date, depending on how you handle dates
        },
        data: {
            activity: Number,
            reps: Number,
            max: Number,
        },
        workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }], // Reference to Workout documents
        schedule: {
            scheduleVersion: Number,
            restDayGap: Number,
            restDays: [Number],
            workoutSchedule: [String], // Could reference 'Workout' IDs instead if structured that way
            previousWorkoutIndex: Number,
            todayWorkoutID: String,
            daysSinceRest: Number,
            lastCompletedDay: String,
        },
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Reference to Event documents
        teamWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }], // Assuming 'teamWorkouts' relates to 'Group' documents
        settings: {}, // Customize according to your settings schema
    },
    {
        timestamps: true, // This adds createdAt and updatedAt timestamps
    }
);

userSchema.pre('save', async function beforeUserSave(next) {
    const user = this;
  
    if (!user.isModified('password')) return next();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    const comparison = await bcrypt.compare(candidatePassword, this.password);
    return comparison;
};

export const User = mongoose.model('User', userSchema);
