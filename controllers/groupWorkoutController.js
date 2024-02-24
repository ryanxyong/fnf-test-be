import GroupWorkout from '../models/groupWorkoutModel.js';

// GroupWorkout Functions
export async function getGroupWorkouts() {
    const groupWorkouts = await GroupWorkout.find().lean();
    return groupWorkouts;
}

export async function getGroupWorkout(id) {
    const groupWorkout = await GroupWorkout.findById(id).lean();
    if (!groupWorkout) {
        throw new Error('Group workout not found');
    }
    return groupWorkout;
}

export async function createGroupWorkout(groupWorkoutFields) {
    const groupWorkout = new GroupWorkout({
        name: groupWorkoutFields.name,
        groupName: groupWorkoutFields.groupName,
        time: groupWorkoutFields.time,
        date: groupWorkoutFields.date,
        priority: groupWorkoutFields.priority,
        location: groupWorkoutFields.location,
        plan: groupWorkoutFields.plan,
    });
    if (!groupWorkout) {
        throw new Error('Error creating group workout');
    }
    const savedGroupWorkout = await groupWorkout.save();
    return savedGroupWorkout;
}

export async function updateGroupWorkout(id, groupWorkoutFields) {
    const updatedGroupWorkout = await GroupWorkout.findByIdAndUpdate(id, groupWorkoutFields, { new: true }).lean();
    if (!updatedGroupWorkout) {
        throw new Error('GroupWorkout not found');
    }
    return updatedGroupWorkout;
}

export async function deleteGroupWorkout(id) {
    await GroupWorkout.findByIdAndDelete(id);
    return { msg: `GroupWorkout ${id} deleted successfully.` };
}
