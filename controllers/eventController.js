import { Event } from '../models/eventModel.js';

// Export function to use in the route file
// Create a new event
// Expects a name, date, communityId and isPublic
// Outputs the event or handles error accordingly (error handling done in route file)
export async function createEvent(request) {
    const newEvent = {
        // _eventId: request.body._eventId,
        name: request.body.name,
        date: request.body.date,
        communityId: request.body.communityId,
        isPublic: request.body.isPublic,
    };

    const event = await Event.create(newEvent);
    return event;
}

// Export function getEvent which we use in the route file
// Get event by id
// Expects an id
// Gets the event or handles error accordingly (error handling done in route file)
export async function getEvent(request) {
    const { id }  = request.params;
    const event = await Event.findById(id);
    return event
}

// Export function updateEvent to use in the route file
// Update event by id
// Expects an id and request
// Updates the event or handles error accordingly (error handling done in route file)
export async function updateEvent(request) {
    const { id } = request.params;
    const result = await Event.findByIdAndUpdate(id, request.body);
    return result;
}

// Export function deleteEvent to use in the route file
// Delete event by id
// Expects an id
// Deletes the event or handles error accordingly (error handling done in route file)
export async function deleteEvent(request) {
    const { id } = request.params;
    const result = await Event.findByIdAndDelete(id);
    return result;
}