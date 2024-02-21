import mongoose from "mongoose";

// Event schema as defined by the document

// Required:
// name: string
// date: date
// communityId: string
// isPublic: boolean

// timestamps will also be used

// Optional:
// participants: array
// admins: array
// description: string
// location: string


const eventSchema = mongoose.Schema(
    {
        // _eventId: {
        //     type: String,
        //     required: true,
        // },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        participants: {
            type: [String],
            required: false,
        },
        admins: {
            type: [String],
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        communityId: {
            type: String,
            required: true,
        },
        isPublic: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model('Event', eventSchema);
