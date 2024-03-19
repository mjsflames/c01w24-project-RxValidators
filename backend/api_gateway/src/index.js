import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = 3130;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/rx-validators")
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

import verificationServiceRoutes from "./routes/verification_service.js";
app.use("/api/verification", verificationServiceRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
