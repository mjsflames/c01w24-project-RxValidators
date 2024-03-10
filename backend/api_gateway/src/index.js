// const express = require("express");
// const app = express();
// const axios = require("axios");

// const SERVICE_REGISTRY_URL = "http://service-registry:8000/register"; // URL of service registry

// // Register the microservice with the service registry
// axios
// 	.post(SERVICE_REGISTRY_URL, {
// 		serviceName: "example-service",
// 		serviceUrl: "http://example-service:3000", // URL where the service is running
// 	})
// 	.then(() => {
// 		console.log("Service registered successfully");
// 	})
// 	.catch((error) => {
// 		console.error("Error registering service:", error);
// 	});

// // Your microservice routes and logic here

// app.listen(3000, () => {
// 	console.log("Microservice listening on port 3000");
// });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Service from "./models/service.js";

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

app.get("/", (req, res) => {
	res.send("api_gateway operational");
});

import serviceRegistryRoutes from "./routes/service_registry.js";
app.use("/service-registry", serviceRegistryRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
