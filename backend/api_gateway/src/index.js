import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = 3130;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let client;
if (process.env.ENV === 'Docker') {
    client = 'mongodb://mongodb:27017/rx-validators';
} else {
    client = 'mongodb://127.0.0.1:27017/rx-validators';;
}

// Connect to MongoDB
mongoose
	.connect(client)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Define a middleware function to log requests
function logRequest(req, res, next) {
	console.log("Request to:", req.url);
	console.log("Request headers:", req.headers);
	console.log("Request body:", req.body); // if you want to log request body
	console.log("Request params:", req.params);

	next(); // call next middleware in chain
}

app.use(logRequest);

app.get("/ping", (req, res) => {
	res.send("api_gateway operational");
});

import serviceRegistryRoutes from "./routes/service_registry.js";
app.use("/service-registry", serviceRegistryRoutes);

import notificationHandlerRoutes from "./routes/notification_handler.js";
app.use("/api/notifications", notificationHandlerRoutes);

import verificationServiceRoutes from "./routes/verification_service.js";
app.use("/api/verification", verificationServiceRoutes);

import prescriptionServiceRoutes from "./routes/prescription_service.js";
app.use("/api/prescription", prescriptionServiceRoutes);

import authServiceRoutes from "./routes/auth_service.js";
app.use("/api/auth", authServiceRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// Health Check
app.get("/health", (req, res) => {
	res.send("api_gateway operational");
});

import { doHealthCheck } from "./routes/service_registry.js";
var minutes = 0.25;
var interval = minutes * 60 * 1000;

// ? Check the status of the services every 30 seconds
setInterval(() => {
	console.log("Checking the status of the services");
	doHealthCheck();
}, interval);
