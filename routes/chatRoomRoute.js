import express from 'express';
import { createChatRoom, getChatRoom, deleteChatRoom } from '../controllers/chatRoomController.js';

const router = express.Router();

// Post function to create a chat room
// Expects a chat id, name, chat type and user ids
// Leverages function in the controller file to create chat room
// Returns room or handles error accordingly
router.post('/', async (request, response) => {
    try {
        if (!request.body._chatID || !request.body.name || request.body.chatType == null || !request.body.userIDs) {
            return response.status(400).send({ message: 'Data missing' });
        }
        const room = await createChatRoom(request);
        return response.status(201).send(room);
    } 
    // If an error is caught then return a 500 status and the error message
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get function to get chat room by id
// Expects an id
// Leverages function in the controller file to get chat room by id
// Returns room or handles error accordingly
router.get('/:id', async (request, response) => {
    try {
        const room = await getChatRoom(request); // Use a different variable name like room

        if (room) {
            return response.status(200).send({ _chatID: room._chatID, name: room.name });
        } else {
            return response.status(404).send({ message: 'Chat room not found' });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete chat room by id
// Expects an id
// Leverages function in the controller file to delete chat room
// Returns a message or handles error accordingly
router.delete('/:id', async (request, response) => {
    try {
        const room = await deleteChatRoom(request);
        if (room) {
            return response.status(200).send({ message: 'Chat room deleted' });
        }
        return response.status(404).send({ message: 'Chat room not found' });
    } 
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
