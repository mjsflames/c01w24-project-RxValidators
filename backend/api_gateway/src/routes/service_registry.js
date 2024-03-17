import express from "express";
import Service from "../models/service.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { serviceName, serviceUrl } = req.body;
		console.log(`Registering service ${serviceName} at ${serviceUrl}`);

		// Check if service exists
		const existingService = await Service.findOne({ serviceName });
		if (existingService) {
			// Update service
			existingService.serviceUrl = serviceUrl;
			await existingService.save();
			return res.status(200).send("Service updated");
		}

		const newService = new Service({ serviceName, serviceUrl });
		await newService.save();

		res.status(200).send("Service registered");
	} catch (error) {
		console.error("Error registering service:", error);
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/services", async (req, res) => {
	try {
		const services = await Service.find();
		res.status(200).json(services);
	} catch (error) {
		console.error("Error fetching services:", error);
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/services/:serviceName", async (req, res) => {
	try {
		const { serviceName } = req.params;
		const service = await Service.findOne({ serviceName });
		if (!service) return res.status(404).json({ message: "Service not found" });

		res.status(200).json(service);
	} catch (error) {
		console.error("Error fetching service:", error);
		res.status(500).json({ message: "Server error" });
	}
});

router.delete("/services/:serviceName", async (req, res) => {
	try {
		const { serviceName } = req.params;
		const service = await Service.findOneAndDelete({ serviceName });
		if (!service) return res.status(404).json({ message: "Service not found" });

		res.status(200).json({ message: "Service removed" });
	} catch (error) {
		console.error("Error removing service:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
