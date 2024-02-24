// Import message model from messageModel.js
// so we can use it in our functions
import { Message } from '../models/messageModel.js';

// Export function to use in the route file
// Create a new message
// Expects a chatID, senderID and message
// Outputs the message or handles error accordingly (error handling done in route file)
export async function createMessage(request) {
    const newMessage = {
        sender: request.body.sender,
        text: request.body.text,
        chatID: request.body.chatID,
    };

    const message = await Message.create(newMessage);
    return message;
}

// Export function getMessage which we use in the route file
// Get message by id
// Expects an id
// Gets the message or handles error accordingly (error handling done in route file)
export async function getMessage(request) {
    const { id }  = request.params;
    const message = await Message.findById(id);
    return message
}

// Export function deleteMessage to use in the route file
// Delete message by id
// Expects an id
// Deletes the message or handles error accordingly (error handling done in route file)
export async function deleteMessage(request) {
    const { id } = request.params;
    const result = await Message.findByIdAndDelete(id);
    return result;
}
