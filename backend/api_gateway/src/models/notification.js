import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
	targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
