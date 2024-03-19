// Route to test if they are logged in

import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
	if (req.isAuthenticated()) {
		res.status(200).json({ message: "Logged in" });
	} else {
		res.status(401).json({ message: "Not logged in" });
	}
});

export default router;
