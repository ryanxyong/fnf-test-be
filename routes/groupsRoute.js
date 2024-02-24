import express from 'express';
import { Group } from '../models/groupModel.js';

const router = express.Router();

// make a new group
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.memberCount // Ensure memberCount is provided since it's now required
        ) {
            return response.status(400).send({
                message: 'Send all required fields.'
            });
        }
        const newGroup = {
            name: request.body.name,
            memberCount: request.body.memberCount,
            icon: request.body.icon, // Assuming this is handled differently (e.g., file upload)
            banner: request.body.banner, // Assuming this is handled differently (e.g., file upload)
            description: request.body.description, // Assuming optional
            events: request.body.events            
            // Not including 'icon' and 'banner' directly, assuming they are handled differently (e.g., file upload)
        };

        const group = await Group.create(newGroup);

        return response.status(201).send(group);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get group information by ID
router.get('/info/:id', async (request, response) => {
    try {
        const groupId = request.params.id;
        const group = await Group.findById(groupId);

        if (!group) {
            return response.status(404).json({ message: 'Group not found' });
        }

        return response.status(200).json(group);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update group's information by ID
router.put('/update/:id', async (request, response) => {
    try {
        const groupId = request.params.id;
        const result = await Group.findByIdAndUpdate(groupId, request.body, { new: true }); // Ensure updated group is returned

        if (!result) {
            return response.status(404).json({ message: 'Group not found' });
        }

        return response.status(200).json({ message: 'Group updated successfully', group: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete group by ID
router.delete('/:id', async (request, response) => {
    try {
        const groupId = request.params.id;
        const result = await Group.findByIdAndDelete(groupId);

        if (!result) {
            return response.status(404).json({ message: 'Group not found' });
        }

        return response.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
