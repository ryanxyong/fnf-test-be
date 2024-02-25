import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
    {
        name: { // Assuming 'name' matches frontend expectation ('title' in some frontend objects might be a discrepancy)
            type: String,
            required: true,
        },
        memberCount: { // Adding this to match frontend data
            type: Number,
            required: true, // Assuming this should be required as it's always present in frontend data
        },
        icon: { // Assuming 'pic' is equivalent to 'icon' in frontend data; adjust if necessary
            // HOW TO INPUT AN IMAGE AS ICON??????
            type: String,
            required: false, // Set based on frontend usage; change if icon is mandatory
        },
        banner: { 
            type: String,
            required: false, // Set based on frontend usage; change if banner is mandatory
        },
        description: {
            type: String,
            required: false, // Matching frontend; ensure required status matches actual needs
        },
        events: { 
            type: [],
            required: false,
        },
        permissions: {
            type: Boolean,
            required: true,
        },
        members: {
            type: [],
            required: true, // Set false as it's empty in frontend, adjust based on actual use
        },
        admin: {
            type: [],
            required: true, // Set false as it's empty in frontend, adjust based on actual use
        },
        type: {
            type: Boolean,
            required: true,
        },
        autoAdd: {
            type: [],
            required: true,
        },
    },
    {
        timestamps: true, // Keeping timestamps for creation and update tracking
    }
);


export const Group = mongoose.model('Group', groupSchema);
