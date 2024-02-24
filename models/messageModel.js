import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    // Assuming 'id' is automatically handled by MongoDB as '_id'
    sender: { // Renamed from senderID
        type: String,
        required: true,
    },
    text: { // Renamed from message
        type: String,
        required: true,
    },
    // chatID remains as is if it's used for identifying different chats
    chatID: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

export const Message = mongoose.model('Message', messageSchema);
