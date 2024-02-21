import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        _userId: {
            type: String,
            unique: true,
        },
        email:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true, 
        },
        fullName: {
            type: String,
        },
        bday: {
            type: Date,
        },
        gender: {
            type: String,
        },
        pic: {
            data: Buffer,
            contentType: String,
        },
        bio: {
            type: String,
        },
        workouts: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
        },
    },
    {
        timestamps: true,
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