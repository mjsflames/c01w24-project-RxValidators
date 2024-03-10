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

// Connect to MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/rx-validators")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
	res.send("auth_service operational");
});

// Middleware
import authorize from "./middleware/auth.js";

// ROUTES
import loginRoute from "./routes/login.js";
import logoutRoute from "./routes/logout.js";
import registerRoute from "./routes/register.js";

app.use("/api/", loginRoute);
app.use("/api/", logoutRoute);
app.use("/api/", registerRoute);

// ! TEST
import test from "./routes/test.js";
app.use("/api/", test);

function registerService(serviceName, serviceUrl) {
	return fetch("http://localhost:3130/service-registry/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ serviceName, serviceUrl }),
	});
}

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	registerService("auth-service", `http://localhost:${PORT}`);
});

export default app;
