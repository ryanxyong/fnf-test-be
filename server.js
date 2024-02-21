import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import workoutRoute from './routes/workoutRoute.js';
import usersRoute from './routes/usersRoute.js';
import eventsRoute from './routes/eventsRoute.js';
import messageRoute from './routes/messageRoute.js';
import chatRoomRoute from './routes/chatRoomRoute.js';
import groupsRoute from './routes/groupsRoute.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to FnF');
});

/**
 * Use routes for different functionalities
 * All stem from api and are named intutitively
 */

app.use('/api', workoutRoute);
app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/messages', messageRoute);
app.use('/api/chatRooms', chatRoomRoute);
app.use('/api/groups', groupsRoute);

// Connect to the URL from confic file and connect to database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
