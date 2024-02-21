import express from 'express';
import { createMessage, getMessage, deleteMessage } from '../controllers/messageController.js';

const app = express();
app.use(express.json());

const router = express.Router();

// New message
router.post('/', async (request, response) => {
    try {
        if (!request.body.chatID ||
            !request.body.senderID ||
            !request.body.message) {
            return response.status(400).send({ message: 'Data missing' });
        }

        const message = await createMessage(request);

        return response.status(201).send(message);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get message content by id
router.get('/:id', async (request, response) => {
    try {
        const message = await getMessage(request);

        // Extract the 'message' property from each message
        const messageContent = message.message;

        return response.status(200).send(messageContent);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Don't actually think we need, can easily reimplement if so
// get message content by chat room id
// router.get('/chatroom/:id', async (request, response) => {
//     try {
//         const messages = await Message.find({ chatID: request.params.id });
//         return response.status(200).send(messages);
//     } 
//     catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });


// delete message by chatID
router.delete('/:id', async (request, response) => {
    try {
        const deletedMessage = await deleteMessage(request);
        if (!deletedMessage) {
            return response.status(404).send({ message: 'Message not found' });
        }
        return response.status(200).send({ message: 'Message deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;

