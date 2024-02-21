import mongoose from "mongoose";

// Define the schema for groups as set out in google doc
// Required:
// name: string
// type: number
// accessType: number
//
// Optional:
// description: string
// pic: { data: Buffer, contentType: String }
// users: array
// events: array
// workouts: array
// chatId: string

const groupSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        pic: {
            data: Buffer,
            contentType: String,
        },
        users: {
            type: [],
            required: false,
        },
        events: {
            type: [],
            required: false,
        },
        workouts: {
            type: [],
            required: false,
        },
        chatId: {
            type: String,
            required: false,
        },
        accessType: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Group = mongoose.model('Group', groupSchema);
