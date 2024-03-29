// ? It is like a notification service but I want to reduce the number of services.
// * As such, this service will be integrated directly into the API Gateway.

import { Router } from "express";
import Notification from "../models/notification.js";

const router = Router();

router.post("/", async (req, res) => {
    console.log("Notification received:", req.body);
    const { targetUser, title, message } = req.body;
    if (!targetUser || !title || !message) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        const notification = new Notification({ targetUser, title, message });
        await notification.save();
        return res.json({ message: "Created notification." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating notification" });
        return;
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const fetchAll = req.query.fetchAll;
    if (!id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let query = { targetUser: id};
        if (!fetchAll) {query.isRead = false; query.isArchived = false;}
        const notification = await Notification.find(query);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        return res.json(notification);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving notification" });
        return;
    }
});

router.put("/read/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        notification.isRead = true;
        await notification.save();
        return res.json({ message: "Updated notification." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating notification" });
        return;
    }
});

router.put("/archive/:id", async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        notification.isArchived = true;
        await notification.save();
        return res.json({ message: "Updated notification." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating notification" });
        return;
    }
});

// This should be administrator only... but we don't have authorization.
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        return res.json({ message: "Deleted notification." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting notification" });
        return;
    }
});

export default router;