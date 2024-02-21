import mongoose from 'mongoose';

// Schema for chat room
// Following from the document 

// Required:
// chatID: string
// name: string
// chatType: boolean
// userIDs: array

// Timestamps will also be used

const chatRoomSchema = new mongoose.Schema({
    _chatID: {
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    chatType: {
        type: Boolean,
        required: true,
    },
    userIDs: {
        type: Array,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export const chatRoom = mongoose.model('Chat room', chatRoomSchema);
