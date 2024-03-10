import express from "express";

import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
	try {
		passport.authenticate("local", (err, user, info, next) => {
			if (err) {
				console.error("Error authenticating user:", err);
				return res.status(500).json({ message: "Server error" });
			}

			if (!user) {
				return res.status(400).json({ message: info.message });
			}

			req.logIn(user, (err) => {
				if (err) {
					console.error("Error logging in user:", err);
					return res.status(500).json({ message: "Server error" });
				}

				return res.status(200).json({ message: "Login successful" });
			});
		})(req, res, next);
	} catch (error) {
		console.error("Error at login:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
