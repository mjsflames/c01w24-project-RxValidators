import Service from "../models/service.js";

function getService(serviceName) {
	return async (req, res, next) => {
		const service = await Service.findOne({ serviceName });
		console.log(service);
		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}
		req.service = service.serviceUrl;
		next();
	};
}

// TODO: Implement middleware to validate service registration requests

export default getService;
