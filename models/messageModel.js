import mongoose from 'mongoose';

// Define the schema for messages as set out in google doc
// Required:
// chatID: string
// senderID: string
// message: string

// timestamps will also be used

// Optional:
// none (as of right now, maybe we should add more?)

const messageSchema = new mongoose.Schema({
    chatID: {
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        unique: true,
    },
    senderID: {
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export const Message = mongoose.model('Message', messageSchema);
