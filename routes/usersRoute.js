import express from 'express';
import { User } from '../models/userModel.js';
import { requireAuth, requireSignin } from '../services/passport.js';
import * as UserController from '../controllers/userController.js';

const router = express.Router();


// get user's information by ID
router.get('/info/:id', async (request, response) => {
    try {
        const user = await UserController.getUser(request.params.id);
        console.log(user);
        return response.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update user's information by ID
router.put('/update/:id', async (request, response) => {
    try {
        // if (
        //     !request.body.gender ||
        //     !request.body.pic ||
        //     !request.body.bio ||
        //     !request.body.workouts
        // ) {
        //     return response.status(400).send({
        //         message: 'Send all required fields: gender, pic, bio, workouts'
        //     });
        // }

        const result = await UserController.updateUser(request);
        
        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ message: 'User updated successfully', user: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete user by ID
router.delete(':/id', requireAuth, async (request, response) => {
    try {
        const result = await UserController.deleteUser(request);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Taken from CS52 curriculum
router.post('/signin', requireSignin, async (req, res) => {
    try {
      const token = UserController.signin(req.user);
      res.json({ token, email: req.user.email });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
});

// Taken from CS52 curriculum
router.post('/signup', async (req, res) => {
try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email });
} catch (error) {
    res.status(422).send({ error: error.toString() });
}
});

export default router;