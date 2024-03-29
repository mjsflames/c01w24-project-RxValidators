import express from "express";

import bcrypt from "bcrypt";

import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const existingUser = await User.findOne({ username });

		if (existingUser) return res.status(400).json({ message: "Username already taken" });

		const hashedPassword = await bcrypt.hash(password, 16);
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
