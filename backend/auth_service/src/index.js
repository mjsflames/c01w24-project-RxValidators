import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

import "./config/passport.js";
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(
	session({
		secret: "rx-validators-some-secret-key",
		resave: false,
		saveUninitialized: false,
	})
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
// If app is served through a proxy, trust the proxy to allow HTTPS protocol to be detected

// Connect to MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/rx-validators")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
	res.send("auth_service operational");
});

import loginRoute from "./routes/login.js";
import logoutRoute from "./routes/logout.js";
import registerRoute from "./routes/register.js";

app.use("/api/", loginRoute);
app.use("/api/", logoutRoute);
app.use("/api/", registerRoute);

// ! TEST
import test from "./routes/test.js";
app.use("/api/", test);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;
